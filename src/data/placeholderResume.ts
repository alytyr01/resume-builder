import type { ResumeData } from '@/types/resume';
import { generateId } from '@/utils/id';
import { defaultSections } from './sampleResume';

const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Quinn', 'Avery', 'Blake', 'Cameron', 'Dakota', 'Emerson', 'Finley', 'Harper', 'Jade'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson'];
const jobTitles = ['Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst', 'Marketing Lead', 'Project Coordinator', 'Business Analyst', 'Graphic Designer', 'Sales Manager', 'Operations Lead'];
const companies = ['TechCorp', 'Innovate Inc', 'DataFlow', 'CloudBase', 'NexGen', 'AlphaWorks', 'BrightPath', 'CoreSystems', 'FusionLab', 'Pinnacle'];
const schools = ['State University', 'Tech Institute', 'College of Design', 'University of Science', 'Metro College', 'Pacific University', 'Northern College', 'East State University'];
const degrees = ['B.S.', 'B.A.', 'M.S.', 'M.B.A.', 'Ph.D.', 'B.F.A.'];
const fields = ['Computer Science', 'Business Administration', 'Graphic Design', 'Data Science', 'Marketing', 'Engineering', 'Finance', 'Psychology'];
const skillNames = ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'TypeScript', 'AWS', 'Docker', 'Figma', 'Photoshop', 'Excel', 'Tableau', 'Git', 'Linux', 'MongoDB'];
const locations = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Chicago, IL', 'Boston, MA', 'Denver, CO', 'Portland, OR'];

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor',
  'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam',
  'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
  'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa'
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLoremSentence(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(randomItem(loremWords));
  }
  return words.join(' ') + '.';
}

function generateLoremParagraph(sentenceCount: number): string {
  const sentences: string[] = [];
  for (let i = 0; i < sentenceCount; i++) {
    const wordCount = randomInt(6, 14);
    const sentence = generateLoremSentence(wordCount);
    sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1));
  }
  return sentences.join(' ');
}

export function createPlaceholderResume(): ResumeData {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const jobTitle = randomItem(jobTitles);
  const company = randomItem(companies);
  const school = randomItem(schools);
  const degree = randomItem(degrees);
  const field = randomItem(fields);
  const location = randomItem(locations);

  const skillCount = randomInt(4, 7);
  const shuffledSkills = [...skillNames].sort(() => Math.random() - 0.5).slice(0, skillCount);

  return {
    id: generateId(),
    personal: {
      fullName: `${firstName} ${lastName}`,
      jobTitle: jobTitle,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `+1 (${randomInt(200, 999)}) ${randomInt(100, 999)}-${randomInt(1000, 9999)}`,
      location: location,
      website: `${firstName.toLowerCase()}${lastName.toLowerCase()}.dev`,
      linkedin: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      github: Math.random() > 0.3 ? `github.com/${firstName.toLowerCase()}${lastName.toLowerCase()}` : '',
    },
    summary: generateLoremParagraph(randomInt(2, 3)),
    experience: [
      {
        id: generateId(),
        company: company,
        position: jobTitle,
        location: location,
        startDate: `${randomInt(2018, 2022)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
        endDate: '',
        current: true,
        description: generateLoremParagraph(randomInt(2, 3)),
      },
      {
        id: generateId(),
        company: randomItem(companies.filter(c => c !== company)),
        position: randomItem(jobTitles.filter(j => j !== jobTitle)),
        location: randomItem(locations.filter(l => l !== location)),
        startDate: `${randomInt(2015, 2019)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
        endDate: `${randomInt(2019, 2022)}-${String(randomInt(1, 12)).padStart(2, '0')}`,
        current: false,
        description: generateLoremParagraph(randomInt(1, 2)),
      },
    ],
    education: [
      {
        id: generateId(),
        school: school,
        degree: degree,
        field: field,
        year: String(randomInt(2014, 2019)),
        location: randomItem(locations),
        description: generateLoremSentence(randomInt(6, 10)),
      },
    ],
    skills: shuffledSkills.map((name) => ({
      id: generateId(),
      name,
      level: randomInt(65, 98),
    })),
    projects: [
      {
        id: generateId(),
        name: `${randomItem(['Project', 'Platform', 'System', 'App', 'Tool', 'Framework'])} ${randomItem(['Alpha', 'Beta', 'Core', 'Nexus', 'Pulse', 'Flow', 'Spark', 'Vertex'])}`,
        description: generateLoremSentence(randomInt(8, 14)),
        link: Math.random() > 0.5 ? `${firstName.toLowerCase()}.github.io/${randomItem(['project', 'app', 'tool'])}` : '',
        tech: `${randomItem(skillNames)}, ${randomItem(skillNames)}, ${randomItem(skillNames)}`,
      },
    ],
    certifications: Math.random() > 0.4 ? [
      {
        id: generateId(),
        name: `Certified ${randomItem(['Professional', 'Expert', 'Specialist', 'Associate'])} ${randomItem(['Developer', 'Analyst', 'Designer', 'Engineer'])}`,
        issuer: randomItem(['Google', 'AWS', 'Microsoft', 'Adobe', 'Cisco']),
        date: String(randomInt(2020, 2024)),
      },
    ] : [],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      ...(Math.random() > 0.5 ? [{ id: generateId(), name: randomItem(['Spanish', 'French', 'German', 'Mandarin', 'Japanese']), proficiency: randomItem(['Professional', 'Conversational', 'Intermediate']) }] : []),
    ],
    references: [],
    customSections: [],
    sections: defaultSections(),
  };
}