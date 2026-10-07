/** Every Job Portal API response is wrapped like this (its TransformInterceptor). */
export interface JobsApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface JobRequirements {
  skills: string[];
  experience: string[];
  education: string[];
  certifications: string[];
}

/** A job as `GET /api/jobs` returns it (only active jobs are public). */
export interface ApiJob {
  _id: string;
  /** Human job code, e.g. "UDI-001" — also accepted by `GET /api/jobs/:identifier`. */
  jobId: string;
  title: string;
  department: string;
  domain: string;
  level: string;
  employment_type: string;
  location: string;
  remote: boolean;
  description: string;
  requirements: JobRequirements;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Thrown by the jobs service for failed requests (network errors use status 0). */
export interface JobsApiError {
  message: string;
  status: number;
}

/** Experience bands the Job Portal API accepts (its `Experience` enum). */
export type ExperienceBand = 'fresher' | '0-1' | '1-3' | '3-5';

/** "How did you hear about us" values (its `HearAboutUs` enum). */
export type HearAboutUs =
  | 'linkedin_post'
  | 'linkedin_company'
  | 'job_portal'
  | 'whatsapp_telegram'
  | 'company_website'
  | 'other';

/** Body of `POST /api/applications/:jobIdentifier` (its CreateApplicationDto). */
export interface ApplicationRequest {
  fullName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  currentLocation: string;
  linkedinId: string;
  qualification: string;
  experience: ExperienceBand;
  comfortableFlexibleShifts: boolean;
  lastSalary: string;
  noticePeriod: string;
  referredBy?: string;
  hearAboutUs: HearAboutUs;
  /** From `POST /api/upload/resume`. */
  resumeUrl: string;
  whyGoodFit: string;
  whyJoinUs: string;
  // Optional, meant for tech roles.
  githubId?: string;
  portfolioLink?: string;
  technologiesKnown?: string;
  hardestProblem?: string;
}

/** The stored application, as returned on submission. */
export interface ApplicationResponse {
  _id: string;
  status: string;
}
