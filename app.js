/**
 * Main Application Logic & State Store
 * Features exact Tally Multi-Line Dr/Cr Excel format matching user requirements,
 * real OCR & PDF bill extraction, and complete sales vouchers ledger management.
 */

// Initial Dataset matching user's real business invoices from screenshot (CR-70 to CR-91)
const DEFAULT_VOUCHERS = [
  {
    id: 'vch_70',
    date: '2026-07-31',
    voucher_number: 'CR-70',
    customer_name: 'ONCORELIEF MEDICAL STORE',
    gstin: '27AHJPM3588F1ZR',
    taxable_value: 800,
    gst_rate: 5,
    interstate: false,
    cgst: 20,
    sgst: 20,
    igst: 0,
    total_gst: 40,
    invoice_total: 840
  },
  {
    id: 'vch_71',
    date: '2026-07-31',
    voucher_number: 'CR-71',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 24050,
    gst_rate: 12,
    interstate: false,
    cgst: 1443,
    sgst: 1443,
    igst: 0,
    total_gst: 2886,
    invoice_total: 26936
  },
  {
    id: 'vch_72',
    date: '2026-07-31',
    voucher_number: 'CR-72',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 5150,
    gst_rate: 5,
    interstate: false,
    cgst: 128.75,
    sgst: 128.75,
    igst: 0,
    total_gst: 257.50,
    invoice_total: 5407.50
  },
  {
    id: 'vch_73',
    date: '2026-08-01',
    voucher_number: 'CR-73',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 6685,
    gst_rate: 5,
    interstate: false,
    cgst: 167.13,
    sgst: 167.12,
    igst: 0,
    total_gst: 334.25,
    invoice_total: 7019.25
  },
  {
    id: 'vch_74',
    date: '2026-08-03',
    voucher_number: 'CR-74',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 32256,
    gst_rate: 5,
    interstate: false,
    cgst: 806.40,
    sgst: 806.40,
    igst: 0,
    total_gst: 1612.80,
    invoice_total: 33868.80
  },
  {
    id: 'vch_75',
    date: '2026-08-03',
    voucher_number: 'CR-75',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 6934,
    gst_rate: 5,
    interstate: false,
    cgst: 173.35,
    sgst: 173.35,
    igst: 0,
    total_gst: 346.70,
    invoice_total: 7280.70
  },
  {
    id: 'vch_76',
    date: '2026-08-05',
    voucher_number: 'CR-76',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 34590,
    gst_rate: 5,
    interstate: false,
    cgst: 864.75,
    sgst: 864.75,
    igst: 0,
    total_gst: 1729.50,
    invoice_total: 36319.50
  },
  {
    id: 'vch_77',
    date: '2026-08-07',
    voucher_number: 'CR-77',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 6900,
    gst_rate: 5,
    interstate: false,
    cgst: 172.50,
    sgst: 172.50,
    igst: 0,
    total_gst: 345,
    invoice_total: 7245
  },
  {
    id: 'vch_78',
    date: '2026-08-08',
    voucher_number: 'CR-78',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 20150,
    gst_rate: 5,
    interstate: false,
    cgst: 503.75,
    sgst: 503.75,
    igst: 0,
    total_gst: 1007.50,
    invoice_total: 21157.50
  },
  {
    id: 'vch_79',
    date: '2026-08-08',
    voucher_number: 'CR-79',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 43400,
    gst_rate: 5,
    interstate: false,
    cgst: 1085,
    sgst: 1085,
    igst: 0,
    total_gst: 2170,
    invoice_total: 45570
  },
  {
    id: 'vch_80',
    date: '2026-08-10',
    voucher_number: 'CR-80',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 2400,
    gst_rate: 5,
    interstate: false,
    cgst: 60,
    sgst: 60,
    igst: 0,
    total_gst: 120,
    invoice_total: 2520
  },
  {
    id: 'vch_81',
    date: '2026-08-13',
    voucher_number: 'CR-81',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 13800,
    gst_rate: 5,
    interstate: false,
    cgst: 345,
    sgst: 345,
    igst: 0,
    total_gst: 690,
    invoice_total: 14490
  },
  {
    id: 'vch_82',
    date: '2026-08-14',
    voucher_number: 'CR-82',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 14975,
    gst_rate: 5,
    interstate: false,
    cgst: 374.38,
    sgst: 374.37,
    igst: 0,
    total_gst: 748.75,
    invoice_total: 15723.75
  },
  {
    id: 'vch_83',
    date: '2026-08-14',
    voucher_number: 'CR-83',
    customer_name: 'ONCORELIEF MEDICAL STORE',
    gstin: '27AHJPM3588F1ZR',
    taxable_value: 920,
    gst_rate: 5,
    interstate: false,
    cgst: 23,
    sgst: 23,
    igst: 0,
    total_gst: 46,
    invoice_total: 966
  },
  {
    id: 'vch_84',
    date: '2026-08-16',
    voucher_number: 'CR-84',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 1770,
    gst_rate: 5,
    interstate: false,
    cgst: 44.25,
    sgst: 44.25,
    igst: 0,
    total_gst: 88.50,
    invoice_total: 1858.50
  },
  {
    id: 'vch_85',
    date: '2026-08-19',
    voucher_number: 'CR-85',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 38400,
    gst_rate: 5,
    interstate: false,
    cgst: 960,
    sgst: 960,
    igst: 0,
    total_gst: 1920,
    invoice_total: 40320
  },
  {
    id: 'vch_86',
    date: '2026-08-20',
    voucher_number: 'CR-86',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 44600,
    gst_rate: 5,
    interstate: false,
    cgst: 1115,
    sgst: 1115,
    igst: 0,
    total_gst: 2230,
    invoice_total: 46830
  },
  {
    id: 'vch_87',
    date: '2026-08-21',
    voucher_number: 'CR-87',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 1910,
    gst_rate: 5,
    interstate: false,
    cgst: 47.75,
    sgst: 47.75,
    igst: 0,
    total_gst: 95.50,
    invoice_total: 2005.50
  },
  {
    id: 'vch_88',
    date: '2026-08-21',
    voucher_number: 'CR-88',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 18105,
    gst_rate: 5,
    interstate: false,
    cgst: 452.63,
    sgst: 452.62,
    igst: 0,
    total_gst: 905.25,
    invoice_total: 19010.25
  },
  {
    id: 'vch_89',
    date: '2026-08-28',
    voucher_number: 'CR-89',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 32745,
    gst_rate: 5,
    interstate: false,
    cgst: 818.63,
    sgst: 818.62,
    igst: 0,
    total_gst: 1637.25,
    invoice_total: 34382.25
  },
  {
    id: 'vch_90',
    date: '2026-08-28',
    voucher_number: 'CR-90',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 34640,
    gst_rate: 5,
    interstate: false,
    cgst: 866,
    sgst: 866,
    igst: 0,
    total_gst: 1732,
    invoice_total: 36372
  },
  {
    id: 'vch_91',
    date: '2026-08-30',
    voucher_number: 'CR-91',
    customer_name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    taxable_value: 45150,
    gst_rate: 5,
    interstate: false,
    cgst: 1128.75,
    sgst: 1128.75,
    igst: 0,
    total_gst: 2257.50,
    invoice_total: 47407.50
  }
];

// Initial Default Client Master Dataset (Indian Healthcare, Pharma & Commercial Enterprises)
const DEFAULT_CLIENTS = [
  {
    id: 'cli_1',
    name: 'ONCORELIEF MEDICAL STORE',
    gstin: '27AHJPM3588F1ZR',
    stateCode: '27',
    stateName: 'Maharashtra',
    pan: 'AHJPM3588F',
    contactPerson: 'Dr. Suresh Mehta',
    phone: '+91 98201 44521',
    email: 'accounts@oncorelief.com',
    address: 'Shop 4, Lifecare Complex, Dadar West, Mumbai - 400028',
    paymentTerms: '30 Days Net'
  },
  {
    id: 'cli_2',
    name: 'M/s Suvidha Icu & Cathlab Centre Llp',
    gstin: '27ACWFS1289P1Z3',
    stateCode: '27',
    stateName: 'Maharashtra',
    pan: 'ACWFS1289P',
    contactPerson: 'Mr. Rajesh Kulkarni',
    phone: '+91 98220 89100',
    email: 'billing@suvidhaicu.org',
    address: 'Survey 14/2, Station Road, Dhankawadi, Pune - 411043',
    paymentTerms: '15 Days Net'
  },
  {
    id: 'cli_3',
    name: 'Apollo Hospitals Enterprise Ltd',
    gstin: '33AABCA0123M1Z2',
    stateCode: '33',
    stateName: 'Tamil Nadu',
    pan: 'AABCA0123M',
    contactPerson: 'CFO Procurement Dept',
    phone: '+91 44 2829 0200',
    email: 'gst.billing@apollohospitals.com',
    address: '21 Greams Lane, Off Greams Road, Chennai - 600006',
    paymentTerms: '45 Days Net'
  },
  {
    id: 'cli_4',
    name: 'Fortis Healthcare Diagnostics',
    gstin: '07AAACF2040D1ZT',
    stateCode: '07',
    stateName: 'Delhi',
    pan: 'AAACF2040D',
    contactPerson: 'Ms. Ananya Sharma',
    phone: '+91 11 4277 6222',
    email: 'vendor.desk@fortishealthcare.com',
    address: 'Tower A, Sector 44, Gurgaon - 122002',
    paymentTerms: '30 Days Net'
  },
  {
    id: 'cli_5',
    name: 'Max Healthcare Super Specialty',
    gstin: '07AAACM3941H1Z6',
    stateCode: '07',
    stateName: 'Delhi',
    pan: 'AAACM3941H',
    contactPerson: 'Mr. Vikram Singhal',
    phone: '+91 11 2651 5050',
    email: 'invoicing@maxhealthcare.com',
    address: '1 Press Enclave Road, Saket, New Delhi - 110017',
    paymentTerms: '30 Days Net'
  },
  {
    id: 'cli_6',
    name: 'Manipal Health Enterprises Pvt Ltd',
    gstin: '29AAACM6942Q1Z9',
    stateCode: '29',
    stateName: 'Karnataka',
    pan: 'AAACM6942Q',
    contactPerson: 'Procurement Cell',
    phone: '+91 80 2502 4444',
    email: 'accounts.blr@manipalhospitals.com',
    address: '98 HAL Old Airport Road, Kodihalli, Bengaluru - 560017',
    paymentTerms: '30 Days Net'
  },
  {
    id: 'cli_7',
    name: 'MedPlus Health Services Ltd',
    gstin: '36AABCM3764E1ZY',
    stateCode: '36',
    stateName: 'Telangana',
    pan: 'AABCM3764E',
    contactPerson: 'Supply Chain Operations',
    phone: '+91 40 6724 9000',
    email: 'gstinvoices@medplusindia.com',
    address: 'Plot 11, Financial District, Nanakramguda, Hyderabad - 500032',
    paymentTerms: '21 Days Net'
  }
];

class AppStore {
  constructor() {
    this.STORAGE_KEY = 'emergent_gst_vouchers_v2';
    this.CLIENTS_STORAGE_KEY = 'emergent_gst_clients_v2';
    this.vouchers = this.loadVouchers();
    this.clients = this.loadClients();
    this.currentView = 'dashboard';
    this.batchExtractedBills = [];
    this.activeInspectedBill = null;
    this.pendingExcelImport = null;
    this.activeClientForLedger = null;
  }

