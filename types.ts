
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum ReportStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
}

export interface ScamCompanyDetails {
  name: string;
  address: string;
  website: string;
  socialMedia: string;
  contactNumbers: string;
}

export interface ScamReport {
  id: string;
  companyDetails: ScamCompanyDetails;
  scamDescription: string;
  proofImages: string[]; // URLs or base64 strings
  submittedBy: Pick<User, 'id' | 'fullName' | 'email'>;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerifiedAgency {
    id: string;
    name: string;
    description: string;
    website: string;
    logoUrl: string;
}
