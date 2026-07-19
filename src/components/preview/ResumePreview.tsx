import { useResumeStore } from '@/store/resumeStore';
import { getTemplate } from '@/components/templates';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  className?: string;
  isPrint?: boolean;
}

export function ResumePreview({ className, isPrint }: ResumePreviewProps) {
  const resume = useResumeStore((s) => s.resume);
  const customization = useResumeStore((s) => s.customization);
  const Template = getTemplate(customization.templateId);

  return (
    <div
      id={isPrint ? 'resume-preview-print' : undefined}
      className={cn(
        'w-[210mm] bg-white shadow-lg transition-all',
        isPrint ? '' : 'min-h-[297mm]',
        className
      )}
    >
      <Template resume={resume} custom={customization} />
    </div>
  );
}
