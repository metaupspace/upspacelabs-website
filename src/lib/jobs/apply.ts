import type {
  ApiJob,
  ApplicationRequest,
  ExperienceBand,
  HearAboutUs,
} from '@/lib/types';

/** Every field of the apply form (the name is split in two, as designed). */
export interface ApplyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  currentLocation: string;
  linkedinId: string;
  qualification: string;
  experience: string;
  lastSalary: string;
  noticePeriod: string;
  comfortableFlexibleShifts: string;
  hearAboutUs: string;
  referredBy: string;
  githubId: string;
  portfolioLink: string;
  technologiesKnown: string;
  hardestProblem: string;
  whyGoodFit: string;
  whyJoinUs: string;
  resumeUrl: string;
}

export type ApplyField = keyof ApplyFormValues;
export type ApplyErrors = Partial<Record<ApplyField, string>>;

export const EMPTY_APPLICATION: ApplyFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  whatsappNumber: '',
  currentLocation: '',
  linkedinId: '',
  qualification: '',
  experience: '',
  lastSalary: '',
  noticePeriod: '',
  comfortableFlexibleShifts: '',
  hearAboutUs: '',
  referredBy: '',
  githubId: '',
  portfolioLink: '',
  technologiesKnown: '',
  hardestProblem: '',
  whyGoodFit: '',
  whyJoinUs: '',
  resumeUrl: '',
};

export const EXPERIENCE_BANDS: ExperienceBand[] = [
  'fresher',
  '0-1',
  '1-3',
  '3-5',
];
export const HEAR_ABOUT_US: HearAboutUs[] = [
  'linkedin_post',
  'linkedin_company',
  'job_portal',
  'whatsapp_telegram',
  'company_website',
  'other',
];

/** Optional fields the API keeps for tech roles. */
export const TECH_FIELDS = [
  'githubId',
  'portfolioLink',
  'technologiesKnown',
  'hardestProblem',
] as const;

/** Engineering-type roles get the optional tech questions. */
export const isTechRole = (job: Pick<ApiJob, 'domain' | 'department'>) =>
  /tech|engineer|develop|software|devops|data|\bqa\b|\bit\b/i.test(
    `${job.domain} ${job.department}`
  );

/** The API's length limits (CreateApplicationDto). */
const MAX: Partial<Record<ApplyField, number>> = {
  contactNumber: 100,
  whatsappNumber: 100,
  currentLocation: 200,
  linkedinId: 500,
  qualification: 200,
  lastSalary: 100,
  noticePeriod: 100,
  referredBy: 200,
  githubId: 500,
  portfolioLink: 500,
  technologiesKnown: 2000,
  hardestProblem: 5000,
  whyGoodFit: 5000,
  whyJoinUs: 5000,
};

const REQUIRED: ApplyField[] = [
  'firstName',
  'lastName',
  'email',
  'contactNumber',
  'whatsappNumber',
  'currentLocation',
  'linkedinId',
  'qualification',
  'experience',
  'lastSalary',
  'noticePeriod',
  'comfortableFlexibleShifts',
  'hearAboutUs',
  'whyGoodFit',
  'whyJoinUs',
  'resumeUrl',
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Mirrors the API's validation, so problems show beside the fields before submitting. */
export function validateApplication(values: ApplyFormValues): ApplyErrors {
  const errors: ApplyErrors = {};
  for (const field of REQUIRED) {
    if (!values[field].trim()) {
      errors[field] =
        field === 'resumeUrl'
          ? 'Please upload your résumé.'
          : 'This field is required.';
    }
  }
  if (!errors.email && !EMAIL.test(values.email.trim()))
    errors.email = 'Please enter a valid email address.';
  if (`${values.firstName} ${values.lastName}`.trim().length > 200)
    errors.lastName = 'Name is too long.';
  if (
    values.experience &&
    !EXPERIENCE_BANDS.includes(values.experience as ExperienceBand)
  )
    errors.experience = 'Please pick an option.';
  if (
    values.hearAboutUs &&
    !HEAR_ABOUT_US.includes(values.hearAboutUs as HearAboutUs)
  )
    errors.hearAboutUs = 'Please pick an option.';
  for (const [field, max] of Object.entries(MAX) as [ApplyField, number][]) {
    if (!errors[field] && values[field].trim().length > max)
      errors[field] = `Please keep this under ${max} characters.`;
  }
  return errors;
}

/** The API body: trimmed, the name joined, empty optional fields left out (the API rejects empty strings for them). */
export function toApplicationRequest(
  values: ApplyFormValues
): ApplicationRequest {
  const t = (field: ApplyField) => values[field].trim();
  const optional = (field: ApplyField) => (t(field) ? t(field) : undefined);
  return {
    fullName: `${t('firstName')} ${t('lastName')}`.trim(),
    email: t('email'),
    contactNumber: t('contactNumber'),
    whatsappNumber: t('whatsappNumber'),
    currentLocation: t('currentLocation'),
    linkedinId: t('linkedinId'),
    qualification: t('qualification'),
    experience: t('experience') as ExperienceBand,
    comfortableFlexibleShifts: values.comfortableFlexibleShifts === 'yes',
    lastSalary: t('lastSalary'),
    noticePeriod: t('noticePeriod'),
    referredBy: optional('referredBy'),
    hearAboutUs: t('hearAboutUs') as HearAboutUs,
    resumeUrl: t('resumeUrl'),
    whyGoodFit: t('whyGoodFit'),
    whyJoinUs: t('whyJoinUs'),
    githubId: optional('githubId'),
    portfolioLink: optional('portfolioLink'),
    technologiesKnown: optional('technologiesKnown'),
    hardestProblem: optional('hardestProblem'),
  };
}
