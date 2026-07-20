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
  premium: PremiumTemplate,
};

export function getTemplate(id: TemplateId) {
  return templates[id];
}

export const templateInfo: { id: TemplateId; name: string; description: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean, modern design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple, elegant layout' },
  { id: 'professional', name: 'Professional', description: 'Corporate, formal style' },
  { id: 'ats', name: 'ATS', description: 'Optimized for screening' },
  { id: 'creative', name: 'Creative', description: 'Bold, eye-catching look' },
  { id: 'premium', name: 'Premium', description: 'Most popular choice' },
];

export { PremiumTemplate };