import { useResumeStore } from '@/store/resumeStore';
import { Textarea } from '@/components/ui';

export function SummaryForm() {
  const summary = useResumeStore((s) => s.resume.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  return (
    <Textarea
      label="Professional Summary"
      value={summary}
      onChange={(e) => updateSummary(e.target.value)}
      placeholder="Write a brief professional summary highlighting your key qualifications and career objectives..."
      rows={4}
    />
  );
}
