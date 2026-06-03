import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { personal, about } from '../data/content';

export default function IdentityPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page" ref={containerRef}>
      <div className="section-header reveal-item">
        <div className="section-num">01</div>
        <div className="section-title">Identity & Operating Protocol</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid-2 reveal-item" style={{ marginTop: '48px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
            System Architecture
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '15px' }}>
            <p>
              I am a <strong>Systems Architect & AI Builder</strong> operating at the intersection of complex scalable engineering and autonomous intelligence. My primary protocol is to architect deep-tech systems that bridge the gap between high-performance backends and sentient, context-aware artificial intelligence.
            </p>
            <p>
              My expertise spans across <strong>cryptographic systems, large-scale LLM orchestrations, distributed microservices, and immersive spatial web interfaces</strong>. I do not merely write code; I engineer environments. Every platform I construct is designed to be highly resilient, inherently autonomous, and visually cinematic.
            </p>
            <p>
              Over the last few years, I have systematically mapped out over 30+ complex technical architectures—from zero-knowledge blockchain environments to localized multi-agent AI ecosystems. 
            </p>
          </div>
        </div>
        
        <div style={{ 
          background: 'rgba(8, 8, 16, 0.6)', border: '1px solid var(--border-subtle)', 
          borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px'
        }}>
          <h3 style={{ fontSize: '14px', fontFamily: 'var(--font-mono)', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Core Directives
          </h3>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-secondary)' }}>01</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Performance Through Minimalism</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Stripping away abstraction layers to maximize computational efficiency.</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent-tertiary)' }}>02</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Autonomous Scaling</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Building architectures that learn, self-heal, and dynamically scale across nodes.</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--accent)' }}>03</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Cinematic Fidelity</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Engineering user interfaces that feel like next-generation operating systems.</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Education / Lore replaced with system timeline */}
      <div className="reveal-item" style={{ marginTop: '80px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '32px', letterSpacing: '-0.02em' }}>
          Evolution Log
        </h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', paddingLeft: '24px' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '6px', width: '1px', background: 'var(--border-subtle)' }} />
          
          {about.paragraphs.map((item, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-22px', top: '6px', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
              <div dangerouslySetInnerHTML={{ __html: item }} style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