  loadVouchers() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse vouchers from localStorage:', e);
    }
    this.saveVouchers(DEFAULT_VOUCHERS);
    return [...DEFAULT_VOUCHERS];
  }

  saveVouchers(list) {
    this.vouchers = list;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save vouchers to localStorage:', e);
    }
  }

  // ==========================================
  // CLIENTS / CUSTOMERS MASTER STORAGE
  // ==========================================
  loadClients() {
    try {
      const data = localStorage.getItem(this.CLIENTS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse clients from localStorage:', e);
    }
    this.saveClients(DEFAULT_CLIENTS);
    return [...DEFAULT_CLIENTS];
  }

  saveClients(list) {
    this.clients = list;
    try {
      localStorage.setItem(this.CLIENTS_STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save clients to localStorage:', e);
    }
  }

  addClient(c) {
    const cleanGstin = (c.gstin || '').toUpperCase().trim();
    const stateCode = cleanGstin.slice(0, 2);
    const stateName = BillParser.INDIAN_STATES[stateCode] || (stateCode === '27' ? 'Maharashtra' : 'Other State');
    const pan = cleanGstin.length >= 10 ? cleanGstin.slice(2, 10) : '';

    const newClient = {
      id: c.id || `cli_${Date.now()}`,
      name: (c.name || '').trim(),
      gstin: cleanGstin,
      stateCode: stateCode,
      stateName: c.stateName || stateName,
      pan: c.pan || pan,
      contactPerson: c.contactPerson || '',
      phone: c.phone || '',
      email: c.email || '',
      address: c.address || '',
      paymentTerms: c.paymentTerms || '30 Days Net'
    };

    this.clients.unshift(newClient);
    this.saveClients(this.clients);
    return newClient;
  }

  updateClient(id, updated) {
    this.clients = this.clients.map(c => {
      if (c.id === id) {
        const cleanGstin = (updated.gstin !== undefined ? updated.gstin : c.gstin).toUpperCase().trim();
        const stateCode = cleanGstin.slice(0, 2);
        const stateName = BillParser.INDIAN_STATES[stateCode] || c.stateName;
        const pan = cleanGstin.length >= 10 ? cleanGstin.slice(2, 10) : c.pan;

        return {
          ...c,
          ...updated,
          gstin: cleanGstin,
          stateCode: stateCode,
          stateName: updated.stateName || stateName,
          pan: pan
        };
      }
      return c;
    });
    this.saveClients(this.clients);
  }

  deleteClient(id) {
    this.clients = this.clients.filter(c => c.id !== id);
    this.saveClients(this.clients);
  }

  getClientById(id) {
    return this.clients.find(c => c.id === id);
  }

  getClientByGstin(rawGstin) {
    if (!rawGstin) return null;
    const clean = rawGstin.toUpperCase().replace(/[^A-Z0-9]/g, '');
    return this.clients.find(c => c.gstin.toUpperCase().replace(/[^A-Z0-9]/g, '') === clean);
  }

  getClientByName(name) {
    if (!name) return null;
    const q = name.trim().toLowerCase();
    return this.clients.find(c => c.name.toLowerCase() === q || c.name.toLowerCase().includes(q) || q.includes(c.name.toLowerCase()));
  }

  upsertClientFromVoucher(voucher) {
    if (!voucher || !voucher.customer_name) return null;
    const name = voucher.customer_name.trim();
    const gstin = (voucher.gstin || '').toUpperCase().trim();

    if (gstin && gstin.length === 15) {
      let existing = this.getClientByGstin(gstin);
      if (existing) {
        if (!existing.name || existing.name.length < name.length) {
          existing.name = name;
          this.saveClients(this.clients);
        }
        return existing;
      }
      return this.addClient({ name, gstin });
    } else {
      let existingByName = this.getClientByName(name);
      if (!existingByName && name.length >= 3) {
        return this.addClient({ name, gstin: gstin || 'Unregistered' });
      }
      return existingByName;
    }
  }

  getClientSalesSummary(clientIdOrGstin) {
    const client = typeof clientIdOrGstin === 'object' 
      ? clientIdOrGstin 
      : (this.getClientById(clientIdOrGstin) || this.getClientByGstin(clientIdOrGstin));

    if (!client) {
      return { client: null, vouchers: [], totals: { count: 0, taxable_value: 0, cgst: 0, sgst: 0, igst: 0, total_gst: 0, invoice_total: 0, average_ticket: 0 } };
    }

    const cleanGstin = client.gstin.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const clientNameLower = client.name.toLowerCase().trim();

    const clientVouchers = this.vouchers.filter(v => {
      const vGstin = (v.gstin || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const vName = (v.customer_name || '').toLowerCase().trim();
      
      if (cleanGstin && cleanGstin.length === 15 && vGstin === cleanGstin) return true;
      if (vName && (vName === clientNameLower || vName.includes(clientNameLower) || clientNameLower.includes(vName))) return true;
      return false;
    });

    let taxable = 0, cgst = 0, sgst = 0, igst = 0, totalGst = 0, invoiceTotal = 0;
    clientVouchers.forEach(v => {
      taxable += parseFloat(v.taxable_value || 0);
      cgst += parseFloat(v.cgst || 0);
      sgst += parseFloat(v.sgst || 0);
      igst += parseFloat(v.igst || 0);
      totalGst += parseFloat(v.total_gst || (v.cgst + v.sgst + v.igst) || 0);
      invoiceTotal += parseFloat(v.invoice_total || 0);
    });

    const count = clientVouchers.length;
    const avgTicket = count > 0 ? +(invoiceTotal / count).toFixed(2) : 0;

    return {
      client,
      vouchers: clientVouchers,
      totals: {
        count,
        taxable_value: +taxable.toFixed(2),
        cgst: +cgst.toFixed(2),
        sgst: +sgst.toFixed(2),
        igst: +igst.toFixed(2),
        total_gst: +totalGst.toFixed(2),
        invoice_total: +invoiceTotal.toFixed(2),
        average_ticket: avgTicket
      }
    };
  }

  getClientsSummary() {
    const totalClients = this.clients.length;
    let activeClientsCount = 0;
    let totalSales = 0;

    this.clients.forEach(c => {
      const summary = this.getClientSalesSummary(c);
      if (summary.totals.count > 0) {
        activeClientsCount++;
        totalSales += summary.totals.invoice_total;
      }
    });

    const avgSales = activeClientsCount > 0 ? +(totalSales / activeClientsCount).toFixed(2) : 0;

    return {
      totalClients,
      activeClientsCount,
      totalSales: +totalSales.toFixed(2),
      avgSales
    };
  }

  addVoucher(v) {
    this.vouchers.unshift(v);
    this.upsertClientFromVoucher(v);
    this.saveVouchers(this.vouchers);
  }

  addBatchVouchers(list) {
    this.vouchers = [...list, ...this.vouchers];
    list.forEach(v => this.upsertClientFromVoucher(v));
    this.saveVouchers(this.vouchers);
  }

  updateVoucher(id, updated) {
    this.vouchers = this.vouchers.map(v => v.id === id ? { ...v, ...updated } : v);
    if (updated.customer_name || updated.gstin) {
      this.upsertClientFromVoucher(updated);
    }
    this.saveVouchers(this.vouchers);
  }

  deleteVoucher(id) {
    this.vouchers = this.vouchers.filter(v => v.id !== id);
    this.saveVouchers(this.vouchers);
  }

  deleteBatchVouchers(ids) {
    if (!Array.isArray(ids) || ids.length === 0) return 0;
    const idSet = new Set(ids);
    const initialCount = this.vouchers.length;
    this.vouchers = this.vouchers.filter(v => !idSet.has(v.id));
    const deletedCount = initialCount - this.vouchers.length;
    this.saveVouchers(this.vouchers);
    return deletedCount;
  }

  getSummary(dateFrom = null, dateTo = null) {
    let list = this.vouchers;
    if (dateFrom) {
      list = list.filter(v => v.date >= dateFrom);
    }
    if (dateTo) {
      list = list.filter(v => v.date <= dateTo);
    }

    const count = list.length;
    let taxable = 0, cgst = 0, sgst = 0, igst = 0, totalGst = 0, invoiceTotal = 0;
    const rateMap = { 0: 0, 5: 0, 12: 0, 18: 0, 28: 0 };
    const monthlyMap = {};

    list.forEach(v => {
      const taxVal = parseFloat(v.taxable_value || 0);
      const c = parseFloat(v.cgst || 0);
      const s = parseFloat(v.sgst || 0);
      const i = parseFloat(v.igst || 0);
      const invTot = parseFloat(v.invoice_total || 0);
      const r = v.gst_rate || 5;

      taxable += taxVal;
      cgst += c;
      sgst += s;
      igst += i;
      totalGst += (c + s + i);
      invoiceTotal += invTot;

      if (rateMap[r] !== undefined) {
        rateMap[r] += invTot;
      } else {
        rateMap[r] = invTot;
      }

      const monthKey = v.date ? v.date.slice(0, 7) : '2026-08';
      if (!monthlyMap[monthKey]) {
        monthlyMap[monthKey] = { month: monthKey, taxable: 0, total: 0, count: 0 };
      }
      monthlyMap[monthKey].taxable += taxVal;
      monthlyMap[monthKey].total += invTot;
      monthlyMap[monthKey].count += 1;
    });

    const monthlyList = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    return {
      totals: {
        count,
        taxable_value: +taxable.toFixed(2),
        cgst: +cgst.toFixed(2),
        sgst: +sgst.toFixed(2),
        igst: +igst.toFixed(2),
        total_gst: +totalGst.toFixed(2),
        invoice_total: +invoiceTotal.toFixed(2)
      },
      by_rate: rateMap,
      monthly: monthlyList
    };
  }
}

// Utility Formatters
const Format = {
  currency(num) {
    if (num === null || num === undefined || isNaN(num)) return '0.00';
    return Number(num).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  },

  date(dateStr) {
    if (!dateStr) return '-';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }
};

// UI Manager
class UIManager {
  constructor(store) {
    this.store = store;
    this.selectedVoucherIds = new Set();
    this.filteredVouchers = [];
    this.inspectorState = {
      bill: null,
      currentPage: 1,
      totalPages: 1,
      scale: 1.4,
      activeTargetField: null,
      selectedBox: null,
      selectedText: '',
      activeTab: 'fields'
    };
    this.initEventListeners();
    this.handleRoute();
  }

  initEventListeners() {
    window.addEventListener('hashchange', () => this.handleRoute());

    const toggleBtn = document.getElementById('mobileToggleBtn');
    const sidebar = document.getElementById('sidebar');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
      });
    }

    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    this.initVoucherSelectionEvents();
    this.initVoucherModalCalculations();
    this.initClientEvents();
    this.initExcelImportEvents();
    this.initBatchBillExtractEvents();
    this.updateClientDatalists();

    const searchInput = document.getElementById('voucherSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderVouchersTable());
    }

    ['voucherRateFilter', 'voucherTypeFilter'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('change', () => this.renderVouchersTable());
    });

    const reportApplyBtn = document.getElementById('reportApplyBtn');
    const reportResetBtn = document.getElementById('reportResetBtn');
    if (reportApplyBtn) {
      reportApplyBtn.addEventListener('click', () => this.renderReportsView());
    }
    if (reportResetBtn) {
      reportResetBtn.addEventListener('click', () => {
        document.getElementById('reportFromDate').value = '';
        document.getElementById('reportToDate').value = '';
        this.renderReportsView();
      });
    }

    // EXPORT TO TALLY MULTI-LINE EXCEL (Screenshot 2 Format)
    document.getElementById('exportTallyExcelBtn')?.addEventListener('click', () => {
      ExcelHandler.exportToTallyExcel(this.store.vouchers, 'tally_sales_vouchers_multiline.xlsx');
      this.showToast('Downloaded Tally Multi-Line Excel format!', 'success');
    });

    // FLAT SUMMARY EXCEL EXPORT (Screenshot 1 Format)
    document.getElementById('exportFlatExcelBtn')?.addEventListener('click', () => {
      ExcelHandler.exportToFlatExcel(this.store.vouchers, 'vouchers_summary_ledger.xlsx');
      this.showToast('Downloaded Summary Excel ledger!', 'success');
    });

    // TALLY XML EXPORT
    document.getElementById('exportTallyXmlBtn')?.addEventListener('click', () => {
      TallyExporter.download(this.store.vouchers);
      this.showToast('Generated Tally XML for Sales Vouchers!', 'success');
    });

    // Reports export buttons
    document.getElementById('reportExportXlsxBtn')?.addEventListener('click', () => {
      ExcelHandler.exportToTallyExcel(this.store.vouchers, 'tally_report_multiline.xlsx');
      this.showToast('Exported Tally Excel Report!', 'success');
    });

    document.getElementById('reportExportPdfBtn')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('reportExportJsonBtn')?.addEventListener('click', () => {
      this.exportGstrJson();
    });
  }

  handleRoute() {
    const hash = window.location.hash || '#dashboard';
    const route = hash.replace('#', '');
    this.navigateTo(route);
  }

  navigateTo(viewName) {
    const validViews = ['dashboard', 'vouchers', 'clients', 'import', 'extract', 'reports'];
    const activeView = validViews.includes(viewName) ? viewName : 'dashboard';
    this.store.currentView = activeView;

    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('href') === `#${activeView}`) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    document.querySelectorAll('.view-section').forEach(el => {
      el.classList.remove('active');
    });

    const targetSection = document.getElementById(`view-${activeView}`);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    const titleMap = {
      dashboard: 'Dashboard',
      vouchers: 'Sales Vouchers Ledger',
      clients: 'Clients / Customers Master Directory',
      import: 'Excel / CSV Import',
      extract: 'Batch Bill AI Extractor (1-Click)',
      reports: 'GST Reports & GSTR-1 Analytics'
    };
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = titleMap[activeView] || 'Dashboard';

    switch (activeView) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'vouchers':
        this.renderVouchersTable();
        break;
      case 'clients':
        this.renderClientsView();
        break;
      case 'import':
        this.resetExcelImportUI();
        break;
      case 'extract':
        this.renderBatchBillExtractView();
        break;
      case 'reports':
        this.renderReportsView();
        break;
    }
  }

  // ==========================================
  // DASHBOARD RENDERING
  // ==========================================
  renderDashboard() {
    const summary = this.store.getSummary();
    const totals = summary.totals;

    document.getElementById('kpi-vouchers').textContent = totals.count;
    document.getElementById('kpi-taxable').textContent = `₹ ${Format.currency(totals.taxable_value)}`;
    document.getElementById('kpi-cgst').textContent = `₹ ${Format.currency(totals.cgst)}`;
    document.getElementById('kpi-sgst-igst').textContent = `₹ ${Format.currency(totals.sgst + totals.igst)}`;
    document.getElementById('kpi-invoice-total').textContent = `₹ ${Format.currency(totals.invoice_total)}`;

    const recentTableBody = document.getElementById('recentVouchersBody');
    if (recentTableBody) {
      const recent = this.store.vouchers.slice(0, 5);
      if (recent.length === 0) {
        recentTableBody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-500">No vouchers yet.</td></tr>`;
      } else {
        recentTableBody.innerHTML = recent.map(v => `
          <tr>
            <td class="font-mono-data">${v.date}</td>
            <td class="font-mono-data font-bold">${v.voucher_number}</td>
            <td class="font-medium">${v.customer_name}</td>
            <td><span class="badge ${v.interstate ? 'badge-interstate' : 'badge-intrastate'}">${v.interstate ? 'IGST' : 'CGST+SGST'}</span></td>
            <td><span class="badge badge-rate">${v.gst_rate}%</span></td>
            <td class="font-mono-data text-right font-bold">₹ ${Format.currency(v.invoice_total)}</td>
            <td class="text-right">
              <button class="btn btn-outline btn-sm" onclick="app.viewVoucher('${v.id}')">View</button>
            </td>
          </tr>
        `).join('');
      }
    }

    this.renderMonthlyChart(summary.monthly);
    this.renderRateDonutChart(summary.by_rate);
  }

  renderMonthlyChart(monthlyData) {
    const container = document.getElementById('monthlyChartContainer');
    if (!container) return;

    if (!monthlyData || monthlyData.length === 0) {
      container.innerHTML = `<div class="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>`;
      return;
    }

    const maxVal = Math.max(...monthlyData.map(m => m.total), 1000);
    const chartHeight = 220;
    const chartWidth = 500;
    const barWidth = 40;
    const spacing = chartWidth / (monthlyData.length + 1);

    let barsSvg = '';
    monthlyData.forEach((m, idx) => {
      const x = spacing * (idx + 1) - (barWidth / 2);
      const barHeight = Math.max((m.total / maxVal) * (chartHeight - 40), 10);
      const y = chartHeight - barHeight - 25;

      barsSvg += `
        <g class="chart-bar-group">
          <title>${m.month}: ₹ ${Format.currency(m.total)} (${m.count} vouchers)</title>
          <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" rx="4" fill="#0f172a" />
          <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="10" font-family="Plus Jakarta Sans" font-weight="700" fill="#0f172a">₹${(m.total / 1000).toFixed(0)}k</text>
          <text x="${x + barWidth / 2}" y="${chartHeight - 5}" text-anchor="middle" font-size="11" font-family="Plus Jakarta Sans" fill="#64748b">${m.month}</text>
        </g>
      `;
    });

    container.innerHTML = `
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" style="width: 100%; height: 100%; overflow: visible;">
        <line x1="20" y1="40" x2="${chartWidth - 20}" y2="40" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="20" y1="100" x2="${chartWidth - 20}" y2="100" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="20" y1="160" x2="${chartWidth - 20}" y2="160" stroke="#f1f5f9" stroke-dasharray="4" />
        <line x1="20" y1="${chartHeight - 25}" x2="${chartWidth - 20}" y2="${chartHeight - 25}" stroke="#cbd5e1" stroke-width="1.5" />
        ${barsSvg}
      </svg>
    `;
  }

  renderRateDonutChart(byRate) {
    const container = document.getElementById('rateDonutContainer');
    const legend = document.getElementById('rateDonutLegend');
    if (!container) return;

    const rates = [0, 5, 12, 18, 28];
    const colors = {
      0: '#94a3b8',
      5: '#059669',
      12: '#0284c7',
      18: '#0f172a',
      28: '#e11d48'
    };

    const totalAll = Object.values(byRate).reduce((acc, v) => acc + v, 0);

    if (totalAll === 0) {
      container.innerHTML = `<div class="text-sm text-slate-400">No GST rate data</div>`;
      if (legend) legend.innerHTML = '';
      return;
    }

    let currentPct = 0;
    const gradientStops = [];
    let legendHtml = '';

    rates.forEach(r => {
      const val = byRate[r] || 0;
      if (val > 0) {
        const pct = (val / totalAll) * 100;
        const start = currentPct;
        const end = currentPct + pct;
        gradientStops.push(`${colors[r]} ${start}% ${end}%`);
        currentPct = end;

        legendHtml += `
          <div style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 10px; height: 10px; border-radius: 2px; background: ${colors[r]};"></span>
              <span style="font-weight: 600;">${r}% GST</span>
            </div>
            <span style="font-family: JetBrains Mono; font-weight: 700;">₹ ${Format.currency(val)} (${pct.toFixed(0)}%)</span>
          </div>
        `;
      }
    });

    const bgGradient = `conic-gradient(${gradientStops.join(', ')})`;

    container.innerHTML = `
      <div style="width: 160px; height: 160px; border-radius: 50%; background: ${bgGradient}; position: relative; margin: 0 auto; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.06);">
        <div style="width: 95px; height: 95px; border-radius: 50%; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
          <span style="font-size: 10px; color: #64748b; font-weight: 600;">TOTAL</span>
          <span style="font-size: 12px; font-weight: 800; color: #0f172a; font-family: JetBrains Mono;">₹${(totalAll / 1000).toFixed(0)}k</span>
        </div>
      </div>
    `;

    if (legend) legend.innerHTML = legendHtml;
  }

  // ==========================================
  // VOUCHERS LEDGER TABLE & MULTI-SELECTION
  // ==========================================
  initVoucherSelectionEvents() {
    const selectAllCheckbox = document.getElementById('selectAllVouchersCheckbox');
    const selectAllFilteredBtn = document.getElementById('selectAllFilteredVouchersBtn');
    const clearSelectionBtn = document.getElementById('clearVoucherSelectionBtn');
    const deleteSelectedBtn = document.getElementById('deleteSelectedVouchersBtn');
    const exportSelectedBtn = document.getElementById('exportSelectedExcelBtn');

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
          this.filteredVouchers.forEach(v => this.selectedVoucherIds.add(v.id));
        } else {
          this.filteredVouchers.forEach(v => this.selectedVoucherIds.delete(v.id));
        }
        this.renderVouchersTable();
      });
    }

    if (selectAllFilteredBtn) {
      selectAllFilteredBtn.addEventListener('click', () => {
        this.filteredVouchers.forEach(v => this.selectedVoucherIds.add(v.id));
        this.renderVouchersTable();
      });
    }

    if (clearSelectionBtn) {
      clearSelectionBtn.addEventListener('click', () => {
        this.selectedVoucherIds.clear();
        this.renderVouchersTable();
      });
    }

    if (deleteSelectedBtn) {
      deleteSelectedBtn.addEventListener('click', () => {
        const count = this.selectedVoucherIds.size;
        if (count === 0) return;

        const confirmMsg = count === 1
          ? 'Are you sure you want to delete 1 selected sales voucher?'
          : `Are you sure you want to permanently delete all ${count} selected sales vouchers? This action cannot be undone.`;

        if (confirm(confirmMsg)) {
          const idsToDelete = Array.from(this.selectedVoucherIds);
          const deletedCount = this.store.deleteBatchVouchers(idsToDelete);
          this.selectedVoucherIds.clear();
          this.renderVouchersTable();
          this.renderDashboard();
          this.showToast(`Successfully deleted ${deletedCount} voucher(s) in one click!`, 'success');
        }
      });
    }

    if (exportSelectedBtn) {
      exportSelectedBtn.addEventListener('click', () => {
        const selected = this.store.vouchers.filter(v => this.selectedVoucherIds.has(v.id));
        if (selected.length === 0) {
          this.showToast('No vouchers selected to export', 'error');
          return;
        }
        ExcelHandler.exportToTallyExcel(selected, `tally_selected_${selected.length}_vouchers.xlsx`);
        this.showToast(`Exported ${selected.length} selected vouchers to Excel!`, 'success');
      });
    }
  }

  toggleVoucherSelection(id, isSelected) {
    if (isSelected) {
      this.selectedVoucherIds.add(id);
    } else {
      this.selectedVoucherIds.delete(id);
    }
    const row = document.querySelector(`tr[data-row-voucher-id="${id}"]`);
    if (row) {
      if (isSelected) row.classList.add('row-selected');
      else row.classList.remove('row-selected');
    }
    this.updateVoucherSelectionBar();
  }

  updateVoucherSelectionBar() {
    const bar = document.getElementById('voucherBulkActionBar');
    const countEl = document.getElementById('voucherSelectedCount');
    const badgeEl = document.getElementById('deleteSelectedCountBadge');
    const filteredCountEl = document.getElementById('voucherFilteredCount');
    const selectAllCheckbox = document.getElementById('selectAllVouchersCheckbox');

    const totalSelected = this.selectedVoucherIds.size;
    const visibleCount = this.filteredVouchers.length;

    let selectedInVisible = 0;
    this.filteredVouchers.forEach(v => {
      if (this.selectedVoucherIds.has(v.id)) selectedInVisible++;
    });

    if (selectAllCheckbox) {
      if (visibleCount > 0 && selectedInVisible === visibleCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
      } else if (selectedInVisible > 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
      } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
      }
    }

    if (totalSelected > 0) {
      if (bar) bar.style.display = 'flex';
      if (countEl) countEl.textContent = totalSelected;
      if (badgeEl) badgeEl.textContent = totalSelected;
      if (filteredCountEl) filteredCountEl.textContent = visibleCount;
    } else {
      if (bar) bar.style.display = 'none';
      if (countEl) countEl.textContent = '0';
      if (badgeEl) badgeEl.textContent = '0';
      if (filteredCountEl) filteredCountEl.textContent = visibleCount;
    }
  }

  handleRowClick(event, id) {
    // If clicked on button, interactive element, or checkbox, don't double toggle
    if (event.target.closest('button') || event.target.closest('a') || event.target.closest('input')) {
      return;
    }
    const willSelect = !this.selectedVoucherIds.has(id);
    this.toggleVoucherSelection(id, willSelect);
    const cb = document.querySelector(`input.voucher-row-checkbox[data-voucher-id="${id}"]`);
    if (cb) cb.checked = willSelect;
  }

  renderVouchersTable() {
    const tbody = document.getElementById('vouchersTableBody');
    if (!tbody) return;

    const query = (document.getElementById('voucherSearchInput')?.value || '').toLowerCase().trim();
    const rateFilter = document.getElementById('voucherRateFilter')?.value;
    const typeFilter = document.getElementById('voucherTypeFilter')?.value;

    let list = this.store.vouchers.filter(v => {
      const matchSearch = !query || 
        (v.voucher_number && v.voucher_number.toLowerCase().includes(query)) ||
        (v.customer_name && v.customer_name.toLowerCase().includes(query)) ||
        (v.gstin && v.gstin.toLowerCase().includes(query));

      const matchRate = !rateFilter || rateFilter === 'all' || String(v.gst_rate) === rateFilter;

      const matchType = !typeFilter || typeFilter === 'all' || 
        (typeFilter === 'interstate' && v.interstate) ||
        (typeFilter === 'intrastate' && !v.interstate);

      return matchSearch && matchRate && matchType;
    });

    this.filteredVouchers = list;

    const countBadge = document.getElementById('vouchersTotalCount');
    if (countBadge) countBadge.textContent = `${list.length} Vouchers`;

    this.updateVoucherSelectionBar();

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="12" class="text-center py-12 text-slate-500">
            <div style="font-size: 16px; font-weight: 600; color: #334155; margin-bottom: 4px;">No vouchers matched your filters</div>
            <div style="font-size: 13px;">Try clearing search terms or upload bills to extract new vouchers.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(v => {
      const isSelected = this.selectedVoucherIds.has(v.id);
      return `
        <tr class="${isSelected ? 'row-selected' : ''}" data-row-voucher-id="${v.id}" onclick="app.handleRowClick(event, '${v.id}')" style="cursor: pointer;">
          <td style="text-align: center; width: 44px; padding: 12px 10px;" onclick="event.stopPropagation()">
            <input type="checkbox" class="voucher-row-checkbox voucher-checkbox" data-voucher-id="${v.id}" ${isSelected ? 'checked' : ''} onchange="app.toggleVoucherSelection('${v.id}', this.checked)" />
          </td>
          <td class="font-mono-data">${v.date}</td>
          <td class="font-mono-data font-bold">${v.voucher_number}</td>
          <td>
            <div class="font-bold text-slate-900">${v.customer_name}</div>
            <div class="font-mono-data text-xs text-slate-500">${v.gstin || 'Unregistered Party'}</div>
          </td>
          <td><span class="badge ${v.interstate ? 'badge-interstate' : 'badge-intrastate'}">${v.interstate ? 'Inter-State' : 'Intra-State'}</span></td>
          <td><span class="badge badge-rate">${v.gst_rate}%</span></td>
          <td class="font-mono-data text-right">₹ ${Format.currency(v.taxable_value)}</td>
          <td class="font-mono-data text-right text-xs">
            ${v.interstate ? `<span class="text-slate-400">-</span>` : `₹ ${Format.currency(v.cgst)}`}
          </td>
          <td class="font-mono-data text-right text-xs">
            ${v.interstate ? `<span class="text-slate-400">-</span>` : `₹ ${Format.currency(v.sgst)}`}
          </td>
          <td class="font-mono-data text-right text-xs">
            ${v.interstate ? `₹ ${Format.currency(v.igst)}` : `<span class="text-slate-400">-</span>`}
          </td>
          <td class="font-mono-data text-right font-bold text-slate-900">₹ ${Format.currency(v.invoice_total)}</td>
          <td class="text-right">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm btn-icon-only" title="View / Print Invoice" onclick="app.viewVoucher('${v.id}')">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>
              <button class="btn btn-outline btn-sm btn-icon-only" title="Edit Voucher" onclick="app.openEditVoucherModal('${v.id}')">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="btn btn-outline btn-sm btn-icon-only text-rose-600" title="Delete Voucher" onclick="app.deleteVoucher('${v.id}')">
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  initVoucherModalCalculations() {
    const inputs = ['vchInputTaxable', 'vchInputRate', 'vchInputInterstate'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.updateModalTaxSummary());
        el.addEventListener('change', () => this.updateModalTaxSummary());
      }
    });

    // Auto-population of Customer Name from GSTIN
    const gstinInput = document.getElementById('vchInputGstin');
    const customerInput = document.getElementById('vchInputCustomer');
    const interstateCheckbox = document.getElementById('vchInputInterstate');
    const stateBadge = document.getElementById('vchGstinStateBadge');

    if (gstinInput) {
      gstinInput.addEventListener('input', () => {
        const rawGstin = gstinInput.value.toUpperCase().trim();
        if (rawGstin.length >= 2) {
          const stateCode = rawGstin.slice(0, 2);
          const stateName = BillParser.INDIAN_STATES[stateCode] || (stateCode === '27' ? 'Maharashtra' : 'Other State');
          if (stateBadge) {
            stateBadge.textContent = stateName;
            stateBadge.style.display = 'inline-block';
            stateBadge.className = `badge ${stateCode === '27' ? 'badge-intrastate' : 'badge-interstate'}`;
          }
          if (interstateCheckbox) {
            interstateCheckbox.checked = (stateCode !== '27');
            this.updateModalTaxSummary();
          }
        } else if (stateBadge) {
          stateBadge.style.display = 'none';
        }

        // Auto-lookup matching customer from client master
        if (rawGstin.length >= 14) {
          const matchClient = this.store.getClientByGstin(rawGstin);
          if (matchClient && customerInput) {
            customerInput.value = matchClient.name;
          }
        }
      });
    }

    if (customerInput) {
      customerInput.addEventListener('input', () => {
        const val = customerInput.value.trim();
        if (val.length >= 3) {
          const matchClient = this.store.getClientByName(val);
          if (matchClient && matchClient.gstin && matchClient.gstin !== 'Unregistered') {
            if (gstinInput && !gstinInput.value) {
              gstinInput.value = matchClient.gstin;
              const stateCode = matchClient.gstin.slice(0, 2);
              if (interstateCheckbox) {
                interstateCheckbox.checked = (stateCode !== '27');
                this.updateModalTaxSummary();
              }
              if (stateBadge) {
                stateBadge.textContent = matchClient.stateName || 'Maharashtra';
                stateBadge.style.display = 'inline-block';
                stateBadge.className = `badge ${stateCode === '27' ? 'badge-intrastate' : 'badge-interstate'}`;
              }
            }
          }
        }
      });
    }

    const form = document.getElementById('voucherForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveVoucherFromModal();
      });
    }
  }

  updateModalTaxSummary() {
    const taxable = parseFloat(document.getElementById('vchInputTaxable')?.value || 0);
    const rate = parseFloat(document.getElementById('vchInputRate')?.value || 5);
    const isInterstate = document.getElementById('vchInputInterstate')?.checked;

    const totalTax = +(taxable * (rate / 100)).toFixed(2);
    let cgst = 0, sgst = 0, igst = 0;

    if (isInterstate) {
      igst = totalTax;
    } else {
      cgst = +(totalTax / 2).toFixed(2);
      sgst = +(totalTax - cgst).toFixed(2);
    }

    const invoiceTotal = +(taxable + totalTax).toFixed(2);

    document.getElementById('modalTaxablePreview').textContent = `₹ ${Format.currency(taxable)}`;
    
    const cgstRow = document.getElementById('modalCgstRow');
    const sgstRow = document.getElementById('modalSgstRow');
    const igstRow = document.getElementById('modalIgstRow');

    if (isInterstate) {
      if (cgstRow) cgstRow.style.display = 'none';
      if (sgstRow) sgstRow.style.display = 'none';
      if (igstRow) {
        igstRow.style.display = 'flex';
        document.getElementById('modalIgstPreview').textContent = `₹ ${Format.currency(igst)} (${rate}%)`;
      }
    } else {
      if (cgstRow) {
        cgstRow.style.display = 'flex';
        document.getElementById('modalCgstPreview').textContent = `₹ ${Format.currency(cgst)} (${rate / 2}%)`;
      }
      if (sgstRow) {
        sgstRow.style.display = 'flex';
        document.getElementById('modalSgstPreview').textContent = `₹ ${Format.currency(sgst)} (${rate / 2}%)`;
      }
      if (igstRow) igstRow.style.display = 'none';
    }

    document.getElementById('modalTotalPreview').textContent = `₹ ${Format.currency(invoiceTotal)}`;
  }

  openNewVoucherModal(prefill = null) {
    document.getElementById('voucherModalTitle').textContent = prefill ? 'New Voucher from Extracted Bill' : 'New Sales Voucher';
    document.getElementById('vchEditId').value = '';
    
    const today = new Date().toISOString().slice(0, 10);
    const autoNum = `CR-${Date.now().toString().slice(-4)}`;

    document.getElementById('vchInputDate').value = prefill?.date || today;
    document.getElementById('vchInputNumber').value = prefill?.voucher_number || autoNum;
    document.getElementById('vchInputCustomer').value = prefill?.customer_name || '';
    document.getElementById('vchInputGstin').value = prefill?.gstin || '';
    document.getElementById('vchInputTaxable').value = prefill?.taxable_value || '';
    document.getElementById('vchInputRate').value = String(prefill?.gst_rate || 5);
    document.getElementById('vchInputInterstate').checked = Boolean(prefill?.interstate);

    this.updateModalTaxSummary();
    document.getElementById('voucherModal').classList.add('open');
  }

  openEditVoucherModal(id) {
    const v = this.store.vouchers.find(item => item.id === id);
    if (!v) return;

    document.getElementById('voucherModalTitle').textContent = 'Edit Sales Voucher';
    document.getElementById('vchEditId').value = v.id;
    document.getElementById('vchInputDate').value = v.date;
    document.getElementById('vchInputNumber').value = v.voucher_number;
    document.getElementById('vchInputCustomer').value = v.customer_name;
    document.getElementById('vchInputGstin').value = v.gstin || '';
    document.getElementById('vchInputTaxable').value = v.taxable_value;
    document.getElementById('vchInputRate').value = String(v.gst_rate);
    document.getElementById('vchInputInterstate').checked = Boolean(v.interstate);

    this.updateModalTaxSummary();
    document.getElementById('voucherModal').classList.add('open');
  }

  saveVoucherFromModal() {
    const editId = document.getElementById('vchEditId').value;
    const date = document.getElementById('vchInputDate').value;
    const voucherNumber = document.getElementById('vchInputNumber').value.trim();
    const customer = document.getElementById('vchInputCustomer').value.trim();
    const gstin = document.getElementById('vchInputGstin').value.trim().toUpperCase();
    const taxable = parseFloat(document.getElementById('vchInputTaxable').value || 0);
    const rate = parseFloat(document.getElementById('vchInputRate').value || 5);
    const isInterstate = document.getElementById('vchInputInterstate').checked;

    if (!voucherNumber || !customer || isNaN(taxable) || taxable <= 0) {
      this.showToast('Please fill all required voucher fields with valid values', 'error');
      return;
    }

    const totalTax = +(taxable * (rate / 100)).toFixed(2);
    let cgst = 0, sgst = 0, igst = 0;

    if (isInterstate) {
      igst = totalTax;
    } else {
      cgst = +(totalTax / 2).toFixed(2);
      sgst = +(totalTax - cgst).toFixed(2);
    }

    const invoiceTotal = +(taxable + totalTax).toFixed(2);

    const voucherData = {
      date,
      voucher_number: voucherNumber,
      customer_name: customer,
      gstin: gstin,
      taxable_value: taxable,
      gst_rate: rate,
      interstate: isInterstate,
      cgst,
      sgst,
      igst,
      total_gst: totalTax,
      invoice_total: invoiceTotal
    };

    if (editId) {
      this.store.updateVoucher(editId, voucherData);
      this.showToast(`Updated voucher ${voucherNumber}`, 'success');
    } else {
      voucherData.id = `vch_${Date.now()}`;
      this.store.addVoucher(voucherData);
      this.showToast(`Created voucher ${voucherNumber}`, 'success');
    }

    document.getElementById('voucherModal').classList.remove('open');
    if (this.store.currentView === 'dashboard') {
      this.renderDashboard();
    } else if (this.store.currentView === 'vouchers') {
      this.renderVouchersTable();
    }
  }

  deleteVoucher(id) {
    const v = this.store.vouchers.find(item => item.id === id);
    if (!v) return;

    if (confirm(`Are you sure you want to delete voucher ${v.voucher_number}?`)) {
      this.store.deleteVoucher(id);
      this.selectedVoucherIds.delete(id);
      this.showToast(`Deleted voucher ${v.voucher_number}`, 'success');
      this.renderVouchersTable();
      this.renderDashboard();
    }
  }

  viewVoucher(id) {
    const v = this.store.vouchers.find(item => item.id === id);
    if (!v) return;

    const modal = document.getElementById('viewInvoiceModal');
    if (!modal) return;

    document.getElementById('viewInvNumber').textContent = v.voucher_number;
    document.getElementById('viewInvDate').textContent = Format.date(v.date);
    document.getElementById('viewInvCustomer').textContent = v.customer_name;
    document.getElementById('viewInvGstin').textContent = v.gstin || 'Unregistered';
    document.getElementById('viewInvTaxable').textContent = `₹ ${Format.currency(v.taxable_value)}`;
    document.getElementById('viewInvRate').textContent = `${v.gst_rate}%`;

    const taxDetails = document.getElementById('viewInvTaxDetails');
    if (v.interstate) {
      taxDetails.innerHTML = `<div class="calc-row"><span>IGST (${v.gst_rate}%):</span><span class="font-mono-data font-bold">₹ ${Format.currency(v.igst)}</span></div>`;
    } else {
      taxDetails.innerHTML = `
        <div class="calc-row"><span>CGST (${v.gst_rate / 2}%):</span><span class="font-mono-data font-bold">₹ ${Format.currency(v.cgst)}</span></div>
        <div class="calc-row"><span>SGST (${v.gst_rate / 2}%):</span><span class="font-mono-data font-bold">₹ ${Format.currency(v.sgst)}</span></div>
      `;
    }

    document.getElementById('viewInvTotal').textContent = `₹ ${Format.currency(v.invoice_total)}`;
    modal.classList.add('open');
  }

  // ==========================================
  // EXCEL IMPORT WORKFLOW
  // ==========================================
  initExcelImportEvents() {
    const dropzone = document.getElementById('excelDropzone');
    const fileInput = document.getElementById('excelFileInput');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragging');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragging');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragging');
        const file = e.dataTransfer.files?.[0];
        if (file) this.processExcelUpload(file);
      });

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (file) this.processExcelUpload(file);
      });
    }

    document.getElementById('downloadExcelTemplateBtn')?.addEventListener('click', () => {
      ExcelHandler.generateTemplate();
      this.showToast('Downloaded voucher_template.xlsx', 'success');
    });
  }

  async processExcelUpload(file) {
    const statusBox = document.getElementById('excelImportStatus');
    const previewContainer = document.getElementById('excelPreviewContainer');
    if (!statusBox || !previewContainer) return;

    statusBox.style.display = 'block';
    statusBox.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="badge badge-rate">Parsing</span>
        <span>Reading <strong>${file.name}</strong>...</span>
      </div>
    `;

    try {
      const result = await ExcelHandler.parseExcelFile(file);
      this.store.pendingExcelImport = result;

      let errorHtml = '';
      if (result.errorCount > 0) {
        errorHtml = `
          <div style="margin-top: 12px; padding: 12px; background: #fff1f2; border: 1px solid #fecdd3; border-radius: 8px;">
            <div style="font-weight: 700; color: #9f1239; font-size: 13px; margin-bottom: 6px;">Found ${result.errorCount} row warning(s):</div>
            <ul style="padding-left: 18px; font-size: 12px; color: #be123c;">
              ${result.errors.slice(0, 5).map(e => `<li>Row ${e.rowNumber}: ${e.errors.join(', ')}</li>`).join('')}
            </ul>
          </div>
        `;
      }

      statusBox.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div>
            <span class="badge badge-success">Parsed Successfully</span>
            <span style="font-size: 14px; font-weight: 700; margin-left: 8px;">${result.validCount} valid voucher records ready</span>
          </div>
          <button id="commitExcelImportBtn" class="btn btn-success btn-sm font-bold">Import ${result.validCount} Vouchers</button>
        </div>
        ${errorHtml}
      `;

      document.getElementById('commitExcelImportBtn')?.addEventListener('click', () => {
        this.commitPendingImport();
      });

      previewContainer.style.display = 'block';
      const previewTbody = document.getElementById('excelPreviewTableBody');
      if (previewTbody) {
        previewTbody.innerHTML = result.validVouchers.slice(0, 10).map(v => `
          <tr>
            <td class="font-mono-data">${v.date}</td>
            <td class="font-mono-data font-bold">${v.voucher_number}</td>
            <td>${v.customer_name}</td>
            <td class="font-mono-data text-xs">${v.gstin || '-'}</td>
            <td>${v.interstate ? 'Inter-State' : 'Intra-State'}</td>
            <td>${v.gst_rate}%</td>
            <td class="font-mono-data text-right font-bold">₹ ${Format.currency(v.invoice_total)}</td>
          </tr>
        `).join('');
      }

      this.showToast(`Analyzed ${result.validCount} vouchers from ${file.name}`, 'success');
    } catch (err) {
      statusBox.innerHTML = `
        <div style="color: #e11d48; font-weight: 700;">
          Error parsing file: ${err.message}
        </div>
      `;
      this.showToast(err.message, 'error');
    }
  }

  commitPendingImport() {
    const pending = this.store.pendingExcelImport;
    if (!pending || !pending.validVouchers || pending.validVouchers.length === 0) {
      this.showToast('No valid vouchers to import', 'error');
      return;
    }

    const count = pending.validVouchers.length;
    const merged = [...pending.validVouchers, ...this.store.vouchers];
    this.store.saveVouchers(merged);
    this.store.pendingExcelImport = null;

    this.showToast(`Successfully imported ${count} vouchers into ledger!`, 'success');
    this.resetExcelImportUI();
    window.location.hash = '#vouchers';
  }

  resetExcelImportUI() {
    const statusBox = document.getElementById('excelImportStatus');
    const previewContainer = document.getElementById('excelPreviewContainer');
    const fileInput = document.getElementById('excelFileInput');
    if (statusBox) statusBox.style.display = 'none';
    if (previewContainer) previewContainer.style.display = 'none';
    if (fileInput) fileInput.value = '';
  }

  // ==========================================
  // BATCH BILL EXTRACT (1-CLICK MULTI-FILE AI OCR)
  // ==========================================
  initBatchBillExtractEvents() {
    const dropzone = document.getElementById('batchBillDropzone');
    const fileInput = document.getElementById('batchBillFileInput');

    if (dropzone && fileInput) {
      dropzone.addEventListener('click', () => fileInput.click());

      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragging');
      });

      dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragging');
      });

      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragging');
        const files = Array.from(e.dataTransfer.files || []);
        if (files.length > 0) this.handleBatchFilesUpload(files);
      });

      fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) this.handleBatchFilesUpload(files);
      });
    }

    document.getElementById('loadSamplePackBtn')?.addEventListener('click', () => {
      this.loadSamplePack();
    });

    document.getElementById('clearBatchBtn')?.addEventListener('click', () => {
      this.clearBatchQueue();
    });

    document.getElementById('commitAllBatchBtn')?.addEventListener('click', () => {
      this.commitAllExtractedBills();
    });

    this.initInspectorModalEvents();
  }

  renderBatchBillExtractView() {
    if (this.store.batchExtractedBills.length === 0) {
      document.getElementById('batchResultsCard').style.display = 'none';
      document.getElementById('batchActionBar').style.display = 'none';
      document.getElementById('clearBatchBtn').style.display = 'none';
    } else {
      this.renderBatchResultsTable();
    }
  }

  loadSamplePack() {
    this.store.batchExtractedBills = JSON.parse(JSON.stringify(BillParser.SAMPLE_INVOICES));
    this.renderBatchResultsTable();
    this.showToast(`Loaded ${this.store.batchExtractedBills.length} sample invoices (CR-70 to CR-74) into queue!`, 'success');
  }

  clearBatchQueue() {
    this.store.batchExtractedBills = [];
    document.getElementById('batchResultsCard').style.display = 'none';
    document.getElementById('batchActionBar').style.display = 'none';
    document.getElementById('clearBatchBtn').style.display = 'none';
    this.showToast('Cleared extraction queue', 'info');
  }

  async handleBatchFilesUpload(files) {
    const progressContainer = document.getElementById('batchProgressBarContainer');
    const progressBar = document.getElementById('batchProgressBar');
    const progressStatus = document.getElementById('batchProgressStatus');
    const progressPercent = document.getElementById('batchProgressPercent');

    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';

    this.showToast(`Extracting ${files.length} bills with AI OCR...`, 'info');

    const extractedResults = await BillParser.processBatchFiles(files, (progress) => {
      progressBar.style.width = `${progress.percent}%`;
      progressPercent.textContent = `${progress.percent}%`;
      progressStatus.textContent = `Extracting bill ${progress.currentIndex} of ${progress.total}: "${progress.currentFileName}"...`;
    });

    setTimeout(() => {
      progressContainer.style.display = 'none';
      this.store.batchExtractedBills = [...this.store.batchExtractedBills, ...extractedResults];
      this.renderBatchResultsTable();
      this.showToast(`Successfully extracted ${files.length} bills in 1 click!`, 'success');
    }, 400);
  }

  renderBatchResultsTable() {
    const tableBody = document.getElementById('batchResultsTableBody');
    const resultsCard = document.getElementById('batchResultsCard');
    const actionBar = document.getElementById('batchActionBar');
    const clearBtn = document.getElementById('clearBatchBtn');

    if (!tableBody || !resultsCard || !actionBar) return;

    const list = this.store.batchExtractedBills;
    if (list.length === 0) {
      resultsCard.style.display = 'none';
      actionBar.style.display = 'none';
      if (clearBtn) clearBtn.style.display = 'none';
      return;
    }

    resultsCard.style.display = 'block';
    actionBar.style.display = 'flex';
    if (clearBtn) clearBtn.style.display = 'inline-flex';

    const totalVolume = list.reduce((acc, b) => acc + (b.invoiceTotal || 0), 0);
    document.getElementById('batchCountBadge').textContent = `${list.length} Bills Extracted`;
    document.getElementById('batchSummaryTitle').textContent = `Ready to import ${list.length} bills into live ledger`;
    document.getElementById('batchSummarySub').textContent = `Total Invoiced Turnover: ₹ ${Format.currency(totalVolume)}`;

    tableBody.innerHTML = list.map((b, idx) => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 28px; height: 28px; border-radius: 6px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700;">
              ${(b.fileName || 'PDF').toLowerCase().endsWith('.pdf') ? 'PDF' : 'IMG'}
            </div>
            <div>
              <div class="font-bold text-slate-900" style="font-size: 12px; max-width: 170px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${b.fileName || b.title}</div>
              <div class="text-xs text-slate-500">${b.fileSize || 'Standard Bill'}</div>
            </div>
          </div>
        </td>
        <td class="font-mono-data">${b.date}</td>
        <td class="font-mono-data font-bold text-blue-700">${b.invoiceNumber}</td>
        <td>
          <div class="font-bold text-slate-900">${b.buyer}</div>
        </td>
        <td class="font-mono-data text-xs font-bold text-slate-900">${b.buyerGstin || 'Unregistered'}</td>
        <td><span class="badge ${b.isInterstate ? 'badge-interstate' : 'badge-intrastate'}">${b.isInterstate ? 'IGST' : 'CGST+SGST'}</span></td>
        <td><span class="badge badge-rate">${b.gstRate}%</span></td>
        <td class="font-mono-data text-right">₹ ${Format.currency(b.taxableValue)}</td>
        <td class="font-mono-data text-right font-bold text-slate-900">₹ ${Format.currency(b.invoiceTotal)}</td>
        <td>
          <span class="confidence-badge confidence-high">${b.confidence || 98.5}%</span>
        </td>
        <td class="text-right">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm font-bold" onclick="app.inspectBill('${b.id}')" title="Inspect Document & OCR Bounding Boxes">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              <span>Inspect</span>
            </button>
            <button class="btn btn-outline btn-sm btn-icon-only text-rose-600" onclick="app.removeBatchBill('${b.id}')" title="Remove from queue">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // ==========================================
  // DOCUMENT INSPECTOR & FIGURE EXTRACTOR ENGINE
  // ==========================================
  inspectVoucher(voucherId) {
    const v = this.store.vouchers.find(item => item.id === voucherId);
    if (!v) return;

    // Convert voucher into standard inspector bill object
    const virtualBill = {
      id: v.id,
      fileName: `Voucher_${v.voucher_number}.pdf`,
      fileType: 'application/pdf',
      fileSize: '128 KB (Ledger Record)',
      title: v.customer_name,
      invoiceNumber: v.voucher_number,
      date: v.date,
      buyer: v.customer_name,
      buyerGstin: v.gstin || '27ACWFS1289P1Z3',
      supplier: 'S. I. & Co.',
      supplierGstin: '27AABCA1234F1Z8',
      taxableValue: v.taxable_value,
      gstRate: v.gst_rate || 5,
      isInterstate: Boolean(v.interstate),
      cgst: v.cgst || 0,
      sgst: v.sgst || 0,
      igst: v.igst || 0,
      totalGst: v.total_gst || (v.cgst + v.sgst + v.igst),
      invoiceTotal: v.invoice_total,
      confidence: 99.8,
      status: 'confirmed',
      numPages: 1,
      rawText: `TAX INVOICE\nInvoice No: ${v.voucher_number}\nDate: ${v.date}\nCustomer: ${v.customer_name}\nGSTIN: ${v.gstin || 'Unregistered'}\nTaxable Base: ${v.taxable_value}\nGST Rate: ${v.gst_rate}%\nTotal: ${v.invoice_total}`,
      boxes: [
        { field: `Invoice No: ${v.voucher_number}`, type: 'invoice_number', value: v.voucher_number, x: 62, y: 11, w: 32, h: 4.5 },
        { field: `Date: ${v.date}`, type: 'date', value: v.date, x: 62, y: 17, w: 28, h: 4.5 },
        { field: `Customer: ${v.customer_name.slice(0, 24)}`, type: 'customer', value: v.customer_name, x: 5, y: 26, w: 48, h: 4.5 },
        { field: `GSTIN: ${v.gstin || 'Unregistered'}`, type: 'gstin', value: v.gstin || '', x: 5, y: 32, w: 38, h: 4.5 },
        { field: `Taxable Base: ₹ ${v.taxable_value}`, type: 'taxable', value: v.taxable_value, x: 55, y: 65, w: 42, h: 4.5 },
        { field: `Total: ₹ ${v.invoice_total}`, type: 'total', value: v.invoice_total, x: 55, y: 80, w: 42, h: 5.5 }
      ],
      detectedFigures: {
        allAmounts: [
          { value: v.taxable_value, formatted: Format.currency(v.taxable_value), raw: String(v.taxable_value), context: `Taxable Base: ${v.taxable_value}` },
          { value: v.invoice_total, formatted: Format.currency(v.invoice_total), raw: String(v.invoice_total), context: `Invoice Total: ${v.invoice_total}` }
        ],
        allInvoiceNumbers: [{ value: v.voucher_number, raw: v.voucher_number }],
        allDates: [{ value: v.date, raw: v.date }],
        allGstins: v.gstin ? [{ value: v.gstin, isMaharashtra: v.gstin.startsWith('27') }] : [],
        allParties: [{ value: v.customer_name, raw: v.customer_name }]
      },
      isVoucherLedgerRecord: true
    };

    this.openInspectorWithBill(virtualBill);
  }

  inspectBill(billId) {
    const bill = this.store.batchExtractedBills.find(b => b.id === billId);
    if (!bill) return;
    this.openInspectorWithBill(bill);
  }

  async openInspectorWithBill(bill) {
    this.store.activeInspectedBill = bill;
    this.inspectorState.bill = bill;
    this.inspectorState.currentPage = 1;
    this.inspectorState.totalPages = bill.numPages || 1;
    this.inspectorState.scale = 1.4;
    this.inspectorState.activeTargetField = null;
    this.inspectorState.selectedBox = null;
    this.inspectorState.selectedText = '';
    this.inspectorState.activeTab = 'fields';

    const modal = document.getElementById('billInspectorModal');
    if (!modal) return;

    // Header metadata
    document.getElementById('inspectorModalTitle').textContent = `Document Inspector: ${bill.fileName || bill.title}`;
    document.getElementById('inspectorFileMeta').textContent = `${bill.fileSize || 'Standard Document'} • ${bill.isPdf ? 'Multi-page Vector PDF' : 'High-Res OCR Image'}`;
    document.getElementById('inspectorConfidenceBadge').textContent = `${bill.confidence || 98.5}% AI Confidence`;

    // Populate Form Inputs
    document.getElementById('inspBillId').value = bill.id;
    document.getElementById('inspVoucherNumber').value = bill.invoiceNumber || '';
    document.getElementById('inspDate').value = bill.date || new Date().toISOString().slice(0, 10);
    document.getElementById('inspCustomer').value = bill.buyer || '';
    document.getElementById('inspGstin').value = bill.buyerGstin || '';
    document.getElementById('inspTaxable').value = bill.taxableValue || '';
    document.getElementById('inspRate').value = String(bill.gstRate !== undefined ? bill.gstRate : 5);
    document.getElementById('inspInterstate').checked = Boolean(bill.isInterstate);

    // Cancel any active pick mode
    this.cancelPickTarget();
    this.closeAssignPopover();

    // Calculate tax summary
    this.updateInspectorTaxSummary();

    // Render Canvas & OCR overlay
    await this.renderCurrentInspectorCanvas();

    // Populate Tab 2: Detected Figures Stream
    this.renderInspectorFiguresList();

    // Populate Tab 3: Raw OCR Text
    const rawViewer = document.getElementById('inspRawTextViewer');
    if (rawViewer) {
      rawViewer.textContent = bill.rawText || `Invoice No: ${bill.invoiceNumber}\nDate: ${bill.date}\nCustomer: ${bill.buyer}\nGSTIN: ${bill.buyerGstin}\nTaxable: ${bill.taxableValue}\nTotal: ${bill.invoiceTotal}`;
    }

    // Switch to first tab
    this.switchInspectorTab('fields');

    modal.classList.add('open');
  }

  async renderCurrentInspectorCanvas() {
    const bill = this.inspectorState.bill;
    if (!bill) return;

    const canvas = document.getElementById('inspectorCanvas');
    const overlay = document.getElementById('inspectorOcrOverlay');
    if (!canvas || !overlay) return;

    // Render document to canvas with active page and scale
    const renderRes = await BillParser.renderDocumentToCanvas(
      bill,
      canvas,
      this.inspectorState.currentPage,
      this.inspectorState.scale
    );

    if (renderRes && renderRes.numPages) {
      this.inspectorState.totalPages = renderRes.numPages;
    }

    // Update Toolbar Page Controls & Zoom Text
    const pageIndicator = document.getElementById('inspPageIndicator');
    if (pageIndicator) {
      pageIndicator.textContent = `Page ${this.inspectorState.currentPage} of ${this.inspectorState.totalPages}`;
    }

    const zoomText = document.getElementById('inspZoomLevel');
    if (zoomText) {
      zoomText.textContent = `${Math.round(this.inspectorState.scale * 100)}%`;
    }

    // Sync overlay size with canvas
    overlay.style.width = `${canvas.width}px`;
    overlay.style.height = `${canvas.height}px`;

    // Render Interactive OCR Bounding Boxes
    const boxes = (bill.boxes || []).filter(b => !b.page || b.page === this.inspectorState.currentPage);

    if (boxes.length === 0) {
      overlay.innerHTML = '';
      return;
    }

    overlay.innerHTML = boxes.map((box, idx) => `
      <div class="ocr-highlight" 
           data-box-index="${idx}"
           data-box-field="${box.field || ''}"
           data-box-type="${box.type || 'text'}"
           data-box-value="${box.value !== undefined ? box.value : (box.field || '')}"
           style="left: ${box.x}%; top: ${box.y}%; width: ${box.w}%; height: ${box.h}%;">
        <span class="ocr-highlight-tag">${box.field}</span>
      </div>
    `).join('');

    // Attach click listeners to bounding boxes
    overlay.querySelectorAll('.ocr-highlight').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const boxIdx = parseInt(el.getAttribute('data-box-index'), 10);
        const box = boxes[boxIdx];
        if (box) this.handleBoxClick(box, el, e);
      });
    });
  }

  handleBoxClick(box, element, event) {
    const rawVal = box.value !== undefined ? box.value : box.field;

    // If Target Pick Mode is active, immediately populate the targeted field!
    if (this.inspectorState.activeTargetField) {
      this.assignValueToField(this.inspectorState.activeTargetField, rawVal, box);
      this.cancelPickTarget();
      return;
    }

    // Otherwise, show quick assignment floating popover
    this.showAssignPopover(box, element);
  }

  showAssignPopover(box, element) {
    const popover = document.getElementById('inspectorAssignMenu');
    if (!popover || !element) return;

    this.inspectorState.selectedBox = box;
    const rawVal = box.value !== undefined ? box.value : box.field;
    this.inspectorState.selectedText = String(rawVal);

    document.getElementById('popoverSelectedText').textContent = String(rawVal);

    // Position popover relative to the clicked box
    const elemRect = element.getBoundingClientRect();
    const viewportRect = document.getElementById('inspectorViewport').getBoundingClientRect();

    let topPos = elemRect.top - viewportRect.top + elemRect.height + 6;
    let leftPos = elemRect.left - viewportRect.left;

    // Boundary containment
    if (leftPos + 240 > viewportRect.width) {
      leftPos = Math.max(10, viewportRect.width - 250);
    }
    if (topPos + 260 > viewportRect.height) {
      topPos = Math.max(10, elemRect.top - viewportRect.top - 260);
    }

    popover.style.top = `${topPos}px`;
    popover.style.left = `${leftPos}px`;
    popover.style.display = 'block';
  }

  closeAssignPopover() {
    const popover = document.getElementById('inspectorAssignMenu');
    if (popover) popover.style.display = 'none';
  }

  setPickTarget(fieldId, fieldLabel) {
    this.inspectorState.activeTargetField = fieldId;
    
    // Highlight button
    document.querySelectorAll('.btn-pick').forEach(btn => {
      if (btn.getAttribute('data-pick-target') === fieldId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Show Pick Banner
    const banner = document.getElementById('inspActiveTargetBanner');
    const labelEl = document.getElementById('inspActiveTargetFieldName');
    if (banner && labelEl) {
      labelEl.textContent = fieldLabel;
      banner.style.display = 'flex';
    }

    // Highlight overlay
    const overlay = document.getElementById('inspectorOcrOverlay');
    if (overlay) overlay.classList.add('target-active');

    this.showToast(`Click any figure or text on the document to assign to "${fieldLabel}"`, 'info');
  }

  cancelPickTarget() {
    this.inspectorState.activeTargetField = null;
    document.querySelectorAll('.btn-pick').forEach(btn => btn.classList.remove('active'));
    const banner = document.getElementById('inspActiveTargetBanner');
    if (banner) banner.style.display = 'none';
    const overlay = document.getElementById('inspectorOcrOverlay');
    if (overlay) overlay.classList.remove('target-active');
  }

  assignValueToField(fieldId, value, boxContext = null) {
    const el = document.getElementById(fieldId);
    if (!el) return;

    let cleanVal = String(value).trim();

    if (fieldId === 'inspTaxable') {
      // Extract numeric figure
      const numMatch = cleanVal.match(/[\d,]+\.?\d*/);
      const parsedNum = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : parseFloat(cleanVal);
      if (!isNaN(parsedNum)) {
        el.value = parsedNum.toFixed(2);
        this.updateInspectorTaxSummary();
        this.showToast(`Set Taxable Base to ₹ ${Format.currency(parsedNum)}`, 'success');
      }
    } else if (fieldId === 'inspDate') {
      // Parse date to YYYY-MM-DD
      const dateMatch = cleanVal.match(/(\d{1,2})[-\/\.](\d{1,2})[-\/\.](\d{4})/);
      if (dateMatch) {
        const d = dateMatch[1].padStart(2, '0');
        const m = dateMatch[2].padStart(2, '0');
        const y = dateMatch[3];
        el.value = `${y}-${m}-${d}`;
      } else {
        el.value = cleanVal;
      }
      this.showToast(`Set Invoice Date to ${el.value}`, 'success');
    } else if (fieldId === 'inspVoucherNumber') {
      const cleanNum = cleanVal.replace(/^(invoice\s*no|bill\s*no|voucher\s*no|#)[:\-\s]*/i, '').trim();
      el.value = cleanNum.toUpperCase();
      this.showToast(`Set Invoice Number to "${el.value}"`, 'success');
    } else if (fieldId === 'inspCustomer') {
      const cleanName = cleanVal.replace(/^(billed\s*to|buyer|customer|party\s*name)[:\-\s]*/i, '').trim();
      el.value = cleanName;
      
      // If customer matches a known client, auto-fill GSTIN if empty
      const matchClient = this.store.getClientByName(cleanName);
      if (matchClient && matchClient.gstin && matchClient.gstin !== 'Unregistered') {
        const gstinEl = document.getElementById('inspGstin');
        if (gstinEl && !gstinEl.value) {
          gstinEl.value = matchClient.gstin;
          const isInter = !matchClient.gstin.startsWith('27');
          document.getElementById('inspInterstate').checked = isInter;
          this.updateInspectorTaxSummary();
        }
      }
      this.showToast(`Set Buyer to "${cleanName}"`, 'success');
    } else if (fieldId === 'inspGstin') {
      const gstinMatch = cleanVal.match(/[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/i);
      el.value = gstinMatch ? gstinMatch[0].toUpperCase() : cleanVal.toUpperCase();
      
      // Auto-lookup matching customer from client master directory
      const matchClient = this.store.getClientByGstin(el.value);
      if (matchClient && matchClient.name) {
        const custEl = document.getElementById('inspCustomer');
        if (custEl) {
          custEl.value = matchClient.name;
          this.showToast(`Auto-populated Customer "${matchClient.name}" from GSTIN!`, 'success');
        }
      }

      // Check interstate state code
      if (el.value.length >= 2) {
        const isInter = !el.value.startsWith('27');
        document.getElementById('inspInterstate').checked = isInter;
        this.updateInspectorTaxSummary();
      }
      this.showToast(`Set Buyer GSTIN to ${el.value}`, 'success');
    } else {
      el.value = cleanVal;
      this.showToast(`Assigned value "${cleanVal}"`, 'success');
    }

    // Pulse effect on target input
    el.style.boxShadow = '0 0 0 3px #38bdf8';
    setTimeout(() => { el.style.boxShadow = ''; }, 600);
  }

  applyAssignment(assignType) {
    const textVal = this.inspectorState.selectedText;
    const box = this.inspectorState.selectedBox;
    if (!textVal) return;

    switch (assignType) {
      case 'taxable':
        this.assignValueToField('inspTaxable', textVal, box);
        break;
      case 'total':
        // If user selects Total, calculate taxable base based on current rate
        const numMatch = String(textVal).match(/[\d,]+\.?\d*/);
        const parsedTotal = numMatch ? parseFloat(numMatch[0].replace(/,/g, '')) : parseFloat(textVal);
        if (!isNaN(parsedTotal)) {
          const rate = parseFloat(document.getElementById('inspRate')?.value || 5);
          const deducedTaxable = +(parsedTotal / (1 + rate / 100)).toFixed(2);
          document.getElementById('inspTaxable').value = deducedTaxable;
          this.updateInspectorTaxSummary();
          this.showToast(`Set Total to ₹ ${Format.currency(parsedTotal)} (Calculated Taxable: ₹ ${Format.currency(deducedTaxable)})`, 'success');
        }
        break;
      case 'invoice_number':
        this.assignValueToField('inspVoucherNumber', textVal, box);
        break;
      case 'customer':
        this.assignValueToField('inspCustomer', textVal, box);
        break;
      case 'gstin':
        this.assignValueToField('inspGstin', textVal, box);
        break;
      case 'date':
        this.assignValueToField('inspDate', textVal, box);
        break;
      case 'copy':
        navigator.clipboard.writeText(String(textVal)).then(() => {
          this.showToast(`Copied "${textVal}" to clipboard`, 'info');
        });
        break;
    }

    this.closeAssignPopover();
  }

  renderInspectorFiguresList(filterQuery = '') {
    const container = document.getElementById('inspFiguresListContainer');
    const bill = this.inspectorState.bill;
    if (!container || !bill) return;

    const query = filterQuery.toLowerCase().trim();
    const detected = bill.detectedFigures || {};

    let amounts = detected.allAmounts || [];
    let invoiceNums = detected.allInvoiceNumbers || [];
    let dates = detected.allDates || [];
    let gstins = detected.allGstins || [];
    let parties = detected.allParties || [];

    if (query) {
      amounts = amounts.filter(a => String(a.value).includes(query) || a.context.toLowerCase().includes(query));
      invoiceNums = invoiceNums.filter(n => n.value.toLowerCase().includes(query));
      dates = dates.filter(d => d.value.toLowerCase().includes(query));
      gstins = gstins.filter(g => g.value.toLowerCase().includes(query));
      parties = parties.filter(p => p.value.toLowerCase().includes(query));
    }

    const totalCount = amounts.length + invoiceNums.length + dates.length + gstins.length + parties.length;
    const countLabel = document.getElementById('tabFiguresCountLabel');
    if (countLabel) countLabel.textContent = `All Figures (${totalCount})`;

    let html = '';

    // 1. Amounts & Figures
    if (amounts.length > 0) {
      html += `
        <div>
          <div class="figure-section-title">
            <span>💰 Amounts & Monetary Figures (${amounts.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${amounts.map(a => `
              <div class="figure-item-card">
                <div style="min-width: 0;">
                  <div class="figure-item-value">₹ ${a.formatted || Format.currency(a.value)}</div>
                  <div class="figure-item-context" title="${a.context || ''}">${a.context || 'Found in document body'}</div>
                </div>
                <div class="figure-item-actions">
                  <button type="button" class="figure-pill figure-pill-taxable" onclick="app.assignValueToField('inspTaxable', ${a.value})">Set Taxable</button>
                  <button type="button" class="figure-pill figure-pill-total" onclick="app.applyAssignmentValue('total', ${a.value})">Set Total</button>
                  <button type="button" class="figure-pill" onclick="app.copyToClipboard('${a.value}')">Copy</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 2. Invoice Numbers
    if (invoiceNums.length > 0) {
      html += `
        <div style="margin-top: 14px;">
          <div class="figure-section-title">
            <span>🧾 Invoice / Voucher # (${invoiceNums.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${invoiceNums.map(n => `
              <div class="figure-item-card">
                <div class="figure-item-value">${n.value}</div>
                <div class="figure-item-actions">
                  <button type="button" class="figure-pill" style="background: #e0f2fe; color: #0284c7;" onclick="app.assignValueToField('inspVoucherNumber', '${n.value}')">Set as Inv #</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 3. Dates
    if (dates.length > 0) {
      html += `
        <div style="margin-top: 14px;">
          <div class="figure-section-title">
            <span>📅 Dates (${dates.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${dates.map(d => `
              <div class="figure-item-card">
                <div class="figure-item-value">${d.value}</div>
                <div class="figure-item-actions">
                  <button type="button" class="figure-pill" style="background: #fef3c7; color: #d97706;" onclick="app.assignValueToField('inspDate', '${d.value}')">Set Date</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 4. GSTINs
    if (gstins.length > 0) {
      html += `
        <div style="margin-top: 14px;">
          <div class="figure-section-title">
            <span>🏢 GSTIN Entities (${gstins.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${gstins.map(g => `
              <div class="figure-item-card">
                <div>
                  <div class="figure-item-value">${g.value}</div>
                  <div class="text-xs text-slate-500">${g.isMaharashtra ? 'State 27 (Maharashtra - Intra-State)' : 'Inter-State Entity'}</div>
                </div>
                <div class="figure-item-actions">
                  <button type="button" class="figure-pill" style="background: #e0e7ff; color: #4338ca;" onclick="app.assignValueToField('inspGstin', '${g.value}')">Set GSTIN</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 5. Parties
    if (parties.length > 0) {
      html += `
        <div style="margin-top: 14px;">
          <div class="figure-section-title">
            <span>👤 Buyer / Customer (${parties.length})</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${parties.map(p => `
              <div class="figure-item-card">
                <div class="figure-item-value" style="font-size: 12px; font-family: var(--font-sans);">${p.value}</div>
                <div class="figure-item-actions">
                  <button type="button" class="figure-pill" style="background: #f1f5f9; color: #0f172a;" onclick="app.assignValueToField('inspCustomer', '${p.value.replace(/'/g, "\\'")}')">Set Buyer</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (!html) {
      html = `<div style="text-align: center; padding: 24px; color: #94a3b8; font-size: 13px;">No matching figures found for "${filterQuery}"</div>`;
    }

    container.innerHTML = html;
  }

  applyAssignmentValue(type, val) {
    this.inspectorState.selectedText = String(val);
    this.applyAssignment(type);
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(String(text)).then(() => {
      this.showToast(`Copied "${text}" to clipboard`, 'info');
    });
  }

  switchInspectorTab(tabName) {
    this.inspectorState.activeTab = tabName;

    // Tabs navigation buttons
    const tabBtns = {
      fields: document.getElementById('tabBtnFields'),
      figures: document.getElementById('tabBtnFigures'),
      rawText: document.getElementById('tabBtnRawText')
    };

    // Tab content panels
    const tabPanels = {
      fields: document.getElementById('inspTabFields'),
      figures: document.getElementById('inspTabFigures'),
      rawText: document.getElementById('inspTabRawText')
    };

    Object.keys(tabBtns).forEach(k => {
      if (tabBtns[k]) {
        if (k === tabName) tabBtns[k].classList.add('active');
        else tabBtns[k].classList.remove('active');
      }
      if (tabPanels[k]) {
        if (k === tabName) tabPanels[k].style.display = 'block';
        else tabPanels[k].style.display = 'none';
      }
    });

    if (tabName === 'figures') {
      this.renderInspectorFiguresList();
    }
  }

  autoReconcileInspector() {
    const bill = this.inspectorState.bill;
    if (!bill) return;

    const taxable = parseFloat(document.getElementById('inspTaxable')?.value || 0);
    const rate = parseFloat(document.getElementById('inspRate')?.value || 5);
    const detected = bill.detectedFigures || {};
    const amounts = (detected.allAmounts || []).map(a => a.value);

    // Look for matching pairs in all detected figures
    let bestTaxable = taxable;
    let bestRate = rate;
    let bestTotal = +(taxable * (1 + rate / 100)).toFixed(2);
    let matched = false;

    if (amounts.length >= 2) {
      for (const tCand of amounts) {
        for (const totCand of amounts) {
          if (totCand > tCand) {
            for (const rTest of [0, 5, 12, 18, 28]) {
              const testCalc = +(tCand * (1 + rTest / 100)).toFixed(2);
              if (Math.abs(testCalc - totCand) <= 1.5) {
                bestTaxable = tCand;
                bestRate = rTest;
                bestTotal = totCand;
                matched = true;
                break;
              }
            }
          }
          if (matched) break;
        }
        if (matched) break;
      }
    }

    document.getElementById('inspTaxable').value = bestTaxable;
    document.getElementById('inspRate').value = String(bestRate);
    this.updateInspectorTaxSummary();

    this.showToast(`Reconciled: Taxable ₹ ${Format.currency(bestTaxable)} @ ${bestRate}% GST = Total ₹ ${Format.currency(bestTotal)}`, 'success');
  }

  importDirectFromInspector() {
    const id = document.getElementById('inspBillId').value;
    const taxable = parseFloat(document.getElementById('inspTaxable').value || 0);
    const rate = parseFloat(document.getElementById('inspRate').value || 5);
    const isInterstate = document.getElementById('inspInterstate').checked;
    const voucherNumber = document.getElementById('inspVoucherNumber').value.trim();
    const customer = document.getElementById('inspCustomer').value.trim();
    const gstin = document.getElementById('inspGstin').value.trim().toUpperCase();
    const date = document.getElementById('inspDate').value;

    if (!voucherNumber || !customer || isNaN(taxable) || taxable <= 0) {
      this.showToast('Please verify required voucher details before importing', 'error');
      return;
    }

    const totalTax = +(taxable * (rate / 100)).toFixed(2);
    let cgst = 0, sgst = 0, igst = 0;

    if (isInterstate) {
      igst = totalTax;
    } else {
      cgst = +(totalTax / 2).toFixed(2);
      sgst = +(totalTax - cgst).toFixed(2);
    }

    const invoiceTotal = +(taxable + totalTax).toFixed(2);

    const newVoucher = {
      id: `vch_${Date.now()}`,
      date: date,
      voucher_number: voucherNumber,
      customer_name: customer,
      gstin: gstin,
      taxable_value: taxable,
      gst_rate: rate,
      interstate: isInterstate,
      cgst: cgst,
      sgst: sgst,
      igst: igst,
      total_gst: totalTax,
      invoice_total: invoiceTotal,
      source: 'document_inspector'
    };

    // Add to ledger
    this.store.addVoucher(newVoucher);

    // If inspected from batch queue, remove from batch queue
    this.store.batchExtractedBills = this.store.batchExtractedBills.filter(b => b.id !== id);

    document.getElementById('billInspectorModal').classList.remove('open');
    this.renderBatchResultsTable();
    this.showToast(`Imported ${voucherNumber} into Sales Vouchers Ledger!`, 'success');
    window.location.hash = '#vouchers';
  }

  initInspectorModalEvents() {
    // Live tax calculations
    const inputs = ['inspTaxable', 'inspRate', 'inspInterstate'];
    inputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => this.updateInspectorTaxSummary());
        el.addEventListener('change', () => this.updateInspectorTaxSummary());
      }
    });

    // Auto-population of Customer Name from GSTIN in Inspector
    const inspGstinInput = document.getElementById('inspGstin');
    const inspCustInput = document.getElementById('inspCustomer');
    const inspInterstate = document.getElementById('inspInterstate');

    if (inspGstinInput) {
      inspGstinInput.addEventListener('input', () => {
        const rawGstin = inspGstinInput.value.toUpperCase().trim();
        if (rawGstin.length >= 2 && inspInterstate) {
          const isInter = !rawGstin.startsWith('27');
          inspInterstate.checked = isInter;
          this.updateInspectorTaxSummary();
        }
        if (rawGstin.length >= 14) {
          const matchClient = this.store.getClientByGstin(rawGstin);
          if (matchClient && inspCustInput) {
            inspCustInput.value = matchClient.name;
            this.showToast(`Auto-populated customer "${matchClient.name}"`, 'success');
          }
        }
      });
    }

    if (inspCustInput) {
      inspCustInput.addEventListener('input', () => {
        const nameVal = inspCustInput.value.trim();
        if (nameVal.length >= 3) {
          const matchClient = this.store.getClientByName(nameVal);
          if (matchClient && matchClient.gstin && matchClient.gstin !== 'Unregistered') {
            if (inspGstinInput && !inspGstinInput.value) {
              inspGstinInput.value = matchClient.gstin;
              if (inspInterstate) {
                inspInterstate.checked = !matchClient.gstin.startsWith('27');
                this.updateInspectorTaxSummary();
              }
            }
          }
        }
      });
    }

    // Save Extracted Values button
    document.getElementById('saveInspectorChangesBtn')?.addEventListener('click', () => {
      const id = document.getElementById('inspBillId').value;
      const bill = this.store.batchExtractedBills.find(b => b.id === id);
      
      const taxable = parseFloat(document.getElementById('inspTaxable').value || 0);
      const rate = parseFloat(document.getElementById('inspRate').value || 5);
      const isInterstate = document.getElementById('inspInterstate').checked;

      const totalTax = +(taxable * (rate / 100)).toFixed(2);
      let cgst = 0, sgst = 0, igst = 0;

      if (isInterstate) {
        igst = totalTax;
      } else {
        cgst = +(totalTax / 2).toFixed(2);
        sgst = +(totalTax - cgst).toFixed(2);
      }

      if (bill) {
        bill.invoiceNumber = document.getElementById('inspVoucherNumber').value.trim();
        bill.date = document.getElementById('inspDate').value;
        bill.buyer = document.getElementById('inspCustomer').value.trim();
        bill.buyerGstin = document.getElementById('inspGstin').value.trim().toUpperCase();
        bill.taxableValue = taxable;
        bill.gstRate = rate;
        bill.isInterstate = isInterstate;
        bill.cgst = cgst;
        bill.sgst = sgst;
        bill.igst = igst;
        bill.totalGst = totalTax;
        bill.invoiceTotal = +(taxable + totalTax).toFixed(2);
      }

      // If updating a confirmed voucher
      const existingVoucher = this.store.vouchers.find(v => v.id === id);
      if (existingVoucher) {
        existingVoucher.voucher_number = document.getElementById('inspVoucherNumber').value.trim();
        existingVoucher.date = document.getElementById('inspDate').value;
        existingVoucher.customer_name = document.getElementById('inspCustomer').value.trim();
        existingVoucher.gstin = document.getElementById('inspGstin').value.trim().toUpperCase();
        existingVoucher.taxable_value = taxable;
        existingVoucher.gst_rate = rate;
        existingVoucher.interstate = isInterstate;
        existingVoucher.cgst = cgst;
        existingVoucher.sgst = sgst;
        existingVoucher.igst = igst;
        existingVoucher.total_gst = totalTax;
        existingVoucher.invoice_total = +(taxable + totalTax).toFixed(2);
        this.store.saveVouchers(this.store.vouchers);
      }

      document.getElementById('billInspectorModal').classList.remove('open');
      this.renderBatchResultsTable();
      this.renderVouchersTable();
      this.showToast(`Updated extracted invoice data!`, 'success');
    });

    // Direct Import button
    document.getElementById('inspImportDirectBtn')?.addEventListener('click', () => {
      this.importDirectFromInspector();
    });

    // Auto-reconcile button
    document.getElementById('inspAutoReconcileBtn')?.addEventListener('click', () => {
      this.autoReconcileInspector();
    });

    // Target picker buttons next to fields
    document.querySelectorAll('.btn-pick').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-pick-target');
        const label = btn.closest('.form-group')?.querySelector('.form-label')?.textContent?.replace(/[\*:]/g, '').trim() || 'Field';
        if (this.inspectorState.activeTargetField === target) {
          this.cancelPickTarget();
        } else {
          this.setPickTarget(target, label);
        }
      });
    });

    // Cancel Pick button in banner
    document.getElementById('inspCancelPickBtn')?.addEventListener('click', () => {
      this.cancelPickTarget();
    });

    // Popover assignment actions
    document.querySelectorAll('.popover-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const assignType = btn.getAttribute('data-assign');
        if (assignType) this.applyAssignment(assignType);
      });
    });

    document.getElementById('closePopoverBtn')?.addEventListener('click', () => {
      this.closeAssignPopover();
    });

    // Zoom Toolbar Controls
    document.getElementById('inspZoomInBtn')?.addEventListener('click', async () => {
      this.inspectorState.scale = +(this.inspectorState.scale + 0.25).toFixed(2);
      await this.renderCurrentInspectorCanvas();
    });

    document.getElementById('inspZoomOutBtn')?.addEventListener('click', async () => {
      this.inspectorState.scale = Math.max(0.6, +(this.inspectorState.scale - 0.25).toFixed(2));
      await this.renderCurrentInspectorCanvas();
    });

    document.getElementById('inspZoomResetBtn')?.addEventListener('click', async () => {
      this.inspectorState.scale = 1.0;
      await this.renderCurrentInspectorCanvas();
    });

    document.getElementById('inspZoomFitBtn')?.addEventListener('click', async () => {
      const viewport = document.getElementById('inspectorViewport');
      if (viewport) {
        const availableW = viewport.clientWidth - 40;
        this.inspectorState.scale = Math.max(0.8, +(availableW / 800).toFixed(2));
        await this.renderCurrentInspectorCanvas();
      }
    });

    // Page Navigation Controls
    document.getElementById('inspPrevPageBtn')?.addEventListener('click', async () => {
      if (this.inspectorState.currentPage > 1) {
        this.inspectorState.currentPage--;
        await this.renderCurrentInspectorCanvas();
      }
    });

    document.getElementById('inspNextPageBtn')?.addEventListener('click', async () => {
      if (this.inspectorState.currentPage < this.inspectorState.totalPages) {
        this.inspectorState.currentPage++;
        await this.renderCurrentInspectorCanvas();
      }
    });

    // Toggle Overlay Checkbox
    document.getElementById('inspToggleOverlay')?.addEventListener('change', (e) => {
      const overlay = document.getElementById('inspectorOcrOverlay');
      if (overlay) overlay.style.display = e.target.checked ? 'block' : 'none';
    });

    // Figures Search Filter Input
    document.getElementById('inspTokenFilterInput')?.addEventListener('input', (e) => {
      this.renderInspectorFiguresList(e.target.value);
    });

    // Copy Raw OCR Text
    document.getElementById('inspCopyRawTextBtn')?.addEventListener('click', () => {
      const text = document.getElementById('inspRawTextViewer')?.textContent || '';
      this.copyToClipboard(text);
    });
  }

  updateInspectorTaxSummary() {
    const taxable = parseFloat(document.getElementById('inspTaxable')?.value || 0);
    const rate = parseFloat(document.getElementById('inspRate')?.value || 5);
    const isInterstate = document.getElementById('inspInterstate')?.checked;

    const totalTax = +(taxable * (rate / 100)).toFixed(2);
    let cgst = 0, sgst = 0, igst = 0;

    if (isInterstate) {
      igst = totalTax;
    } else {
      cgst = +(totalTax / 2).toFixed(2);
      sgst = +(totalTax - cgst).toFixed(2);
    }

    const total = +(taxable + totalTax).toFixed(2);

    document.getElementById('inspTaxablePreview').textContent = `₹ ${Format.currency(taxable)}`;
    
    const cgstRow = document.getElementById('inspCgstRow');
    const sgstRow = document.getElementById('inspSgstRow');
    const igstRow = document.getElementById('inspIgstRow');

    if (isInterstate) {
      if (cgstRow) cgstRow.style.display = 'none';
      if (sgstRow) sgstRow.style.display = 'none';
      if (igstRow) {
        igstRow.style.display = 'flex';
        document.getElementById('inspIgstPreview').textContent = `₹ ${Format.currency(igst)} (${rate}%)`;
      }
    } else {
      if (cgstRow) {
        cgstRow.style.display = 'flex';
        document.getElementById('inspCgstPreview').textContent = `₹ ${Format.currency(cgst)} (${rate / 2}%)`;
      }
      if (sgstRow) {
        sgstRow.style.display = 'flex';
        document.getElementById('inspSgstPreview').textContent = `₹ ${Format.currency(sgst)} (${rate / 2}%)`;
      }
      if (igstRow) igstRow.style.display = 'none';
    }

    document.getElementById('inspTotalPreview').textContent = `₹ ${Format.currency(total)}`;
  }

  removeBatchBill(billId) {
    this.store.batchExtractedBills = this.store.batchExtractedBills.filter(b => b.id !== billId);
    this.renderBatchResultsTable();
    this.showToast('Removed bill from queue', 'info');
  }

  commitAllExtractedBills() {
    const list = this.store.batchExtractedBills;
    if (list.length === 0) {
      this.showToast('No bills in queue to import', 'error');
      return;
    }

    const newVouchers = list.map(b => ({
      id: `vch_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      date: b.date,
      voucher_number: b.invoiceNumber,
      customer_name: b.buyer,
      gstin: b.buyerGstin,
      taxable_value: b.taxableValue,
      gst_rate: b.gstRate,
      interstate: b.isInterstate,
      cgst: b.cgst,
      sgst: b.sgst,
      igst: b.igst,
      total_gst: b.totalGst,
      invoice_total: b.invoiceTotal,
      source: 'batch_ai_extractor'
    }));

    const count = newVouchers.length;
    this.store.addBatchVouchers(newVouchers);
    this.store.batchExtractedBills = [];
    
    this.showToast(`Imported all ${count} extracted bills into Live Vouchers Ledger!`, 'success');
    window.location.hash = '#vouchers';
  }

  // ==========================================
  // REPORTS & GSTR-1 ANALYTICS
  // ==========================================
  renderReportsView() {
    const dateFrom = document.getElementById('reportFromDate')?.value || null;
    const dateTo = document.getElementById('reportToDate')?.value || null;

    const summary = this.store.getSummary(dateFrom, dateTo);
    const totals = summary.totals;

    document.getElementById('reportKpiVouchers').textContent = totals.count;
    document.getElementById('reportKpiTaxable').textContent = `₹ ${Format.currency(totals.taxable_value)}`;
    document.getElementById('reportKpiTotalGst').textContent = `₹ ${Format.currency(totals.total_gst)}`;
    document.getElementById('reportKpiInvoiceTotal').textContent = `₹ ${Format.currency(totals.invoice_total)}`;

    let filteredList = this.store.vouchers;
    if (dateFrom) filteredList = filteredList.filter(v => v.date >= dateFrom);
    if (dateTo) filteredList = filteredList.filter(v => v.date <= dateTo);

    const rateTableBody = document.getElementById('reportRateTableBody');
    if (rateTableBody) {
      const rates = [0, 5, 12, 18, 28];
      const rateStats = rates.map(r => {
        const vouchersWithRate = filteredList.filter(v => v.gst_rate === r);
        const count = vouchersWithRate.length;
        const taxable = vouchersWithRate.reduce((acc, v) => acc + (v.taxable_value || 0), 0);
        const cgst = vouchersWithRate.reduce((acc, v) => acc + (v.cgst || 0), 0);
        const sgst = vouchersWithRate.reduce((acc, v) => acc + (v.sgst || 0), 0);
        const igst = vouchersWithRate.reduce((acc, v) => acc + (v.igst || 0), 0);
        const total = vouchersWithRate.reduce((acc, v) => acc + (v.invoice_total || 0), 0);

        return { r, count, taxable, cgst, sgst, igst, total };
      });

      rateTableBody.innerHTML = rateStats.map(s => `
        <tr>
          <td><span class="badge badge-rate">${s.r}%</span></td>
          <td class="font-mono-data">${s.count}</td>
          <td class="font-mono-data text-right">₹ ${Format.currency(s.taxable)}</td>
          <td class="font-mono-data text-right">₹ ${Format.currency(s.cgst)}</td>
          <td class="font-mono-data text-right">₹ ${Format.currency(s.sgst)}</td>
          <td class="font-mono-data text-right">₹ ${Format.currency(s.igst)}</td>
          <td class="font-mono-data text-right font-bold">₹ ${Format.currency(s.total)}</td>
        </tr>
      `).join('');
    }

    const b2bTableBody = document.getElementById('reportB2bTableBody');
    if (b2bTableBody) {
      const b2bList = filteredList.filter(v => Boolean(v.gstin));
      if (b2bList.length === 0) {
        b2bTableBody.innerHTML = `<tr><td colspan="7" class="text-center py-6 text-slate-500">No B2B invoices found in this period.</td></tr>`;
      } else {
        b2bTableBody.innerHTML = b2bList.map(v => `
          <tr>
            <td class="font-mono-data">${v.date}</td>
            <td class="font-mono-data font-bold">${v.voucher_number}</td>
            <td>${v.customer_name}</td>
            <td class="font-mono-data font-bold text-slate-900">${v.gstin}</td>
            <td><span class="badge ${v.interstate ? 'badge-interstate' : 'badge-intrastate'}">${v.interstate ? 'IGST' : 'CGST+SGST'}</span></td>
            <td class="font-mono-data text-right">₹ ${Format.currency(v.taxable_value)}</td>
            <td class="font-mono-data text-right font-bold">₹ ${Format.currency(v.invoice_total)}</td>
          </tr>
        `).join('');
      }
    }
  }

  exportGstrJson() {
    const summary = this.store.getSummary();
    const gstr1Payload = {
      gstin: '27AABCA1234F1Z8',
      fp: '082026',
      cur_gt: summary.totals.taxable_value,
      b2b: this.store.vouchers.filter(v => Boolean(v.gstin)).map(v => ({
        ctin: v.gstin,
        inv: [{
          inum: v.voucher_number,
          idt: v.date,
          val: v.invoice_total,
          pos: v.interstate ? '29' : '27',
          rchrg: 'N',
          inv_typ: 'R',
          itms: [{
            num: 1,
            itm_det: {
              rt: v.gst_rate,
              txval: v.taxable_value,
              iamt: v.igst,
              camt: v.cgst,
              samt: v.sgst,
              csamt: 0
            }
          }]
        }]
      }))
    };

    const blob = new Blob([JSON.stringify(gstr1Payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GSTR1_Sales_Report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded GSTR-1 JSON for GST Portal upload', 'success');
  }

  // ==========================================
  // CLIENTS / CUSTOMERS MASTER DIRECTORY
  // ==========================================
  initClientEvents() {
    const searchInput = document.getElementById('clientSearchInput');
    const stateFilter = document.getElementById('clientStateFilter');
    const exportCsvBtn = document.getElementById('exportClientsCsvBtn');
    const clientForm = document.getElementById('clientForm');
    const gstinInput = document.getElementById('cliGstinInput');

    if (searchInput) {
      searchInput.addEventListener('input', () => this.renderClientsTable());
    }

    if (stateFilter) {
      stateFilter.addEventListener('change', () => this.renderClientsTable());
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', () => this.exportClientsCsv());
    }

    if (clientForm) {
      clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveClientFromModal();
      });
    }

    if (gstinInput) {
      gstinInput.addEventListener('input', () => {
        const raw = (gstinInput.value || '').toUpperCase().trim();
        gstinInput.value = raw;
        const feedback = document.getElementById('cliGstinFeedback');
        const stateInput = document.getElementById('cliStateInput');
        const panInput = document.getElementById('cliPanInput');

        if (raw.length >= 2) {
          const stateCode = raw.slice(0, 2);
          const stateName = BillParser.INDIAN_STATES[stateCode] || (stateCode === '27' ? 'Maharashtra' : 'Other State');
          if (stateInput) stateInput.value = `${stateCode} - ${stateName}`;
        } else if (stateInput) {
          stateInput.value = '';
        }

        if (raw.length >= 10) {
          const pan = raw.slice(2, 10);
          if (panInput) panInput.value = pan;
        } else if (panInput) {
          panInput.value = '';
        }

        const strictGstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (strictGstinRegex.test(raw)) {
          if (feedback) {
            feedback.style.display = 'inline-block';
            feedback.textContent = '✓ Valid GSTIN';
            feedback.className = 'badge badge-success';
          }
        } else if (raw.length === 15) {
          if (feedback) {
            feedback.style.display = 'inline-block';
            feedback.textContent = 'Check Format';
            feedback.className = 'badge badge-warning';
          }
        } else if (feedback) {
          feedback.style.display = 'none';
        }
      });
    }

    // Client Ledger Modal Actions
    document.getElementById('clientLedgerRecordVoucherBtn')?.addEventListener('click', () => {
      const activeClient = this.store.activeClientForLedger;
      if (activeClient) {
        document.getElementById('clientLedgerModal')?.classList.remove('open');
        this.openNewVoucherModal({
          customer_name: activeClient.name,
          gstin: activeClient.gstin,
          interstate: activeClient.stateCode !== '27'
        });
      }
    });

    document.getElementById('clientLedgerExportExcelBtn')?.addEventListener('click', () => {
      const activeClient = this.store.activeClientForLedger;
      if (activeClient) {
        const summary = this.store.getClientSalesSummary(activeClient);
        if (summary.vouchers.length === 0) {
          this.showToast('No recorded vouchers for this client to export', 'error');
          return;
        }
        const cleanName = activeClient.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        ExcelHandler.exportToTallyExcel(summary.vouchers, `vouchers_${cleanName}.xlsx`);
        this.showToast(`Exported ${summary.vouchers.length} vouchers for ${activeClient.name}`, 'success');
      }
    });
  }

  updateClientDatalists() {
    const nameDatalist = document.getElementById('clientNameDatalist');
    const gstinDatalist = document.getElementById('clientGstinDatalist');

    if (nameDatalist) {
      nameDatalist.innerHTML = this.store.clients.map(c => `<option value="${c.name}">`).join('');
    }

    if (gstinDatalist) {
      gstinDatalist.innerHTML = this.store.clients
        .filter(c => c.gstin && c.gstin !== 'Unregistered')
        .map(c => `<option value="${c.gstin}">${c.name}</option>`).join('');
    }
  }

  renderClientsView() {
    const summary = this.store.getClientsSummary();

    const kpiTotal = document.getElementById('kpiTotalClients');
    const kpiActive = document.getElementById('kpiActiveClients');
    const kpiSales = document.getElementById('kpiTotalClientSales');
    const kpiAvg = document.getElementById('kpiAvgClientSales');

    if (kpiTotal) kpiTotal.textContent = summary.totalClients;
    if (kpiActive) kpiActive.textContent = summary.activeClientsCount;
    if (kpiSales) kpiSales.textContent = `₹ ${Format.currency(summary.totalSales)}`;
    if (kpiAvg) kpiAvg.textContent = `₹ ${Format.currency(summary.avgSales)}`;

    this.renderClientsTable();
    this.updateClientDatalists();
  }

  renderClientsTable() {
    const tbody = document.getElementById('clientsTableBody');
    if (!tbody) return;

    const query = (document.getElementById('clientSearchInput')?.value || '').toLowerCase().trim();
    const stateFilter = document.getElementById('clientStateFilter')?.value || '';

    let list = this.store.clients.filter(c => {
      const matchQuery = !query ||
        c.name.toLowerCase().includes(query) ||
        (c.gstin && c.gstin.toLowerCase().includes(query)) ||
        (c.pan && c.pan.toLowerCase().includes(query)) ||
        (c.stateName && c.stateName.toLowerCase().includes(query)) ||
        (c.contactPerson && c.contactPerson.toLowerCase().includes(query)) ||
        (c.email && c.email.toLowerCase().includes(query));

      let matchState = true;
      if (stateFilter === '27') {
        matchState = (c.stateCode === '27');
      } else if (stateFilter === 'interstate') {
        matchState = (c.stateCode !== '27');
      } else if (stateFilter) {
        matchState = (c.stateCode === stateFilter);
      }

      return matchQuery && matchState;
    });

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-12 text-slate-500">
            <div style="font-size: 16px; font-weight: 600; color: #334155; margin-bottom: 4px;">No clients matched your criteria</div>
            <div style="font-size: 13px;">Click "+ Add New Client" to register a client profile.</div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(c => {
      const salesSummary = this.store.getClientSalesSummary(c);
      const isIntra = (c.stateCode === '27');
      const initials = (c.name || 'CL').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

      return `
        <tr>
          <td>
            <div class="client-name-cell">
              <div class="client-avatar">${initials}</div>
              <div>
                <div class="client-name-text">${c.name}</div>
                <div class="client-subtext">${c.contactPerson ? `${c.contactPerson} • ` : ''}${c.phone || c.email || 'Commercial Entity'}</div>
              </div>
            </div>
          </td>
          <td>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="font-mono-data font-bold text-slate-900">${c.gstin}</span>
              <button type="button" class="btn btn-outline btn-xs" style="padding: 1px 5px;" onclick="app.copyToClipboard('${c.gstin}')" title="Copy GSTIN">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
              </button>
            </div>
          </td>
          <td>
            <span class="${isIntra ? 'state-tag-intra' : 'state-tag-inter'}">
              ${c.stateCode} - ${c.stateName || (isIntra ? 'Maharashtra' : 'Other')}
            </span>
          </td>
          <td class="font-mono-data font-bold text-xs text-slate-700">${c.pan || '-'}</td>
          <td class="text-center">
            <span class="client-voucher-pill" onclick="app.openClientLedgerModal('${c.id}')" title="View client sales ledger">
              ${salesSummary.totals.count} Vouchers →
            </span>
          </td>
          <td class="font-mono-data text-right">₹ ${Format.currency(salesSummary.totals.taxable_value)}</td>
          <td class="font-mono-data text-right font-bold text-slate-900">₹ ${Format.currency(salesSummary.totals.invoice_total)}</td>
          <td class="text-right">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm font-bold" onclick="app.openClientLedgerModal('${c.id}')" title="View Sales Ledger">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                <span>Ledger</span>
              </button>
              <button class="btn btn-outline btn-sm btn-icon-only" onclick="app.openEditClientModal('${c.id}')" title="Edit Client">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="btn btn-outline btn-sm btn-icon-only text-rose-600" onclick="app.deleteClient('${c.id}')" title="Delete Client">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  openClientModal(editId = null) {
    const modal = document.getElementById('clientModal');
    if (!modal) return;

    document.getElementById('clientForm').reset();
    document.getElementById('clientEditId').value = '';
    document.getElementById('clientModalTitle').textContent = 'Add New Client';
    const feedback = document.getElementById('cliGstinFeedback');
    if (feedback) feedback.style.display = 'none';

    modal.classList.add('open');
  }

  openEditClientModal(id) {
    const c = this.store.getClientById(id);
    if (!c) return;

    const modal = document.getElementById('clientModal');
    if (!modal) return;

    document.getElementById('clientEditId').value = c.id;
    document.getElementById('clientModalTitle').textContent = `Edit Client: ${c.name}`;
    document.getElementById('cliNameInput').value = c.name;
    document.getElementById('cliGstinInput').value = c.gstin;
    document.getElementById('cliStateInput').value = `${c.stateCode} - ${c.stateName || 'Maharashtra'}`;
    document.getElementById('cliPanInput').value = c.pan || '';
    document.getElementById('cliContactInput').value = c.contactPerson || '';
    document.getElementById('cliPhoneInput').value = c.phone || '';
    document.getElementById('cliEmailInput').value = c.email || '';
    document.getElementById('cliAddressInput').value = c.address || '';
    document.getElementById('cliTermsInput').value = c.paymentTerms || '30 Days Net';

    const feedback = document.getElementById('cliGstinFeedback');
    if (feedback) {
      feedback.style.display = 'inline-block';
      feedback.textContent = '✓ Saved Profile';
      feedback.className = 'badge badge-success';
    }

    modal.classList.add('open');
  }

  saveClientFromModal() {
    const editId = document.getElementById('clientEditId').value;
    const name = document.getElementById('cliNameInput').value.trim();
    const gstin = document.getElementById('cliGstinInput').value.trim().toUpperCase();
    const contactPerson = document.getElementById('cliContactInput').value.trim();
    const phone = document.getElementById('cliPhoneInput').value.trim();
    const email = document.getElementById('cliEmailInput').value.trim();
    const address = document.getElementById('cliAddressInput').value.trim();
    const paymentTerms = document.getElementById('cliTermsInput').value;

    if (!name || !gstin) {
      this.showToast('Client Name and GSTIN are required', 'error');
      return;
    }

    const clientPayload = {
      name,
      gstin,
      contactPerson,
      phone,
      email,
      address,
      paymentTerms
    };

    if (editId) {
      this.store.updateClient(editId, clientPayload);
      this.showToast(`Updated profile for ${name}`, 'success');
    } else {
      this.store.addClient(clientPayload);
      this.showToast(`Added client "${name}" to directory`, 'success');
    }

    document.getElementById('clientModal')?.classList.remove('open');
    this.renderClientsView();
    this.updateClientDatalists();
  }

  deleteClient(id) {
    const c = this.store.getClientById(id);
    if (!c) return;

    if (confirm(`Are you sure you want to remove "${c.name}" from client directory?`)) {
      this.store.deleteClient(id);
      this.showToast(`Removed "${c.name}" from client directory`, 'success');
      this.renderClientsView();
      this.updateClientDatalists();
    }
  }

  openClientLedgerModal(clientIdOrGstin) {
    const summary = this.store.getClientSalesSummary(clientIdOrGstin);
    if (!summary || !summary.client) {
      this.showToast('Client not found', 'error');
      return;
    }

    const c = summary.client;
    this.store.activeClientForLedger = c;

    const modal = document.getElementById('clientLedgerModal');
    if (!modal) return;

    document.getElementById('clientLedgerModalTitle').textContent = `Client Sales Ledger: ${c.name}`;
    document.getElementById('clientLedgerSubtitle').textContent = `${c.contactPerson ? `Contact: ${c.contactPerson} • ` : ''}${c.phone || c.email || ''} ${c.address ? `• ${c.address}` : ''}`;
    document.getElementById('clientLedgerGstinBadge').textContent = c.gstin;
    document.getElementById('clientLedgerStateBadge').textContent = `${c.stateCode} - ${c.stateName}`;
    document.getElementById('clientLedgerStateBadge').className = `badge ${c.stateCode === '27' ? 'badge-intrastate' : 'badge-interstate'}`;

    document.getElementById('clientLedgerVoucherCount').textContent = summary.totals.count;
    document.getElementById('clientLedgerTaxableVolume').textContent = `₹ ${Format.currency(summary.totals.taxable_value)}`;
    document.getElementById('clientLedgerTotalGst').textContent = `₹ ${Format.currency(summary.totals.total_gst)}`;
    document.getElementById('clientLedgerInvoiceTotal').textContent = `₹ ${Format.currency(summary.totals.invoice_total)}`;

    const tbody = document.getElementById('clientLedgerTableBody');
    if (tbody) {
      if (summary.vouchers.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="10" class="text-center py-8 text-slate-500">
              No sales vouchers have been recorded for this client yet.
            </td>
          </tr>
        `;
      } else {
        tbody.innerHTML = summary.vouchers.map(v => `
          <tr>
            <td class="font-mono-data">${v.date}</td>
            <td class="font-mono-data font-bold text-slate-900">${v.voucher_number}</td>
            <td><span class="badge ${v.interstate ? 'badge-interstate' : 'badge-intrastate'}">${v.interstate ? 'IGST' : 'CGST+SGST'}</span></td>
            <td><span class="badge badge-rate">${v.gst_rate}%</span></td>
            <td class="font-mono-data text-right">₹ ${Format.currency(v.taxable_value)}</td>
            <td class="font-mono-data text-right text-xs">${v.interstate ? '-' : `₹ ${Format.currency(v.cgst)}`}</td>
            <td class="font-mono-data text-right text-xs">${v.interstate ? '-' : `₹ ${Format.currency(v.sgst)}`}</td>
            <td class="font-mono-data text-right text-xs">${v.interstate ? `₹ ${Format.currency(v.igst)}` : '-'}</td>
            <td class="font-mono-data text-right font-bold text-slate-900">₹ ${Format.currency(v.invoice_total)}</td>
            <td class="text-right">
              <button class="btn btn-outline btn-sm font-bold" onclick="app.viewVoucher('${v.id}')">View</button>
            </td>
          </tr>
        `).join('');
      }
    }

    modal.classList.add('open');
  }

  exportClientsCsv() {
    const clients = this.store.clients;
    if (clients.length === 0) {
      this.showToast('No clients to export', 'error');
      return;
    }

    const headers = [
      'Client Name',
      'GSTIN',
      'State Code',
      'State Name',
      'PAN',
      'Contact Person',
      'Phone',
      'Email',
      'Address',
      'Payment Terms',
      'Vouchers Count',
      'Taxable Volume (INR)',
      'Gross Sales (INR)'
    ];

    const rows = clients.map(c => {
      const summary = this.store.getClientSalesSummary(c);
      return [
        `"${(c.name || '').replace(/"/g, '""')}"`,
        `"${c.gstin || ''}"`,
        `"${c.stateCode || ''}"`,
        `"${c.stateName || ''}"`,
        `"${c.pan || ''}"`,
        `"${(c.contactPerson || '').replace(/"/g, '""')}"`,
        `"${c.phone || ''}"`,
        `"${c.email || ''}"`,
        `"${(c.address || '').replace(/"/g, '""')}"`,
        `"${c.paymentTerms || ''}"`,
        summary.totals.count,
        summary.totals.taxable_value,
        summary.totals.invoice_total
      ].join(',');
    });

    const csvContent = `${headers.join(',')}\n${rows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clients_master_directory.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded Clients Directory CSV!', 'success');
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 200ms';
      setTimeout(() => toast.remove(), 200);
    }, 3200);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appStore = new AppStore();
  window.app = new UIManager(window.appStore);
});

