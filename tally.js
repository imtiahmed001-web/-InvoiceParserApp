/**
 * Tally ERP 9 / Tally Prime XML Export Generator
 * Produces compliant Tally XML data for direct Sales Voucher import.
 */

const TallyExporter = {
  formatDateForTally(dateStr) {
    if (!dateStr) return '';
    const clean = dateStr.replace(/-/g, '');
    return clean; // YYYYMMDD
  },

  escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe).replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  },

  generateXml(vouchers, companyName = 'S. I. & Co.') {
    const timestamp = new Date().toISOString();
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>${this.escapeXml(companyName)}</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>
`;

    vouchers.forEach((v) => {
      const vDate = this.formatDateForTally(v.date);
      const vNum = this.escapeXml(v.voucher_number || `INV-${v.id}`);
      const partyName = this.escapeXml(v.customer_name || 'Cash Sales');
      const gstin = this.escapeXml(v.gstin || '');
      const taxable = parseFloat(v.taxable_value || 0).toFixed(2);
      const total = parseFloat(v.invoice_total || 0).toFixed(2);
      const isInterstate = Boolean(v.interstate);
      const rate = parseFloat(v.gst_rate || 18);

      xml += `        <TALLYMESSAGE xmlns:UDF="TallyUDF">
          <VOUCHER VCHTYPE="Sales" ACTION="Create" OBJVIEW="Invoice Voucher View">
            <DATE>${vDate}</DATE>
            <GUID>VCH-${v.id}-${Date.now()}</GUID>
            <VOUCHERTYPENAME>Sales</VOUCHERTYPENAME>
            <VOUCHERNUMBER>${vNum}</VOUCHERNUMBER>
            <PARTYLEDGERNAME>${partyName}</PARTYLEDGERNAME>
            <PARTYNAME>${partyName}</PARTYNAME>
            <PARTYGSTIN>${gstin}</PARTYGSTIN>
            <ISINVOICE>Yes</ISINVOICE>
            <EFFECTIVEDATE>${vDate}</EFFECTIVEDATE>
            
            <!-- 1. Party Account (Debit) -->
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${partyName}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>Yes</ISDEEMEDPOSITIVE>
              <AMOUNT>-${total}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            
            <!-- 2. Sales Account (Credit) -->
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Sales @ ${rate}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${taxable}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
`;

      if (isInterstate) {
        const igst = parseFloat(v.igst || (taxable * rate / 100)).toFixed(2);
        xml += `            <!-- 3. IGST (Credit) -->
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Output IGST @ ${rate}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${igst}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
`;
      } else {
        const cgst = parseFloat(v.cgst || (taxable * rate / 200)).toFixed(2);
        const sgst = parseFloat(v.sgst || (taxable * rate / 200)).toFixed(2);
        xml += `            <!-- 3. CGST (Credit) -->
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Output CGST @ ${rate / 2}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${cgst}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            <!-- 4. SGST (Credit) -->
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Output SGST @ ${rate / 2}%</LEDGERNAME>
              <ISDEEMEDPOSITIVE>No</ISDEEMEDPOSITIVE>
              <AMOUNT>${sgst}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
`;
      }

      xml += `          </VOUCHER>
        </TALLYMESSAGE>
`;
    });

    xml += `      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`;

    return xml;
  },

  download(vouchers, filename = 'tally_vouchers_import.xml') {
    const xmlContent = this.generateXml(vouchers);
    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

window.TallyExporter = TallyExporter;
