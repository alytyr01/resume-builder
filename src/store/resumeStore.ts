import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  ResumeData,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  ReferenceItem,
  CustomSection,
  CustomEntryItem,
  SectionMeta,
  Customization,
} from '@/types/resume';
import { createSampleResume } from '@/data/sampleResume';
import { generateId } from '@/utils/id';

interface ResumeState {
  resume: ResumeData;
  customization: Customization;

  // whole resume
  setResume: (resume: ResumeData) => void;
  resetResume: () => void;

  // personal
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  updateSummary: (summary: string) => void;

  // experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  duplicateExperience: (id: string) => void;
  reorderExperience: (oldIndex: number, newIndex: number) => void;

  // education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  duplicateEducation: (id: string) => void;
  reorderEducation: (oldIndex: number, newIndex: number) => void;

  // skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (oldIndex: number, newIndex: number) => void;

  // projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  reorderProjects: (oldIndex: number, newIndex: number) => void;

  // certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;
  reorderCertifications: (oldIndex: number, newIndex: number) => void;

  // languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  reorderLanguages: (oldIndex: number, newIndex: number) => void;

  // references
  addReference: () => void;
  updateReference: (id: string, data: Partial<ReferenceItem>) => void;
  removeReference: (id: string) => void;
  reorderReferences: (oldIndex: number, newIndex: number) => void;

  // custom sections
  addCustomSection: () => void;
  updateCustomSectionTitle: (id: string, title: string) => void;
  removeCustomSection: (id: string) => void;
  addCustomEntry: (sectionId: string) => void;
  updateCustomEntry: (sectionId: string, entryId: string, data: Partial<CustomEntryItem>) => void;
  removeCustomEntry: (sectionId: string, entryId: string) => void;

  // section meta (order, visibility, collapse)
  toggleSectionVisibility: (id: string) => void;
  toggleSectionCollapse: (id: string) => void;
  reorderSections: (oldIndex: number, newIndex: number) => void;
  renameSection: (id: string, title: string) => void;

  // customization
  updateCustomization: (data: Partial<Customization>) => void;

  // import/export
  importResume: (data: ResumeData) => void;
}

const defaultCustomization: Customization = {
  templateId: 'modern',
  primaryColor: '#4f46e5',
  accentColor: '#4f46e5',
  fontFamily: 'Inter',
  fontSize: 14,
  lineSpacing: 1.5,
  sectionSpacing: 20,
};

