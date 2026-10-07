import { useMutation } from '@tanstack/react-query';
import { jobsService } from '@/services/jobs.service';
import type {
  ApplicationRequest,
  ApplicationResponse,
  JobsApiError,
} from '@/lib/types';

/** Upload a résumé to the Job Portal; resolves to `{ url }` for the application. */
export function useUploadResume() {
  return useMutation<{ url: string }, JobsApiError, File>({
    mutationFn: file => jobsService.uploadResume(file),
  });
}

/** Submit an application to one job (by code or id). */
export function useApplyToJob(jobIdentifier: string) {
  return useMutation<ApplicationResponse, JobsApiError, ApplicationRequest>({
    mutationFn: application => jobsService.apply(jobIdentifier, application),
  });
}
