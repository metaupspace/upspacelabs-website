'use client';

import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  CloudUpload,
} from '@metaupspace/icons';
import {
  Button,
  FileDropper,
  Input,
  Select,
  SelectItem,
} from '@metaupspace/ui';
import { InnerGuideContent } from '@/components/layout/PageFrame';
import { AppLink } from '@/components/shared/AppLink';
import { useApplyToJob, useUploadResume } from '@/hooks/useApplication';
import { useJob } from '@/hooks/useJobs';
import {
  EMPTY_APPLICATION,
  EXPERIENCE_BANDS,
  HEAR_ABOUT_US,
  isTechRole,
  toApplicationRequest,
  validateApplication,
  type ApplyErrors,
  type ApplyField,
  type ApplyFormValues,
} from '@/lib/jobs/apply';
import type { ApplyFormLabels, JobsApiError } from '@/lib/types';

/** Design: 16px medium labels, 68px grey fields with 19px text. */
const LABEL =
  'text-[15px] md:text-base font-medium text-neutral-800 dark:text-neutral-200';
const INPUT_CLASSES = {
  label: LABEL,
  field:
    'min-h-[56px] md:min-h-[68px] rounded-[8px] border-neutral-200 bg-[#F3F3F3] px-4 dark:border-neutral-700 dark:bg-neutral-900 dark:focus-within:border-indigo-400',
  input:
    'text-[17px] md:text-[19px] placeholder:text-neutral-500 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-500',
  errorMessage: 'text-sm',
} as const;
const SELECT_CLASSES = {
  root: 'gap-[11px]',
  label: LABEL,
  trigger:
    'h-[56px] md:h-[68px] rounded-[8px] border-neutral-200 bg-[#F3F3F3] px-4 text-[17px] md:text-[19px] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white',
} as const;

const SELECT_OPTIONS: Partial<Record<ApplyField, readonly string[]>> = {
  experience: EXPERIENCE_BANDS,
  comfortableFlexibleShifts: ['yes', 'no'],
  hearAboutUs: HEAR_ABOUT_US,
};

/** Grid row of two fields from md up, stacked on phones. */
const Row = ({ children }: { children: ReactNode }) => (
  <div className="grid gap-5 md:grid-cols-2 md:gap-x-3.5">{children}</div>
);

/** API failures → one message for the form. */
function submitMessage(err: JobsApiError, labels: ApplyFormLabels) {
  if (err.status === 409) return labels.duplicateMessage;
  if (err.status === 429) return labels.rateLimitMessage;
  if (err.status === 400 && err.message) return err.message;
  return labels.errorMessage;
}

/**
 * The application form for one job, following the Job Portal API: every
 * field it requires, the optional ones (tech questions only for tech roles),
 * and a résumé uploaded first to the API's upload endpoint. Fields are
 * checked here with the API's own rules before submitting.
 */
