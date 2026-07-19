import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ATSTemplate } from './ATSTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import type { ResumeData, Customization, TemplateId } from '@/types/resume';

const templates: Record<TemplateId, React.FC<{ resume: ResumeData; custom: Customization }>> = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  professional: ProfessionalTemplate,
  ats: ATSTemplate,
  creative: CreativeTemplate,
};

export function getTemplate(id: TemplateId) {
  return templates[id] || ModernTemplate;
}

export const templateInfo: { id: TemplateId; name: string; description: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary with a bold color header' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, elegant, and distraction-free' },
  { id: 'professional', name: 'Professional', description: 'Traditional two-column layout for corporate roles' },
  { id: 'ats', name: 'ATS Friendly', description: 'Optimized for applicant tracking systems' },
  { id: 'creative', name: 'Creative', description: 'Bold sidebar design for creative roles' },
];

export { ModernTemplate, MinimalTemplate, ProfessionalTemplate, ATSTemplate, CreativeTemplate };
