/**
 * Excel / CSV Import, Export & Template Handler
 * Features exact Tally Multi-Line Dr/Cr Ledger Excel format (matching user requirements)
 * and Flat Single-Row format using SheetJS (xlsx).
 */

const ExcelHandler = {
  // Required header columns for template and import mapping
  TEMPLATE_COLUMNS: [
    'Date',
    'Voucher Number',
    'Customer / Ledger Name',
    'GSTIN',
    'Taxable Value',
    'GST Rate',
    'Interstate (Yes/No)'
  ],

  // Sample data rows matching user's real business domain
  SAMPLE_TEMPLATE_ROWS: [
    {
      'Date': '2026-07-31',
      'Voucher Number': 'CR-70',
      'Customer / Ledger Name': 'ONCORELIEF MEDICAL STORE',
      'GSTIN': '27AHJPM3588F1ZR',
      'Taxable Value': 800,
      'GST Rate': 5,
      'Interstate (Yes/No)': 'No'
    },
    {
      'Date': '2026-07-31',
      'Voucher Number': 'CR-71',
      'Customer / Ledger Name': 'M/s Suvidha Icu & Cathlab Centre Llp',
      'GSTIN': '27ACWFS1289P1Z3',
      'Taxable Value': 24050,
      'GST Rate': 12,
      'Interstate (Yes/No)': 'No'
    },
    {
      'Date': '2026-08-01',
      'Voucher Number': 'CR-73',
      'Customer / Ledger Name': 'M/s Suvidha Icu & Cathlab Centre Llp',
      'GSTIN': '27ACWFS1289P1Z3',
      'Taxable Value': 6685,
      'GST Rate': 5,
      'Interstate (Yes/No)': 'No'
    }
  ],

  generateTemplate() {
    if (typeof XLSX === 'undefined') {
      this.downloadCsvTemplate();
      return;
    }

    const ws = XLSX.utils.json_to_sheet(this.SAMPLE_TEMPLATE_ROWS);
    ws['!cols'] = [
      { wch: 14 },
      { wch: 18 },
      { wch: 38 },
      { wch: 20 },
      { wch: 15 },
      { wch: 12 },
      { wch: 20 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vouchers');
    XLSX.writeFile(wb, 'voucher_template.xlsx');
  },

  downloadCsvTemplate() {
    const headers = this.TEMPLATE_COLUMNS.join(',');
    const rows = this.SAMPLE_TEMPLATE_ROWS.map(r => 
      `"${r['Date']}","${r['Voucher Number']}","${r['Customer / Ledger Name']}","${r['GSTIN']}",${r['Taxable Value']},${r['GST Rate']},"${r['Interstate (Yes/No)']}"`
    ).join('\n');
    
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voucher_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  async parseExcelFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array', cellDates: true });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          const rawRows = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
          const validationResult = this.validateAndNormalizeRows(rawRows);
          resolve(validationResult);
        } catch (err) {
          reject(new Error('Failed to parse Excel file. Please ensure it is a valid spreadsheet.'));
        }
      };

      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsArrayBuffer(file);
    });
  },

  validateAndNormalizeRows(rawRows) {
    const valid = [];
    const errors = [];
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

    rawRows.forEach((row, index) => {
      const rowNum = index + 2;
      const rowErrors = [];

      const getVal = (...keys) => {
        for (const k of keys) {
          const matchedKey = Object.keys(row).find(key => key.toLowerCase().trim() === k.toLowerCase().trim());
          if (matchedKey && row[matchedKey] !== undefined && row[matchedKey] !== '') {
            return row[matchedKey];
          }
        }
        return '';
      };

      let dateVal = getVal('Date', 'Voucher Date', 'Invoice Date');
      if (dateVal instanceof Date) {
        dateVal = dateVal.toISOString().slice(0, 10);
      } else if (typeof dateVal === 'string' && dateVal.trim()) {
        dateVal = dateVal.trim();
      } else {
        dateVal = new Date().toISOString().slice(0, 10);
      }

      const voucherNum = String(getVal('Voucher Number', 'Voucher No', 'Invoice Number', 'Invoice No', 'Voucher') || '').trim();
      if (!voucherNum) {
        rowErrors.push('Missing Voucher Number');
      }

      const customerName = String(getVal('Customer / Ledger Name', 'Customer Name', 'Party Name', 'Ledger Name', 'Customer') || '').trim();
      if (!customerName) {
        rowErrors.push('Missing Customer/Ledger Name');
      }

      let gstin = String(getVal('GSTIN', 'Party GSTIN', 'Customer GSTIN', 'GST No') || '').trim().toUpperCase();
      if (gstin && !gstinRegex.test(gstin)) {
        rowErrors.push(`Invalid GSTIN format "${gstin}"`);
      }

      let taxableVal = parseFloat(getVal('Taxable Value', 'Taxable Amount', 'Taxable', 'Amount'));
      if (isNaN(taxableVal) || taxableVal < 0) {
        rowErrors.push('Taxable Value must be a valid positive number');
        taxableVal = 0;
      }

      let gstRate = parseFloat(getVal('GST Rate', 'Rate', 'Tax Rate', 'GST %', 'Rate %'));
      if (isNaN(gstRate) || ![0, 5, 12, 18, 28].includes(gstRate)) {
        gstRate = 5;
      }

      const interstateVal = String(getVal('Interstate (Yes/No)', 'Interstate', 'Is Interstate', 'IGST', 'Type') || '').toLowerCase();
      const isInterstate = interstateVal.includes('inter') || interstateVal.includes('y') || interstateVal === 'true' || interstateVal === '1';

      let cgst = 0, sgst = 0, igst = 0;
      const totalTax = +(taxableVal * (gstRate / 100)).toFixed(2);
      
      if (isInterstate) {
        igst = totalTax;
      } else {
        cgst = +(totalTax / 2).toFixed(2);
        sgst = +(totalTax - cgst).toFixed(2);
      }
      
      const invoiceTotal = +(taxableVal + totalTax).toFixed(2);

      const voucherObj = {
        id: `vch_${Date.now()}_${index}`,
        date: dateVal,
        voucher_number: voucherNum,
        customer_name: customerName,
        gstin: gstin,
        taxable_value: taxableVal,
        gst_rate: gstRate,
        interstate: isInterstate,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        total_gst: totalTax,
        invoice_total: invoiceTotal,
        source: 'excel_import'
      };

      if (rowErrors.length > 0) {
        errors.push({ rowNumber: rowNum, errors: rowErrors, data: row });
      } else {
        valid.push(voucherObj);
      }
    });

    return {
      totalRows: rawRows.length,
      validCount: valid.length,
      errorCount: errors.length,
      validVouchers: valid,
      errors: errors
    };
  },

  /**
   * EXACT TALLY MULTI-LINE DR/CR EXCEL EXPORT (Desired Format in Screenshot 2)
   * Columns: Voucher Date | Voucher Type Name | Voucher Number | Reference No. | Ledger Name | Ledger Amount | Ledger Amount Dr/Cr
   */
  exportToTallyExcel(vouchers, filename = 'tally_sales_vouchers_export.xlsx') {
    if (typeof XLSX === 'undefined') {
      alert('SheetJS library is required for Excel export');
      return;
    }

    const tallyRows = [];

    vouchers.forEach(v => {
      const vDate = v.date;
      const vType = 'Sales';
      const vNumber = v.voucher_number || `CR-${v.id}`;
      const vRef = v.voucher_number || `CR-${v.id}`;
      const partyName = v.customer_name || 'Cash Sales';
      const taxable = parseFloat(v.taxable_value || 0);
      const total = parseFloat(v.invoice_total || 0);
      const rate = parseFloat(v.gst_rate || 5);
      const isInterstate = Boolean(v.interstate);

      // 1. Party Ledger (Debit - Full Invoice Total)
      tallyRows.push({
        'Voucher Date': vDate,
        'Voucher Type Name': vType,
        'Voucher Number': vNumber,
        'Reference No.': vRef,
        'Ledger Name': partyName,
        'Ledger Amount': total,
        'Ledger Amount Dr/Cr': 'Dr'
      });

      // 2. GST Sales Account (Credit - Taxable Value)
      tallyRows.push({
        'Voucher Date': vDate,
        'Voucher Type Name': vType,
        'Voucher Number': vNumber,
        'Reference No.': vRef,
        'Ledger Name': `GST Sales ${rate}%`,
        'Ledger Amount': taxable,
        'Ledger Amount Dr/Cr': 'Cr'
      });

      // 3. Tax Components (Credit)
      if (isInterstate) {
        const igst = parseFloat(v.igst || (taxable * rate / 100));
        tallyRows.push({
          'Voucher Date': vDate,
          'Voucher Type Name': vType,
          'Voucher Number': vNumber,
          'Reference No.': vRef,
          'Ledger Name': `IGST @ ${rate}%`,
          'Ledger Amount': igst,
          'Ledger Amount Dr/Cr': 'Cr'
        });
      } else {
        const cgst = parseFloat(v.cgst || (taxable * rate / 200));
        const sgst = parseFloat(v.sgst || (taxable * rate / 200));

        tallyRows.push({
          'Voucher Date': vDate,
          'Voucher Type Name': vType,
          'Voucher Number': vNumber,
          'Reference No.': vRef,
          'Ledger Name': `CGST @ ${rate / 2}%`,
          'Ledger Amount': cgst,
          'Ledger Amount Dr/Cr': 'Cr'
        });

        tallyRows.push({
          'Voucher Date': vDate,
          'Voucher Type Name': vType,
          'Voucher Number': vNumber,
          'Reference No.': vRef,
          'Ledger Name': `SGST @ ${rate / 2}%`,
          'Ledger Amount': sgst,
          'Ledger Amount Dr/Cr': 'Cr'
        });
      }
    });

    const ws = XLSX.utils.json_to_sheet(tallyRows);

    // Set column widths for clean readability
    ws['!cols'] = [
      { wch: 14 }, // Voucher Date
      { wch: 18 }, // Voucher Type Name
      { wch: 16 }, // Voucher Number
      { wch: 16 }, // Reference No.
      { wch: 38 }, // Ledger Name
      { wch: 16 }, // Ledger Amount
      { wch: 20 }  // Ledger Amount Dr/Cr
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tally Vouchers');
    XLSX.writeFile(wb, filename);
  },

  /**
   * FLAT SINGLE-ROW SUMMARY EXCEL EXPORT (Format in Screenshot 1)
   */
  exportToFlatExcel(vouchers, filename = 'vouchers_summary_export.xlsx') {
    if (typeof XLSX === 'undefined') {
      alert('SheetJS library is required for Excel export');
      return;
    }

    const exportRows = vouchers.map(v => ({
      'Date': v.date,
      'Voucher Number': v.voucher_number,
      'Customer Name': v.customer_name,
      'GSTIN': v.gstin || 'N/A',
      'Rate %': `${v.gst_rate}%`,
      'Taxable Value': v.taxable_value,
      'CGST': v.cgst || 0,
      'SGST': v.sgst || 0,
      'IGST': v.igst || 0,
      'Total GST': v.total_gst || (v.cgst + v.sgst + v.igst),
      'Invoice Total': v.invoice_total,
      'Type': v.interstate ? 'Inter-State (IGST)' : 'Intra-State (CGST+SGST)'
    }));

    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Voucher Summary');
    XLSX.writeFile(wb, filename);
  }
};

window.ExcelHandler = ExcelHandler;