export function ApplyForm({
  slug,
  labels,
  unavailableMessage,
}: {
  slug: string;
  labels: ApplyFormLabels;
  unavailableMessage: string;
}) {
  const { data: job, isError } = useJob(slug);
  const upload = useUploadResume();
  const apply = useApplyToJob(slug);
  const [values, setValues] = useState<ApplyFormValues>(EMPTY_APPLICATION);
  const [errors, setErrors] = useState<ApplyErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = (field: ApplyField) => (value: string) => {
    setValues(v => ({ ...v, [field]: value }));
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }));
  };
  const copy = (field: ApplyField) => labels.fields[field];

  const text = (
    field: ApplyField,
    extra: Partial<Parameters<typeof Input>[0]> = {}
  ) => (
    <Input
      classNames={INPUT_CLASSES}
      label={copy(field).label}
      placeholder={copy(field).placeholder}
      value={values[field]}
      onChange={set(field)}
      errorMessage={errors[field]}
      {...extra}
    />
  );
  const area = (field: ApplyField) =>
    text(field, {
      type: 'textarea',
      rows: 1,
      autoResize: true,
      maxLength: 5000,
    });
  const select = (field: ApplyField) => (
    <div className="flex flex-col gap-1.5">
      <Select
        classNames={SELECT_CLASSES}
        label={copy(field).label}
        placeholder={copy(field).placeholder}
        value={values[field] || undefined}
        onValueChange={set(field)}
      >
        {(SELECT_OPTIONS[field] ?? []).map(option => (
          <SelectItem
            key={option}
            value={option}
            label={copy(field).options?.[option] ?? option}
          />
        ))}
      </Select>
      {errors[field] && (
        <p className="text-sm text-red-600 dark:text-red-400">
          {errors[field]}
        </p>
      )}
    </div>
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (apply.isPending) return;
    setFormError(null);
    const found = validateApplication(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Bring the first problem into view.
      requestAnimationFrame(() =>
        document
          .querySelector(
            '[data-apply-form] [aria-invalid="true"], [data-apply-form] .text-red-600'
          )
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      );
      return;
    }
    try {
      await apply.mutateAsync(toApplicationRequest(values));
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setFormError(submitMessage(err as JobsApiError, labels));
    }
  }

  if (!job) {
    return (
      <InnerGuideContent contentClassName="px-6 pt-28 pb-20 md:pt-[180px]">
        <p
          role={isError ? 'alert' : 'status'}
          className="py-20 text-center text-neutral-500 dark:text-neutral-400"
        >
          {isError ? unavailableMessage : '…'}
        </p>
      </InnerGuideContent>
    );
  }

  const title = labels.titleTemplate.replace('{role}', job.title);

  return (
    <InnerGuideContent contentClassName="px-6 pt-28 pb-20 md:pt-[180px] md:pr-[58px] md:pb-24 md:pl-[45px]">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13.5px]">
          <li>
            <AppLink
              href="/"
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              Home
            </AppLink>
          </li>
          <li aria-hidden className="text-neutral-500">
            <ChevronRight size={14} />
          </li>
          <li>
            <AppLink
              href={`/career/${slug}`}
              className="text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
            >
              {job.title}
            </AppLink>
          </li>
          <li aria-hidden className="text-neutral-500">
            <ChevronRight size={14} />
          </li>
          <li
            aria-current="page"
            className="font-medium text-black dark:text-white"
          >
            {labels.breadcrumbLabel}
          </li>
        </ol>
      </nav>
      <h1 className="mt-4 text-[26px] [line-height:1.25] font-semibold tracking-[-0.01em] text-black [font-variation-settings:normal] md:text-[29px] dark:text-white">
        {title}
      </h1>

      {apply.isSuccess ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="mt-11 flex flex-col items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 outline-none dark:border-emerald-500/20 dark:bg-emerald-500/5"
        >
          <CircleCheck
            aria-hidden
            size={32}
            className="text-emerald-600 dark:text-emerald-400"
          />
          <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">
            {labels.successTitle}
          </h2>
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            {labels.successMessage}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Application ID: <span className="font-mono">{apply.data._id}</span>
          </p>
        </div>
      ) : (
        <form
          data-apply-form
          noValidate
          onSubmit={onSubmit}
          className="mt-8 flex flex-col gap-5 md:mt-11"
        >
          <Row>
            {text('firstName', { autoComplete: 'given-name', maxLength: 100 })}
            {text('lastName', { autoComplete: 'family-name', maxLength: 100 })}
          </Row>
          {text('email', {
            type: 'email',
            autoComplete: 'email',
            maxLength: 254,
            startIcon: null,
          })}
          <Row>
            {text('contactNumber', {
              autoComplete: 'tel',
              inputMode: 'tel',
              maxLength: 100,
            })}
            {text('whatsappNumber', { inputMode: 'tel', maxLength: 100 })}
          </Row>
          <Row>
            {text('currentLocation', {
              autoComplete: 'address-level2',
              maxLength: 200,
            })}
            {text('linkedinId', { maxLength: 500 })}
          </Row>
          <Row>
            {text('qualification', { maxLength: 200 })}
            {select('experience')}
          </Row>
          <Row>
            {text('lastSalary', { maxLength: 100 })}
            {text('noticePeriod', { maxLength: 100 })}
          </Row>
          <Row>
            {select('comfortableFlexibleShifts')}
            {select('hearAboutUs')}
          </Row>
          {text('referredBy', { maxLength: 200 })}

          {isTechRole(job) && (
            <fieldset className="flex flex-col gap-5">
              <legend className="mb-1 text-[17px] font-semibold text-black dark:text-white">
                {labels.techSectionTitle}
              </legend>
              <Row>
                {text('githubId', { maxLength: 500 })}
                {text('portfolioLink', { maxLength: 500 })}
              </Row>
              {text('technologiesKnown', { maxLength: 2000 })}
              {area('hardestProblem')}
            </fieldset>
          )}

          {area('whyGoodFit')}
          {area('whyJoinUs')}

          <div className="flex flex-col gap-[11px]">
            <span className={LABEL} id="resume-label">
              {labels.uploadLabel}
            </span>
            <FileDropper
              aria-labelledby="resume-label"
              accept={['.pdf', '.doc', '.docx']}
              maxFileSize={5 * 1024 * 1024}
              maxFiles={1}
              multiple={false}
              // Big cloud icon, "Drop file or Browse" and the format hint built from accept/maxFileSize.
              dropzoneLayout="tall"
              dropzoneIcon={
                // The icon sets its colour inline, so the colour goes on a wrapper.
                <span className="text-[#4F46E5] dark:text-indigo-300">
                  <CloudUpload size={30} strokeWidth={1.75} />
                </span>
              }
              onUpload={async files => {
                try {
                  const { url } = await upload.mutateAsync(files[0]);
                  set('resumeUrl')(url);
                } catch (err) {
                  set('resumeUrl')('');
                  throw new Error(
                    (err as JobsApiError).message || labels.errorMessage
                  );
                }
              }}
              onRemove={() => set('resumeUrl')('')}
              onError={message =>
                setErrors(e => ({ ...e, resumeUrl: message }))
              }
              classNames={{
                dropzone:
                  'min-h-[180px] md:min-h-[209px] rounded-[8px] border-dashed border-indigo-300 bg-[#EEF2FF] dark:border-indigo-500/40 dark:bg-indigo-500/10',
              }}
            />
            {errors.resumeUrl && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.resumeUrl}
              </p>
            )}
          </div>

          {formError && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300"
            >
              {formError}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            loading={apply.isPending}
            disabled={upload.isPending}
            endIcon={<ArrowRight aria-hidden />}
            className="mt-4 h-[60px] rounded-[8px] bg-[#4F46E5] text-[17px] hover:bg-[#4338CA] md:mt-[33px] md:h-[68px] md:text-[18px]"
          >
            {apply.isPending ? labels.submittingLabel : labels.submitLabel}
          </Button>
        </form>
      )}
    </InnerGuideContent>
  );
}
