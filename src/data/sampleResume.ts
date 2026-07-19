import type { ResumeData } from '@/types/resume';
import { generateId } from '@/utils/id';

export const defaultSections = () => [
  { id: 'personal', type: 'personal' as const, title: 'Personal Information', visible: true, collapsed: false },
  { id: 'summary', type: 'summary' as const, title: 'Professional Summary', visible: true, collapsed: false },
  { id: 'experience', type: 'experience' as const, title: 'Work Experience', visible: true, collapsed: false },
  { id: 'education', type: 'education' as const, title: 'Education', visible: true, collapsed: false },
  { id: 'skills', type: 'skills' as const, title: 'Skills', visible: true, collapsed: false },
  { id: 'projects', type: 'projects' as const, title: 'Projects', visible: true, collapsed: false },
  { id: 'certifications', type: 'certifications' as const, title: 'Certifications', visible: true, collapsed: true },
  { id: 'languages', type: 'languages' as const, title: 'Languages', visible: true, collapsed: true },
  { id: 'references', type: 'references' as const, title: 'References', visible: false, collapsed: true },
];

export function createEmptyResume(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}

export function createSampleResume(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: 'Ava Sterling',
      jobTitle: 'Senior Product Designer',
      email: 'ava.sterling@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      website: 'avasterling.design',
      linkedin: 'linkedin.com/in/avasterling',
      github: 'github.com/avasterling',
    },
    summary:
      'Product designer with 8+ years of experience crafting delightful, human-centered digital experiences for high-growth startups. Skilled in design systems, user research, and cross-functional leadership. Passionate about building products that balance business goals with genuine user needs.',
    experience: [
      {
        id: generateId(),
        company: 'Nimbus Technologies',
        position: 'Senior Product Designer',
        location: 'San Francisco, CA',
        startDate: '2021-03',
        endDate: '',
        current: true,
        description:
          'Led end-to-end design for the core SaaS platform used by 200K+ monthly users.\nBuilt and maintained a scalable design system adopted across 6 product teams.\nMentored 3 junior designers and ran weekly critique sessions.',
      },
      {
        id: generateId(),
        company: 'Brightloop Inc.',
        position: 'Product Designer',
        location: 'Remote',
        startDate: '2018-06',
        endDate: '2021-02',
        current: false,
        description:
          'Designed and shipped 15+ features from concept to launch.\nPartnered with PM and engineering to define product roadmap.\nImproved onboarding completion rate by 34% through UX research.',
      },
    ],
    education: [
      {
        id: generateId(),
        school: 'California College of the Arts',
        degree: 'B.F.A.',
        field: 'Interaction Design',
        year: '2017',
        location: 'San Francisco, CA',
        description: 'Graduated with honors. Focused on human-computer interaction and visual design.',
      },
    ],
    skills: [
      { id: generateId(), name: 'Figma', level: 95 },
      { id: generateId(), name: 'Design Systems', level: 90 },
      { id: generateId(), name: 'User Research', level: 85 },
      { id: generateId(), name: 'Prototyping', level: 88 },
      { id: generateId(), name: 'HTML/CSS', level: 70 },
      { id: generateId(), name: 'Design Leadership', level: 80 },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Aurora Design System',
        description: 'Open-source component library used by 40+ internal teams, cutting design-to-dev handoff time by 50%.',
        link: 'aurora-ds.dev',
        tech: 'Figma, React, Storybook',
      },
      {
        id: generateId(),
        name: 'Wayfinder App Redesign',
        description: 'Complete redesign of navigation app resulting in a 22% increase in daily active users.',
        link: 'behance.net/wayfinder',
        tech: 'Figma, Principle',
      },
    ],
    certifications: [
      { id: generateId(), name: 'Certified UX Design Professional', issuer: 'Google', date: '2022' },
      { id: generateId(), name: 'Design Leadership Certificate', issuer: 'IDEO U', date: '2020' },
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'Spanish', proficiency: 'Professional' },
    ],
    references: [
      { id: generateId(), name: 'James Park', company: 'Nimbus Technologies', phone: '+1 (555) 987-6543', email: 'james.park@email.com' },
    ],
    customSections: [],
    sections: defaultSections(),
  };
}
