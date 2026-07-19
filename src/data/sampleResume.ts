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

export function createSampleResume2(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: 'Marcus Chen',
      jobTitle: 'Full-Stack Software Engineer',
      email: 'marcus.chen@email.com',
      phone: '+1 (555) 234-5678',
      location: 'Seattle, WA',
      website: 'marcuschen.dev',
      linkedin: 'linkedin.com/in/marcuschen',
      github: 'github.com/marcuschen',
    },
    summary:
      'Full-stack engineer with 6+ years of experience building scalable web applications and distributed systems. Proficient in React, Node.js, TypeScript, and cloud infrastructure. Passionate about clean code, performance optimization, and developer experience.',
    experience: [
      {
        id: generateId(),
        company: 'CloudScale Systems',
        position: 'Senior Software Engineer',
        location: 'Seattle, WA',
        startDate: '2022-01',
        endDate: '',
        current: true,
        description:
          'Architected and built microservices handling 10M+ daily requests.\nLed migration from monolith to microservices, reducing deployment time by 80%.\nMentored 4 junior engineers and established code review best practices.',
      },
      {
        id: generateId(),
        company: 'DataPulse Inc.',
        position: 'Software Engineer',
        location: 'Remote',
        startDate: '2019-03',
        endDate: '2021-12',
        current: false,
        description:
          'Built real-time data processing pipelines using Kafka and Spark.\nDeveloped RESTful APIs and GraphQL endpoints for internal tools.\nReduced API response times by 60% through query optimization.',
      },
    ],
    education: [
      {
        id: generateId(),
        school: 'University of Washington',
        degree: 'B.S.',
        field: 'Computer Science',
        year: '2018',
        location: 'Seattle, WA',
        description: 'Dean\'s List. Focus on distributed systems and algorithms.',
      },
    ],
    skills: [
      { id: generateId(), name: 'TypeScript', level: 95 },
      { id: generateId(), name: 'React', level: 92 },
      { id: generateId(), name: 'Node.js', level: 90 },
      { id: generateId(), name: 'Python', level: 80 },
      { id: generateId(), name: 'AWS', level: 78 },
      { id: generateId(), name: 'PostgreSQL', level: 85 },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Kafka Stream Processor',
        description: 'Open-source library for simplified Kafka stream processing with TypeScript support.',
        link: 'github.com/marcuschen/kstream',
        tech: 'TypeScript, Kafka, Docker',
      },
    ],
    certifications: [
      { id: generateId(), name: 'AWS Solutions Architect', issuer: 'Amazon', date: '2023' },
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'Mandarin', proficiency: 'Native' },
    ],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}

export function createSampleResume3(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: 'Sophia Patel',
      jobTitle: 'Marketing Director',
      email: 'sophia.patel@email.com',
      phone: '+1 (555) 345-6789',
      location: 'New York, NY',
      website: 'sophiapatel.co',
      linkedin: 'linkedin.com/in/sophiapatel',
      github: '',
    },
    summary:
      'Results-driven marketing leader with 10+ years of experience driving brand growth and demand generation for B2B SaaS companies. Expert in data-driven marketing strategies, content marketing, and building high-performing teams. Proven track record of increasing pipeline by 3x.',
    experience: [
      {
        id: generateId(),
        company: 'GrowthWave Technologies',
        position: 'Marketing Director',
        location: 'New York, NY',
        startDate: '2020-06',
        endDate: '',
        current: true,
        description:
          'Led 12-person marketing team across content, demand gen, and brand.\nIncreased qualified pipeline by 200% through account-based marketing.\nLaunched new brand identity resulting in 45% increase in brand recall.',
      },
      {
        id: generateId(),
        company: 'VentureScale',
        position: 'Senior Marketing Manager',
        location: 'New York, NY',
        startDate: '2017-04',
        endDate: '2020-05',
        current: false,
        description:
          'Built content marketing program from scratch generating 50K monthly visitors.\nManaged $2M annual marketing budget with 4x ROI.\nLed product launch campaigns generating $5M in first-year revenue.',
      },
    ],
    education: [
      {
        id: generateId(),
        school: 'NYU Stern School of Business',
        degree: 'MBA',
        field: 'Marketing',
        year: '2016',
        location: 'New York, NY',
        description: 'Marketing Association President. Focus on digital strategy and analytics.',
      },
    ],
    skills: [
      { id: generateId(), name: 'Content Strategy', level: 95 },
      { id: generateId(), name: 'Demand Generation', level: 92 },
      { id: generateId(), name: 'SEO/SEM', level: 88 },
      { id: generateId(), name: 'Analytics', level: 85 },
      { id: generateId(), name: 'Team Leadership', level: 90 },
      { id: generateId(), name: 'Brand Strategy', level: 88 },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Pipeline Accelerator Program',
        description: 'Designed and executed ABM program targeting Fortune 500 companies, resulting in $12M in new pipeline.',
        link: '',
        tech: 'HubSpot, Salesforce, 6sense',
      },
    ],
    certifications: [
      { id: generateId(), name: 'HubSpot Inbound Marketing', issuer: 'HubSpot', date: '2021' },
      { id: generateId(), name: 'Google Analytics Certified', issuer: 'Google', date: '2022' },
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'Hindi', proficiency: 'Professional' },
    ],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}

