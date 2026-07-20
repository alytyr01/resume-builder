export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  year: string;
  location: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  link: string;
  tech: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

export interface CustomEntryItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomEntryItem[];
}

export type SectionType =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'references'
  | 'custom';

export interface SectionMeta {
  id: string;
  type: SectionType;
  title: string;
  visible: boolean;
  collapsed: boolean;
}

export interface ResumeData {
  id: string;
  personal: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  references: ReferenceItem[];
  customSections: CustomSection[];
  sections: SectionMeta[];
}

export type TemplateId =
  | 'modern'
  | 'minimal'
  | 'professional'
  | 'ats'
  | 'creative'
  | 'premium';

export interface Customization {
  templateId: TemplateId;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: number; // base px
  lineSpacing: number; // multiplier
  sectionSpacing: number; // px
}
