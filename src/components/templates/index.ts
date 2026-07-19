import { PremiumTemplate } from './PremiumTemplate';
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
  return templates[id] || PremiumTemplate;
}

export const templateInfo: { id: TemplateId; name: string; description: string }[] = [
  { id: 'modern', name: 'Premium', description: 'Minimal, elegant, ATS-friendly design' },
  { id: 'minimal', name: 'Minimal', description: 'Same premium foundation' },
  { id: 'professional', name: 'Professional', description: 'Same premium foundation' },
  { id: 'ats', name: 'ATS', description: 'Same premium foundation' },
  { id: 'creative', name: 'Creative', description: 'Same premium foundation' },
];

export { PremiumTemplate };