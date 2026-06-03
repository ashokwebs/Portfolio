import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { skills, projects } from '../data/content';

export default function SkillsPage() {
  const containerRef = useRef(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Compute related projects for the active skill
  const relatedProjects = useMemo(() => {
    if (!activeSkill) return [];
    return projects.filter(p => 
      p.stack.some(tech => tech.toLowerCase() === activeSkill.toLowerCase())
    );
  }, [activeSkill]);

  // Compute mock experience years based on skill name length/random for visual effect
  const getExperienceLevel = (skillName) => {
    const hash = skillName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const years = (hash % 5) + 2;
    return `${years}+ Years`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page" ref={containerRef}>
      <div className="section-header reveal-item">
        <div className="section-num">03</div>
        <div className="section-title">Neural Node Ecosystem</div>
        <div className="section-line"></div>
      </div>

      <p className="reveal-item" style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '40px' }}>
        Interactive technical architecture map. Hover over any node to decrypt operational experience and cross-reference deployment history.
      </p>

      <div className="reveal-item" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '24px', 
        height: 'auto',
        minHeight: '500px'
      }}>
        {/* Left: The Neural Map */}
        <div style={{
          background: 'rgba(8, 8, 16, 0.6)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '24px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          position: 'relative'
        }}>
          {/* Background grid */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            pointerEvents: 'none'
          }} />

          {skills.map((category, i) => (
            <div key={i} style={{ position: 'relative', zIndex: 1 }}>
              <h3 style={{ 
                fontSize: '12px', 
                fontFamily: 'var(--font-mono)', 
                color: 'var(--text-secondary)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ width: '8px', height: '1px', background: 'var(--border-subtle)' }} />
                CLUSTER // {category.title}
                <span style={{ flex: 1, height: '1px', background: 'var(--border-subtle)' }} />
              </h3>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', paddingLeft: '16px' }}>
                {category.items.map((item, j) => (
                  <div 
                    key={j} 
                    onMouseEnter={() => setActiveSkill(item)}
                    style={{
                      padding: '8px 16px',
                      fontSize: '13px',
                      fontFamily: 'var(--font-mono)',
                      color: activeSkill === item ? 'var(--text-primary)' : 'var(--text-secondary)',
                      background: activeSkill === item ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${activeSkill === item ? 'var(--accent)' : 'rgba(255,255,255,0.05)'}`,
                      borderRadius: '4px',
                      cursor: 'crosshair',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      boxShadow: activeSkill === item ? '0 0 15px rgba(0,255,136,0.2)' : 'none'
                    }}
                  >
                    {activeSkill === item && (
                      <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', animation: 'pulse-dot 1s infinite' }} />
                    )}
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Context Panel */}
        <div style={{
          background: 'rgba(5, 5, 8, 0.9)',
          border: '1px solid var(--accent-dim)',
          borderRadius: '12px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 20px rgba(0,255,136,0.02)',
          transition: 'all 0.3s ease',
          opacity: activeSkill ? 1 : 0.5
        }}>
          {!activeSkill ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', color: 'var(--text-ghost)', fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '24px', animation: 'blink 2s infinite' }}>[?]</span>
              AWAITING NODE SELECTION...<br/>Hover over a skill to decrypt operational data.
            </div>
          ) : (
            <div style={{ animation: 'fade-in 0.3s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{activeSkill}</h2>
              </div>
              
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent-secondary)', letterSpacing: '0.1em', marginBottom: '24px' }}>
                ESTIMATED OPERATIONAL DEPTH: {getExperienceLevel(activeSkill)}
              </div>

              <div style={{ height: '1px', background: 'var(--border-subtle)', marginBottom: '24px' }} />

              <h3 style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
                Deployment History ({relatedProjects.length})
              </h3>

              {relatedProjects.length === 0 ? (
                <div style={{ fontSize: '13px', color: 'var(--text-ghost)', fontStyle: 'italic' }}>
                  No public deployments explicitly tagged. Core utility component.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '300px', overflowY: 'auto', paddingRight: '8px' }}>
                  {relatedProjects.map((p, idx) => (
                    <div key={idx} style={{ 
                      background: 'rgba(255,255,255,0.03)', 
                      border: '1px solid rgba(255,255,255,0.05)', 
                      padding: '12px', 
                      borderRadius: '6px' 
                    }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {p.desc}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
