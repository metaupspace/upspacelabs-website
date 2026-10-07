import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  EMPTY_APPLICATION,
  isTechRole,
  toApplicationRequest,
  validateApplication,
  type ApplyFormValues,
} from '@/lib/jobs/apply';
import { JOBS_API_URL, jobsService } from '@/services/jobs.service';
import { mapApplyFormLabels } from '@/lib/strapi/mappers';
import { careerPageFallback } from '@/lib/content/career';

const FILLED: ApplyFormValues = {
  ...EMPTY_APPLICATION,
  firstName: ' Test ',
  lastName: 'Person',
  email: 'test@example.com',
  contactNumber: '+91 6000 000 000',
  whatsappNumber: '+91 6000 000 000',
  currentLocation: 'Delhi',
  linkedinId: 'https://linkedin.com/in/test',
  qualification: 'B.Tech',
  experience: '1-3',
  lastSalary: '6 LPA',
  noticePeriod: '30 days',
  comfortableFlexibleShifts: 'no',
  hearAboutUs: 'company_website',
  whyGoodFit: 'Good fit',
  whyJoinUs: 'Ownership',
  resumeUrl: 'https://res.cloudinary.com/demo/resume.pdf',
};

afterEach(() => vi.restoreAllMocks());

describe('validateApplication', () => {
  it('flags every required field of an empty form', () => {
    const errors = validateApplication(EMPTY_APPLICATION);
    expect(Object.keys(errors)).toHaveLength(16);
    expect(errors.resumeUrl).toBe('Please upload your résumé.');
    expect(errors.referredBy).toBeUndefined();
  });

  it('accepts a complete form and checks email, options and lengths', () => {
    expect(validateApplication(FILLED)).toEqual({});
    expect(validateApplication({ ...FILLED, email: 'nope' }).email).toMatch(
      /valid email/
    );
    expect(
      validateApplication({ ...FILLED, experience: '10+' }).experience
    ).toBeDefined();
    expect(
      validateApplication({ ...FILLED, lastSalary: 'x'.repeat(101) }).lastSalary
    ).toMatch(/100/);
  });
});

describe('toApplicationRequest', () => {
  it('joins the name, maps the yes/no and leaves out empty optional fields', () => {
    const body = toApplicationRequest(FILLED);
    expect(body.fullName).toBe('Test Person');
    expect(body.comfortableFlexibleShifts).toBe(false);
    expect('referredBy' in body && body.referredBy !== undefined).toBe(false);
    expect(JSON.parse(JSON.stringify(body))).not.toHaveProperty('githubId');
    expect(toApplicationRequest({ ...FILLED, githubId: 'gh' }).githubId).toBe(
      'gh'
    );
  });
});

describe('isTechRole', () => {
  it('spots engineering roles', () => {
    expect(isTechRole({ domain: 'Engineering', department: 'Tech' })).toBe(
      true
    );
    expect(isTechRole({ domain: 'Design', department: 'Design' })).toBe(false);
  });
});

describe('jobsService writes', () => {
  const respond = (status: number, body: unknown) =>
    vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify(body), { status }));

  it('uploads the résumé as multipart form data', async () => {
    const fetch = respond(201, {
      success: true,
      statusCode: 201,
      message: 'ok',
      data: { url: 'https://x/r.pdf' },
    });
    const file = new File(['%PDF'], 'cv.pdf', { type: 'application/pdf' });
    await expect(jobsService.uploadResume(file)).resolves.toEqual({
      url: 'https://x/r.pdf',
    });
    const [url, init] = fetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${JOBS_API_URL}/api/upload/resume`);
    expect(init.method).toBe('POST');
    expect((init.body as FormData).get('file')).toBeInstanceOf(File);
  });

  it('posts the application as JSON and surfaces a duplicate as 409', async () => {
    const fetch = respond(409, {
      success: false,
      statusCode: 409,
      message: 'You have already applied for this job',
    });
    await expect(
      jobsService.apply('PD-001', toApplicationRequest(FILLED))
    ).rejects.toEqual({
      message: 'You have already applied for this job',
      status: 409,
    });
    const [url, init] = fetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${JOBS_API_URL}/api/applications/PD-001`);
    expect(JSON.parse(init.body as string).fullName).toBe('Test Person');
  });
});

describe('apply form wording', () => {
  it('falls back per string and per field label / option', () => {
    const fallback = careerPageFallback.applyForm;
    const labels = mapApplyFormLabels(
      {
        submitLabel: 'Send',
        fields: {
          email: { label: 'Work email' },
          experience: { options: { fresher: 'New grad' } },
        },
      },
      fallback
    );
    expect(labels.submitLabel).toBe('Send');
    expect(labels.titleTemplate).toBe(fallback.titleTemplate);
    expect(labels.fields.email).toEqual({
      label: 'Work email',
      placeholder: fallback.fields.email.placeholder,
    });
    expect(labels.fields.experience.options?.fresher).toBe('New grad');
    expect(labels.fields.experience.options?.['1-3']).toBe(
      fallback.fields.experience.options?.['1-3']
    );
  });
});
