import type { ResumeData, Customization } from '@/types/resume';

interface Props { resume: ResumeData; custom: Customization; }

export function MinimalTemplate({ resume, custom }: Props) {
  const { personal, summary, experience, education, skills, projects, certifications, languages, references, sections } = resume;
  const visibleSections = sections.filter((s) => s.visible);
  const pColor = custom.primaryColor;

  return (
    <div style={{ fontFamily: custom.fontFamily || 'Inter', fontSize: custom.fontSize, lineHeight: custom.lineSpacing, color: '#1e293b', padding: '40px 48px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: custom.sectionSpacing + 8, borderBottom: `1px solid ${pColor}30`, paddingBottom: 24 }}>
        <h1 style={{ fontSize: 26, fontWeight: 300, margin: 0, letterSpacing: 2, textTransform: 'uppercase', color: '#0f172a' }}>{personal.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: 14, color: '#64748b', margin: '6px 0 10px', letterSpacing: 1 }}>{personal.jobTitle || 'Job Title'}</p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 16px', fontSize: 11, color: '#94a3b8' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.website && <span>{personal.website}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
          {personal.github && <span>{personal.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {visibleSections.find((s) => s.id === 'summary') && summary && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0, fontStyle: 'italic' }}>{summary}</p>
        </div>
      )}

      {/* Experience */}
      {visibleSections.find((s) => s.id === 'experience') && experience.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: custom.fontSize }}>{exp.position}</strong>
                <span style={{ fontSize: 11, color: '#94a3b8' }}>{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 12, color: '#64748b', margin: '2px 0 4px' }}>{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
              <p style={{ fontSize: custom.fontSize - 1, color: '#475569', margin: 0, whiteSpace: 'pre-wrap' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {visibleSections.find((s) => s.id === 'education') && education.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Education</h2>
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
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px' }}>
            {skills.map((s) => <span key={s.id} style={{ fontSize: custom.fontSize - 1, color: '#475569' }}>{s.name}</span>)}
          </div>
        </div>
      )}

      {/* Projects */}
      {visibleSections.find((s) => s.id === 'projects') && projects.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Projects</h2>
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
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ fontSize: custom.fontSize - 1, marginBottom: 4 }}>{cert.name} — {cert.issuer} <span style={{ color: '#94a3b8' }}>({cert.date})</span></div>
          ))}
        </div>
      )}

      {/* Languages */}
      {visibleSections.find((s) => s.id === 'languages') && languages.length > 0 && (
        <div style={{ marginBottom: custom.sectionSpacing }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>Languages</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            {languages.map((l) => <span key={l.id} style={{ fontSize: custom.fontSize - 1 }}>{l.name} — {l.proficiency}</span>)}
          </div>
        </div>
      )}

      {/* References */}
      {visibleSections.find((s) => s.id === 'references') && references.length > 0 && (
        <div>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>References</h2>
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
            <h2 style={{ fontSize: 13, fontWeight: 600, color: pColor, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1.5 }}>{cs.title}</h2>
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
  );
}
