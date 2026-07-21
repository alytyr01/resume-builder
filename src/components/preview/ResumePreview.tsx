import { useResumeStore } from '@/store/resumeStore';
import { getTemplate } from '@/components/templates';
import { cn } from '@/lib/utils';

interface ResumePreviewProps {
  className?: string;
}

export function ResumePreview({ className }: ResumePreviewProps) {
  const resume = useResumeStore((s) => s.resume);
  const customization = useResumeStore((s) => s.customization);
  const Template = getTemplate(customization.templateId);

  return (
    <div
      id="resume-preview-print"
      className={cn(
        'w-[210mm] bg-white shadow-lg',
        className
      )}
      style={{ minHeight: 297 }}
    >
      <Template resume={resume} custom={customization} />
    </div>
  );
}