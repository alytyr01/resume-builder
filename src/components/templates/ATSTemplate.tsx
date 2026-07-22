import type { ResumeData, Customization } from '@/types/resume';

interface Props { resume: ResumeData; custom: Customization; }

export function ATSTemplate({ resume, custom }: Props) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, sections } = resume;
  const visibleSections = sections.filter((s) => s.visible);
  const pColor = custom.primaryColor;

  const lineStyle = { border: 'none', borderTop: `1px solid ${pColor}40`, margin: '8px 0' };

  return (
    <div style={{ fontFamily: custom.fontFamily || 'Arial', fontSize: custom.fontSize, lineHeight: custom.lineSpacing, color: '#1e293b', padding: '40px 48px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: '#0f172a' }}>{personal.fullName || 'Your Name'}</h1>
      <p style={{ fontSize: 13, color: '#475569', margin: '4px 0 6px' }}>{personal.jobTitle || 'Job Title'}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px 12px', fontSize: 11, color: '#64748b' }}>
        {[personal.email, personal.phone, personal.location, personal.website, personal.linkedin, personal.github].filter(Boolean).map((item, i, arr) => (
          <span key={i}>{item}{i < arr.length - 1 ? ' |' : ''}</span>
        ))}
      </div>
      <hr style={lineStyle} />

      {visibleSections.find((s) => s.id === 'summary') && summary && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Summary</h2>
          <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0 }}>{summary}</p>
        </div>
      )}

      {visibleSections.find((s) => s.id === 'experience') && experience.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 8px', textTransform: 'uppercase' }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <strong>{exp.position}</strong> &mdash; {exp.company}<br />
              <span style={{ fontSize: 11, color: '#94a3b8' }}>{exp.startDate} &mdash; {exp.current ? 'Present' : exp.endDate}{exp.location ? ` | ${exp.location}` : ''}</span>
              <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: '4px 0 0', whiteSpace: 'pre-wrap' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {visibleSections.find((s) => s.id === 'education') && education.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id}>{edu.school} &mdash; {edu.degree} in {edu.field} ({edu.year})</div>
          ))}
        </div>
      )}

      {visibleSections.find((s) => s.id === 'skills') && skills.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Skills</h2>
          <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0 }}>{skills.map((s) => s.name).join(', ')}</p>
        </div>
      )}

      {visibleSections.find((s) => s.id === 'projects') && projects.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: 8 }}>
              <strong>{proj.name}</strong>{proj.tech ? ` \u2014 ${proj.tech}` : ''}
              <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: '2px 0 0' }}>{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {visibleSections.find((s) => s.id === 'certifications') && certifications.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Certifications</h2>
          {certifications.map((cert) => <div key={cert.id} style={{ fontSize: custom.fontSize - 1 }}>{cert.name} &mdash; {cert.issuer} ({cert.date})</div>)}
        </div>
      )}

      {visibleSections.find((s) => s.id === 'languages') && languages.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>Languages</h2>
          <div style={{ fontSize: custom.fontSize - 1 }}>{languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</div>
        </div>
      )}

      {visibleSections.find((s) => s.id === 'references') && references.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>References</h2>
          <div style={{ fontSize: custom.fontSize - 1 }}>Available upon request</div>
        </div>
      )}

      {resume.customSections.map((cs) => {
        const meta = sections.find((s) => s.id === cs.id);
        if (!meta?.visible) return null;
        return (
          <div key={cs.id} style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 6px', textTransform: 'uppercase' }}>{cs.title}</h2>
            {cs.items.map((item) => <div key={item.id} style={{ fontSize: custom.fontSize - 1, marginBottom: 4 }}>{item.title}{item.subtitle ? ` \u2014 ${item.subtitle}` : ''}</div>)}
          </div>
        );
      })}
    </div>
  );
}