export function createSampleResume4(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: 'James Okafor',
      jobTitle: 'Data Scientist',
      email: 'james.okafor@email.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, TX',
      website: 'jamesokafor.ai',
      linkedin: 'linkedin.com/in/jamesokafor',
      github: 'github.com/jamesokafor',
    },
    summary:
      'Data scientist with 5+ years of experience building machine learning models and data pipelines. Skilled in Python, deep learning, and statistical analysis. Passionate about turning complex data into actionable business insights and driving data-informed decisions.',
    experience: [
      {
        id: generateId(),
        company: 'InsightAI Labs',
        position: 'Data Scientist',
        location: 'Austin, TX',
        startDate: '2021-08',
        endDate: '',
        current: true,
        description:
          'Developed NLP models for sentiment analysis achieving 94% accuracy.\nBuilt ML pipeline reducing model training time by 70%.\nPresented findings to C-suite, influencing product roadmap decisions.',
      },
      {
        id: generateId(),
        company: 'Quantify Analytics',
        position: 'Junior Data Scientist',
        location: 'Dallas, TX',
        startDate: '2019-01',
        endDate: '2021-07',
        current: false,
        description:
          'Created predictive models for customer churn with 88% precision.\nAutomated reporting dashboards saving 20 hours per week.\nDesigned A/B testing framework adopted company-wide.',
      },
    ],
    education: [
      {
        id: generateId(),
        school: 'University of Texas at Austin',
        degree: 'M.S.',
        field: 'Data Science',
        year: '2018',
        location: 'Austin, TX',
        description: 'Thesis on deep learning for natural language understanding. GPA: 3.9.',
      },
    ],
    skills: [
      { id: generateId(), name: 'Python', level: 95 },
      { id: generateId(), name: 'TensorFlow', level: 88 },
      { id: generateId(), name: 'SQL', level: 90 },
      { id: generateId(), name: 'Statistics', level: 85 },
      { id: generateId(), name: 'PyTorch', level: 80 },
      { id: generateId(), name: 'Spark', level: 75 },
    ],
    projects: [
      {
        id: generateId(),
        name: 'Sentiment Analysis Engine',
        description: 'Real-time sentiment analysis tool for social media monitoring used by 3 enterprise clients.',
        link: 'github.com/jamesokafor/sentiment-engine',
        tech: 'Python, TensorFlow, AWS',
      },
    ],
    certifications: [
      { id: generateId(), name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2022' },
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'French', proficiency: 'Professional' },
    ],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}

export function createSampleResume5(): ResumeData {
  return {
    id: generateId(),
    personal: {
      fullName: 'Emily Torres',
      jobTitle: 'HR Operations Manager',
      email: 'emily.torres@email.com',
      phone: '+1 (555) 567-8901',
      location: 'Chicago, IL',
      website: 'emilytorreshr.com',
      linkedin: 'linkedin.com/in/emilytorres',
      github: '',
    },
    summary:
      'HR operations professional with 7+ years of experience optimizing people operations and building inclusive workplace cultures. Expertise in HRIS implementation, employee engagement, compliance, and talent acquisition strategy. Certified SHRM-SCP with a track record of improving retention by 25%.',
    experience: [
      {
        id: generateId(),
        company: 'Meridian Health Systems',
        position: 'HR Operations Manager',
        location: 'Chicago, IL',
        startDate: '2020-03',
        endDate: '',
        current: true,
        description:
          'Led HRIS migration to Workday, improving data accuracy by 40%.\nRedesigned onboarding process reducing time-to-productivity by 30%.\nImplemented DEI initiatives increasing diverse hires by 35%.',
      },
      {
        id: generateId(),
        company: 'Pinnacle Financial Group',
        position: 'HR Generalist',
        location: 'Chicago, IL',
        startDate: '2017-06',
        endDate: '2020-02',
        current: false,
        description:
          'Managed full-cycle recruitment for 50+ positions annually.\nDeveloped employee engagement survey program with 92% participation.\nStreamlined benefits administration saving $200K annually.',
      },
    ],
    education: [
      {
        id: generateId(),
        school: 'Loyola University Chicago',
        degree: 'B.A.',
        field: 'Human Resources Management',
        year: '2016',
        location: 'Chicago, IL',
        description: 'Graduated cum laude. SHRM student chapter president.',
      },
    ],
    skills: [
      { id: generateId(), name: 'HRIS/Workday', level: 95 },
      { id: generateId(), name: 'Talent Acquisition', level: 90 },
      { id: generateId(), name: 'Employee Relations', level: 88 },
      { id: generateId(), name: 'Compliance', level: 85 },
      { id: generateId(), name: 'Data Analysis', level: 80 },
      { id: generateId(), name: 'Change Management', level: 82 },
    ],
    projects: [
      {
        id: generateId(),
        name: 'HR Digital Transformation',
        description: 'Led company-wide HR technology overhaul, digitizing all paper processes and reducing administrative overhead by 60%.',
        link: '',
        tech: 'Workday, DocuSign, Tableau',
      },
    ],
    certifications: [
      { id: generateId(), name: 'SHRM-SCP', issuer: 'SHRM', date: '2021' },
      { id: generateId(), name: 'Workday Pro', issuer: 'Workday', date: '2022' },
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'Spanish', proficiency: 'Professional' },
    ],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}
