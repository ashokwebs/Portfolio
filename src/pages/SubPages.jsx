import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { learning, cybersecurity, roadmap, interests, writing, services } from '../data/content';
import TiltCard from '../components/TiltCard';

const tiltOptions = {
  reverse: true,
  max: 10,
  perspective: 1000,
  scale: 1.02,
  speed: 800,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export function SystemsLab() {
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
        <div className="section-num">04</div>
        <div className="section-title">Systems & AI Lab</div>
        <div className="section-line"></div>
      </div>
      
      <p className="reveal-item" style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '48px' }}>
        A high-fidelity environment for experimental architecture. This sector details active deployments of autonomous agents and vector-based knowledge graphs.
      </p>

      <div className="grid-2 reveal-item">
        {/* Module 1: Multi-Agent Orchestration */}
        <TiltCard options={tiltOptions}>
          <div style={{
          background: 'rgba(10, 12, 18, 0.8)',
          border: '1px solid rgba(0, 255, 136, 0.15)',
          borderRadius: '12px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 40px rgba(0, 255, 136, 0.02), 0 10px 30px -10px rgba(0,0,0,0.5)'
        }}>
          {/* Animated background grid */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(0, 255, 136, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.5,
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Multi-Agent Orchestration</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.1em' }}>LIVE SYNC</span>
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>
              Architecting synchronized environments where specialized large language models collaborate. Context is passed dynamically between nodes to execute complex, multi-step workflows autonomously without human intervention.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Context Routing', 'Memory Persistence', 'Execution Validation'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)' }}>{item}</span>
                  <span style={{ color: 'var(--accent)', fontSize: '14px' }}>✓</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </TiltCard>

        {/* Module 2: Knowledge Engine RAG */}
        <TiltCard options={tiltOptions}>
          <div style={{
          background: 'rgba(10, 12, 18, 0.8)',
          border: '1px solid rgba(139, 124, 247, 0.15)',
          borderRadius: '12px',
          padding: '32px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'inset 0 0 40px rgba(139, 124, 247, 0.02), 0 10px 30px -10px rgba(0,0,0,0.5)'
        }}>
          {/* Animated background grid */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'linear-gradient(rgba(139, 124, 247, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 124, 247, 0.05) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.5,
            pointerEvents: 'none'
          }} />
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>Vector Semantic Engine</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-tertiary)', animation: 'pulse-dot 3s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-tertiary)', letterSpacing: '0.1em' }}>INDEXING</span>
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '32px' }}>
              High-dimensional vector-database backed pipelines for retrieval augmented generation (RAG). Transforming vast amounts of unstructured data into queryable semantic knowledge graphs.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>EMBEDDING DIMENSIONS</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-tertiary)' }}>1536</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'var(--accent-tertiary)' }} />
                </div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.1em' }}>COSINE SIMILARITY THRESHOLD</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-tertiary)' }}>0.85</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: 'var(--accent-tertiary)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </TiltCard>
      </div>
    </div>
  );
}

export function CyberSecurity() {
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
        <div className="section-num">05</div>
        <div className="section-title">Cybersecurity</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid-3 reveal-item">
        {cybersecurity.map((item, i) => (
          <div key={i} className="card">
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Web3Trading() {
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
        <div className="section-num">06</div>
        <div className="section-title">Web3 & Finance</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid-2 reveal-item">
        {interests.map((item, i) => (
          <div key={i} className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '24px' }}>{item.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 700 }}>{item.title}</div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{item.text}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {item.tags?.map((tag, j) => (
                <span key={j} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Research() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 });
      
      gsap.to('.progress-fill', {
        width: (i, el) => el.dataset.width,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="page" ref={containerRef}>
      <div className="section-header reveal-item">
        <div className="section-num">07</div>
        <div className="section-title">Learning & Research</div>
        <div className="section-line"></div>
      </div>
      
      <p className="reveal-item" style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '48px' }}>
        I treat learning as engineering — systematic, documented, outcome-driven. These are the domains I'm actively exploring and building depth in.
      </p>

      <div className="grid-3 reveal-item">
        {learning.map((item, i) => (
          <div key={i} className="card">
            <div style={{ fontSize: '28px', marginBottom: '16px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{item.text}</p>
            <div style={{ height: '2px', background: 'var(--border-subtle)', borderRadius: '1px', overflow: 'hidden' }}>
              <div 
                className="progress-fill" 
                data-width={`${item.progress}%`}
                style={{ width: '0%', height: '100%', background: 'linear-gradient(to right, var(--accent), var(--accent-tertiary))' }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Writing() {
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
        <div className="section-num">08</div>
        <div className="section-title">Writing & Ideas</div>
        <div className="section-line"></div>
      </div>
      
      <p className="reveal-item" style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '48px' }}>
        Writing is where I clarify thinking. Essays, book drafts, research logs — this section is a live archive of ideas in various states of development.
      </p>

      <div className="grid-2 reveal-item">
        {writing.map((item, i) => (
          <div key={i} className="card" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span className={`tag ${item.typeClass}`} style={{ background: 'var(--bg-elevated)' }}>{item.type}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)' }}>{item.date}</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
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
        <div className="section-num">09</div>
        <div className="section-title">Services</div>
        <div className="section-line"></div>
      </div>
      
      <div className="grid-3 reveal-item">
        {services.map((item, i) => (
          <div key={i} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>{item.icon}</div>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>{item.title}</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>{item.desc}</p>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.06em' }}>
              → {item.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Roadmap() {
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
        <div className="section-num">10</div>
        <div className="section-title">Roadmap & Objectives</div>
        <div className="section-line"></div>
      </div>

      <div className="grid-3 reveal-item">
        {/* Now */}
        <div className="card" style={{ borderColor: 'var(--accent-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase I: Now</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roadmap.now.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <div className="card" style={{ borderColor: 'rgba(255,140,0,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-secondary)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase II: Next</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roadmap.next.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-secondary)', marginTop: '2px' }}>▹</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Future */}
        <div className="card" style={{ borderColor: 'rgba(139,124,247,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-tertiary)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--accent-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phase III: Future</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {roadmap.future.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--accent-tertiary)', marginTop: '2px' }}>▹</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
