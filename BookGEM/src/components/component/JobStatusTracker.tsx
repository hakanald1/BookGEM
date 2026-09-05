import { useJobStatus } from '../../lib/api/hooks/useJobs';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface JobStatusTrackerProps {
  jobId: string;
}

export function JobStatusTracker({ jobId }: JobStatusTrackerProps) {
  const { data: job, isLoading, isError } = useJobStatus(jobId);

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-muted border text-sm">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>Initializing job tracking for <code className="font-mono text-xs">{jobId}</code>...</span>
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
        <AlertCircle className="h-4 w-4" />
        <span>Failed to retrieve status for job <code className="font-mono text-xs">{jobId}</code></span>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl border bg-card space-y-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {job.status === 'queued' || job.status === 'running' ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#CBA328]" />
          ) : job.status === 'done' ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-500" />
          )}
          <span className="font-semibold text-sm capitalize">
            {job.kind} Job: <span className="font-mono text-xs text-muted-foreground">{job.jobId}</span>
          </span>
        </div>
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize ${
          job.status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
          job.status === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
        }`}>
          {job.status}
        </span>
      </div>

      {(job.status === 'queued' || job.status === 'running') && (
        <p className="text-xs text-muted-foreground">
          Generation in progress (Attempts: {job.attempts}). Polling API automatically...
        </p>
      )}

      {job.status === 'done' && job.cookbook && (
        <div className="pt-2 border-t text-sm space-y-1">
          <p className="font-medium text-foreground">Cookbook Ready: {job.cookbook.title}</p>
          <p className="text-xs text-muted-foreground">{job.cookbook.recipes?.length || 0} recipes generated</p>
        </div>
      )}

      {job.status === 'done' && job.recipe && (
        <div className="pt-2 border-t text-sm space-y-1">
          <p className="font-medium text-foreground">Recipe Ready: {job.recipe.title}</p>
          <p className="text-xs text-muted-foreground">{job.recipe.description}</p>
        </div>
      )}

      {job.status === 'error' && (
        <div className="pt-2 border-t text-xs text-red-500">
          <p className="font-medium">Error: {job.error || 'Job failed'}</p>
          {job.message && <p>{job.message}</p>}
        </div>
      )}
    </div>
  );
}
