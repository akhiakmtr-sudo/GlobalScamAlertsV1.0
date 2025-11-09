
import { User, Role, ScamReport, ReportStatus, VerifiedAgency } from '../types';

// =================================================================================================
// MOCK DATABASE - In a real application, this would be a real database.
// =================================================================================================

const MOCK_USERS: User[] = [
  { id: 'user-1', fullName: 'John Doe', email: 'user@example.com', role: Role.USER },
  { id: 'admin-1', fullName: 'Admin', email: 'admin@example.com', role: Role.ADMIN },
];

const MOCK_REPORTS: ScamReport[] = [
  {
    id: 'report-1',
    companyDetails: { name: 'Quick Rich Inc.', address: '123 Fake St, Scamsville', website: 'https://quickrich.scam', socialMedia: 'facebook.com/quickrich', contactNumbers: '555-1234' },
    scamDescription: 'Promised high returns on investment but never paid out. After investing, they stopped responding to all communication. Their website now shows an error.',
    proofImages: ['https://picsum.photos/seed/proof1/400/300', 'https://picsum.photos/seed/proof2/400/300'],
    submittedBy: { id: 'user-1', fullName: 'John Doe', email: 'user@example.com' },
    status: ReportStatus.APPROVED,
    createdAt: new Date('2023-10-26T10:00:00Z'),
    updatedAt: new Date('2023-10-26T12:00:00Z'),
  },
  {
    id: 'report-2',
    companyDetails: { name: 'Easy Money Ltd.', address: '456 Deception Ave', website: 'https://easymoney.scam', socialMedia: 'instagram.com/easymoney', contactNumbers: '555-5678' },
    scamDescription: 'They sell products that are never delivered. I ordered a product a month ago, they took the money but never shipped it. Customer service is a bot that gives no useful information.',
    proofImages: ['https://picsum.photos/seed/proof3/400/300'],
    submittedBy: { id: 'user-1', fullName: 'John Doe', email: 'user@example.com' },
    status: ReportStatus.PENDING,
    createdAt: new Date('2023-10-27T14:30:00Z'),
    updatedAt: new Date('2023-10-27T14:30:00Z'),
  },
  {
    id: 'report-3',
    companyDetails: { name: 'Crypto Gains Co.', address: '789 Phishing Ln', website: 'https://cryptogains.scam', socialMedia: 'twitter.com/cryptogainsco', contactNumbers: '555-8765' },
    scamDescription: 'A classic crypto phishing scam. They ask for your wallet seed phrase to "verify" your account for a big airdrop, then drain all your funds.',
    proofImages: [],
    submittedBy: { id: 'user-1', fullName: 'John Doe', email: 'user@example.com' },
    status: ReportStatus.REJECTED,
    createdAt: new Date('2023-10-25T09:00:00Z'),
    updatedAt: new Date('2023-10-25T11:00:00Z'),
  },
];

const MOCK_AGENCIES: VerifiedAgency[] = [
    { id: 'agency-1', name: 'Federal Trade Commission (FTC)', description: 'An independent agency of the United States government whose principal mission is the enforcement of civil U.S. antitrust law and the promotion of consumer protection.', logoUrl: 'https://picsum.photos/seed/ftc/200', website: 'https://www.ftc.gov/' },
    { id: 'agency-2', name: 'Consumer Financial Protection Bureau (CFPB)', description: 'A U.S. government agency that makes sure banks, lenders, and other financial companies treat you fairly.', logoUrl: 'https://picsum.photos/seed/cfpb/200', website: 'https://www.consumerfinance.gov/' }
]

// =================================================================================================
// MOCK API FUNCTIONS - Replace these with actual HTTP requests to your backend.
// =================================================================================================

const simulateNetworkDelay = (delay = 500) => new Promise(res => setTimeout(res, delay));

const base64FromFile = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
});

export const api = {
  // --- AUTH ---
  login: async (email: string, password: string): Promise<User | null> => {
    await simulateNetworkDelay();
    const user = MOCK_USERS.find(u => u.email === email);
    if (user) { // In real app, you'd check password hash
      localStorage.setItem('session-token', user.id);
      return user;
    }
    return null;
  },

  signup: async (fullName: string, email: string, password: string): Promise<User | null> => {
    await simulateNetworkDelay();
    if (MOCK_USERS.some(u => u.email === email)) {
      throw new Error("User already exists");
    }
    const newUser: User = { id: `user-${Date.now()}`, fullName, email, role: Role.USER };
    MOCK_USERS.push(newUser);
    localStorage.setItem('session-token', newUser.id);
    return newUser;
  },

  logout: () => {
    localStorage.removeItem('session-token');
  },
  
  checkSession: async (): Promise<User | null> => {
    await simulateNetworkDelay(200);
    const userId = localStorage.getItem('session-token');
    if (!userId) return null;
    return MOCK_USERS.find(u => u.id === userId) || null;
  },

  // --- SCAM REPORTS ---
  getScamReports: async (): Promise<ScamReport[]> => {
    await simulateNetworkDelay();
    return [...MOCK_REPORTS];
  },

  submitScamReport: async (data: { companyDetails: any, scamDescription: string, proofImages: File[], submittedById: string }): Promise<ScamReport> => {
    await simulateNetworkDelay(1000);
    const submitter = MOCK_USERS.find(u => u.id === data.submittedById);
    if (!submitter) throw new Error("User not found");

    const imageUrls = await Promise.all(data.proofImages.map(base64FromFile));
    
    const newReport: ScamReport = {
      id: `report-${Date.now()}`,
      companyDetails: data.companyDetails,
      scamDescription: data.scamDescription,
      proofImages: imageUrls,
      submittedBy: { id: submitter.id, fullName: submitter.fullName, email: submitter.email },
      status: ReportStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    MOCK_REPORTS.push(newReport);
    return newReport;
  },

  updateReportStatus: async (reportId: string, status: ReportStatus): Promise<ScamReport> => {
    await simulateNetworkDelay();
    const reportIndex = MOCK_REPORTS.findIndex(r => r.id === reportId);
    if (reportIndex === -1) throw new Error("Report not found");
    MOCK_REPORTS[reportIndex].status = status;
    MOCK_REPORTS[reportIndex].updatedAt = new Date();
    return MOCK_REPORTS[reportIndex];
  },

  deleteReport: async (reportId: string): Promise<{ success: true }> => {
    await simulateNetworkDelay();
    const reportIndex = MOCK_REPORTS.findIndex(r => r.id === reportId);
    if (reportIndex === -1) throw new Error("Report not found");
    MOCK_REPORTS.splice(reportIndex, 1);
    return { success: true };
  },

  // --- VERIFIED AGENCIES ---
  getVerifiedAgencies: async (): Promise<VerifiedAgency[]> => {
      await simulateNetworkDelay();
      return [...MOCK_AGENCIES];
  }
};