function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: createSampleResume(),
      customization: defaultCustomization,

      setResume: (resume) => set({ resume }),
      resetResume: () => set({ resume: createSampleResume() }),

      updatePersonal: (data) =>
        set((state) => ({ resume: { ...state.resume, personal: { ...state.resume.personal, ...data } } })),

      updateSummary: (summary) => set((state) => ({ resume: { ...state.resume, summary } })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: generateId(),
                company: '',
                position: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: '',
              },
            ],
          },
        })),
      updateExperience: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) => (e.id === id ? { ...e, ...data } : e)),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({ resume: { ...state.resume, experience: state.resume.experience.filter((e) => e.id !== id) } })),
      duplicateExperience: (id) =>
        set((state) => {
          const item = state.resume.experience.find((e) => e.id === id);
          if (!item) return state;
          const idx = state.resume.experience.findIndex((e) => e.id === id);
          const newList = [...state.resume.experience];
          newList.splice(idx + 1, 0, { ...item, id: generateId() });
          return { resume: { ...state.resume, experience: newList } };
        }),
      reorderExperience: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, experience: arrayMove(state.resume.experience, oldIndex, newIndex) } })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              { id: generateId(), school: '', degree: '', field: '', year: '', location: '', description: '' },
            ],
          },
        })),
      updateEducation: (id, data) =>
        set((state) => ({
          resume: { ...state.resume, education: state.resume.education.map((e) => (e.id === id ? { ...e, ...data } : e)) },
        })),
      removeEducation: (id) =>
        set((state) => ({ resume: { ...state.resume, education: state.resume.education.filter((e) => e.id !== id) } })),
      duplicateEducation: (id) =>
        set((state) => {
          const item = state.resume.education.find((e) => e.id === id);
          if (!item) return state;
          const idx = state.resume.education.findIndex((e) => e.id === id);
          const newList = [...state.resume.education];
          newList.splice(idx + 1, 0, { ...item, id: generateId() });
          return { resume: { ...state.resume, education: newList } };
        }),
      reorderEducation: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, education: arrayMove(state.resume.education, oldIndex, newIndex) } })),

      addSkill: () =>
        set((state) => ({
          resume: { ...state.resume, skills: [...state.resume.skills, { id: generateId(), name: '', level: 75 }] },
        })),
      updateSkill: (id, data) =>
        set((state) => ({
          resume: { ...state.resume, skills: state.resume.skills.map((s) => (s.id === id ? { ...s, ...data } : s)) },
        })),
      removeSkill: (id) =>
        set((state) => ({ resume: { ...state.resume, skills: state.resume.skills.filter((s) => s.id !== id) } })),
      reorderSkills: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, skills: arrayMove(state.resume.skills, oldIndex, newIndex) } })),

      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [...state.resume.projects, { id: generateId(), name: '', description: '', link: '', tech: '' }],
          },
        })),
      updateProject: (id, data) =>
        set((state) => ({
          resume: { ...state.resume, projects: state.resume.projects.map((p) => (p.id === id ? { ...p, ...data } : p)) },
        })),
      removeProject: (id) =>
        set((state) => ({ resume: { ...state.resume, projects: state.resume.projects.filter((p) => p.id !== id) } })),
      duplicateProject: (id) =>
        set((state) => {
          const item = state.resume.projects.find((p) => p.id === id);
          if (!item) return state;
          const idx = state.resume.projects.findIndex((p) => p.id === id);
          const newList = [...state.resume.projects];
          newList.splice(idx + 1, 0, { ...item, id: generateId() });
          return { resume: { ...state.resume, projects: newList } };
        }),
      reorderProjects: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, projects: arrayMove(state.resume.projects, oldIndex, newIndex) } })),

      addCertification: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [...state.resume.certifications, { id: generateId(), name: '', issuer: '', date: '' }],
          },
        })),
      updateCertification: (id, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.map((c) => (c.id === id ? { ...c, ...data } : c)),
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          resume: { ...state.resume, certifications: state.resume.certifications.filter((c) => c.id !== id) },
        })),
      reorderCertifications: (oldIndex, newIndex) =>
        set((state) => ({
          resume: { ...state.resume, certifications: arrayMove(state.resume.certifications, oldIndex, newIndex) },
        })),

      addLanguage: () =>
        set((state) => ({
          resume: { ...state.resume, languages: [...state.resume.languages, { id: generateId(), name: '', proficiency: 'Conversational' }] },
        })),
      updateLanguage: (id, data) =>
        set((state) => ({
          resume: { ...state.resume, languages: state.resume.languages.map((l) => (l.id === id ? { ...l, ...data } : l)) },
        })),
      removeLanguage: (id) =>
        set((state) => ({ resume: { ...state.resume, languages: state.resume.languages.filter((l) => l.id !== id) } })),
      reorderLanguages: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, languages: arrayMove(state.resume.languages, oldIndex, newIndex) } })),

      addReference: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            references: [...state.resume.references, { id: generateId(), name: '', company: '', phone: '', email: '' }],
          },
        })),
      updateReference: (id, data) =>
        set((state) => ({
          resume: { ...state.resume, references: state.resume.references.map((r) => (r.id === id ? { ...r, ...data } : r)) },
        })),
      removeReference: (id) =>
        set((state) => ({ resume: { ...state.resume, references: state.resume.references.filter((r) => r.id !== id) } })),
      reorderReferences: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, references: arrayMove(state.resume.references, oldIndex, newIndex) } })),

      addCustomSection: () =>
        set((state) => {
          const newSection: CustomSection = { id: generateId(), title: 'Custom Section', items: [] };
          const newMeta: SectionMeta = {
            id: newSection.id,
            type: 'custom',
            title: newSection.title,
            visible: true,
            collapsed: false,
          };
          return {
            resume: {
              ...state.resume,
              customSections: [...state.resume.customSections, newSection],
              sections: [...state.resume.sections, newMeta],
            },
          };
        }),
      updateCustomSectionTitle: (id, title) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((c) => (c.id === id ? { ...c, title } : c)),
            sections: state.resume.sections.map((s) => (s.id === id ? { ...s, title } : s)),
          },
        })),
      removeCustomSection: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.filter((c) => c.id !== id),
            sections: state.resume.sections.filter((s) => s.id !== id),
          },
        })),
      addCustomEntry: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((c) =>
              c.id === sectionId
                ? { ...c, items: [...c.items, { id: generateId(), title: '', subtitle: '', date: '', description: '' }] }
                : c
            ),
          },
        })),
      updateCustomEntry: (sectionId, entryId, data) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((c) =>
              c.id === sectionId
                ? { ...c, items: c.items.map((it) => (it.id === entryId ? { ...it, ...data } : it)) }
                : c
            ),
          },
        })),
      removeCustomEntry: (sectionId, entryId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((c) =>
              c.id === sectionId ? { ...c, items: c.items.filter((it) => it.id !== entryId) } : c
            ),
          },
        })),

      toggleSectionVisibility: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)),
          },
        })),
      toggleSectionCollapse: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: state.resume.sections.map((s) => (s.id === id ? { ...s, collapsed: !s.collapsed } : s)),
          },
        })),
      reorderSections: (oldIndex, newIndex) =>
        set((state) => ({ resume: { ...state.resume, sections: arrayMove(state.resume.sections, oldIndex, newIndex) } })),
      renameSection: (id, title) =>
        set((state) => ({
          resume: { ...state.resume, sections: state.resume.sections.map((s) => (s.id === id ? { ...s, title } : s)) },
        })),

      updateCustomization: (data) => set((state) => ({ customization: { ...state.customization, ...data } })),

      importResume: (data) => set({ resume: data }),
    }),
    {
      name: 'resume-builder-data',
      merge: (persisted: unknown, current: ResumeState) => {
        const saved = persisted as Partial<ResumeState> | undefined;
        if (!saved?.resume) return current;
        // Ensure all default sections exist (migration for old saved data)
        const defaultSectionIds = ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'references'];
        const existingIds = new Set(saved.resume.sections?.map((s: SectionMeta) => s.id) || []);
        const missingSections = defaultSectionIds
          .filter((id) => !existingIds.has(id))
          .map((id) => ({
            id,
            type: id as SectionMeta['type'],
            title: id === 'personal' ? 'Personal Information'
                 : id === 'summary' ? 'Professional Summary'
                 : id === 'experience' ? 'Work Experience'
                 : id === 'education' ? 'Education'
                 : id === 'skills' ? 'Skills'
                 : id === 'projects' ? 'Projects'
                 : id === 'certifications' ? 'Certifications'
                 : id === 'languages' ? 'Languages'
                 : 'References',
            visible: true,
            collapsed: id === 'certifications' || id === 'languages' || id === 'references',
          }));
        // Build sections in correct order: insert missing sections at their proper positions
        const savedSections = saved.resume.sections || [];
        const resultSections: SectionMeta[] = [];
        for (const defaultId of defaultSectionIds) {
          const existing = savedSections.find((s: SectionMeta) => s.id === defaultId);
          if (existing) {
            resultSections.push(existing);
          } else {
            const missing = missingSections.find((s) => s.id === defaultId);
            if (missing) resultSections.push(missing);
          }
        }
        // Append any custom sections at the end
        for (const s of savedSections) {
          if (!defaultSectionIds.includes(s.id) && s.type === 'custom') {
            resultSections.push(s);
          }
        }
        return {
          ...current,
          ...saved,
          resume: {
            ...current.resume,
            ...saved.resume,
            sections: resultSections,
          },
        };
      },
    }
  )
);
