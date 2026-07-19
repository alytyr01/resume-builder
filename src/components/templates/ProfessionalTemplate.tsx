import type { ResumeData, Customization } from '@/types/resume';

interface Props { resume: ResumeData; custom: Customization; }

export function ProfessionalTemplate({ resume, custom }: Props) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, sections } = resume;
  const visibleSections = sections.filter((s) => s.visible);
  const pColor = custom.primaryColor;

  return (
    <div style={{ fontFamily: custom.fontFamily || 'Inter', fontSize: custom.fontSize, lineHeight: custom.lineSpacing, color: '#1e293b' }}>
      {/* Two-column header */}
      <div style={{ display: 'flex', padding: '32px 36px', borderBottom: `3px solid ${pColor}`, marginBottom: custom.sectionSpacing }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: '#0f172a' }}>{personal.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: 14, color: '#64748b', margin: '4px 0 0' }}>{personal.jobTitle || 'Job Title'}</p>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: '#64748b', lineHeight: 1.8 }}>
          {personal.email && <div>{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location && <div>{personal.location}</div>}
          {personal.website && <div>{personal.website}</div>}
          {personal.linkedin && <div>{personal.linkedin}</div>}
          {personal.github && <div>{personal.github}</div>}
        </div>
      </div>

      <div style={{ padding: '0 36px 36px' }}>
        {/* Summary */}
        {visibleSections.find((s) => s.id === 'summary') && summary && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Professional Summary</h2>
            <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        {visibleSections.find((s) => s.id === 'experience') && experience.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 10px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Experience</h2>
            {experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div><strong>{exp.position}</strong><span style={{ color: '#64748b' }}> | {exp.company}</span></div>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                {exp.location && <p style={{ fontSize: 11, color: '#94a3b8', margin: '2px 0 4px' }}>{exp.location}</p>}
                <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {visibleSections.find((s) => s.id === 'education') && education.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 10px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Education</h2>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{edu.school}</strong>
                  <span style={{ fontSize: 11, color: '#94a3b8' }}>{edu.year}</span>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{edu.degree} in {edu.field}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {visibleSections.find((s) => s.id === 'skills') && skills.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {skills.map((s) => (
                <span key={s.id} style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: 4, fontSize: custom.fontSize - 1, color: '#334155' }}>{s.name}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {visibleSections.find((s) => s.id === 'projects') && projects.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Projects</h2>
            {projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: 8 }}>
                <strong>{proj.name}</strong>
                {proj.tech && <span style={{ fontSize: 12, color: '#94a3b8' }}> — {proj.tech}</span>}
                <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: '2px 0 0' }}>{proj.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {visibleSections.find((s) => s.id === 'certifications') && certifications.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ fontSize: custom.fontSize - 1, marginBottom: 4 }}>{cert.name} — {cert.issuer} ({cert.date})</div>
            ))}
          </div>
        )}

        {/* Languages */}
        {visibleSections.find((s) => s.id === 'languages') && languages.length > 0 && (
          <div style={{ marginBottom: custom.sectionSpacing }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>Languages</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {languages.map((l) => <span key={l.id} style={{ fontSize: custom.fontSize - 1 }}>{l.name} — {l.proficiency}</span>)}
            </div>
          </div>
        )}

        {/* References */}
        {visibleSections.find((s) => s.id === 'references') && references.length > 0 && (
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>References</h2>
            {references.map((ref) => (
              <div key={ref.id} style={{ fontSize: custom.fontSize - 1, marginBottom: 4 }}>{ref.name}{ref.company ? ` — ${ref.company}` : ''}</div>
            ))}
          </div>
        )}

        {/* Custom Sections */}
        {resume.customSections.map((cs) => {
          const meta = sections.find((s) => s.id === cs.id);
          if (!meta?.visible) return null;
          return (
            <div key={cs.id} style={{ marginBottom: custom.sectionSpacing }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: pColor, margin: '0 0 8px', borderBottom: `1px solid ${pColor}20`, paddingBottom: 4 }}>{cs.title}</h2>
              {cs.items.map((item) => (
                <div key={item.id} style={{ marginBottom: 6 }}>
                  <strong>{item.title}</strong>
                  {item.subtitle && <span style={{ color: '#64748b' }}> — {item.subtitle}</span>}
                  {item.description && <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: '2px 0 0' }}>{item.description}</p>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
