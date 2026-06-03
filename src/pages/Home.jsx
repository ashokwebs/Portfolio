import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { personal } from '../data/content';
import { useTheme } from '../context/ThemeContext';
import HomeTerminal from '../components/HomeTerminal';

export default function HomePage() {
  const { toggleCrimsonTheme, triggerTerminalGame } = useTheme();
  const [crimsonClicks, setCrimsonClicks] = useState(0);

  const handleIdentityClick = () => {
    setCrimsonClicks(prev => prev + 1);
    if (crimsonClicks >= 2) {
      toggleCrimsonTheme();
      setCrimsonClicks(0);
    }
  };

  const navigate = useNavigate();
  const [counters, setCounters] = useState({ domains: 0, projects: 0 });

  useEffect(() => {
    // Animate counters
    let frame = 0;
    const maxFrames = 60;
    const interval = setInterval(() => {
      frame++;
      setCounters({
        domains: Math.min(Math.floor((frame / maxFrames) * 10), 10),
        projects: Math.min(Math.floor((frame / maxFrames) * 32), 32),
      });
      if (frame >= maxFrames) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page home-page" style={{ maxWidth: '700px' }}>
      {/* Status pill */}
      <div className="reveal" style={{ marginBottom: '28px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 14px', borderRadius: '100px',
          border: '1px solid rgba(0,255,136,0.2)',
          background: 'rgba(0,255,136,0.04)',
          fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)',
          letterSpacing: '0.06em',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse-dot 2s infinite',
          }} />
          {personal.status}
        </span>
      </div>

      {/* Name */}
      <div className="reveal" style={{ animationDelay: '0.1s', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
        <span 
          onClick={handleIdentityClick}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)', letterSpacing: '0.2em', opacity: 0.8, cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span><span style={{ opacity: 0.5 }}>//</span> SYS.IDENTITY_PROTOCOL</span>
          <span style={{ fontSize: '9px', opacity: 0.4, letterSpacing: '0.05em', textTransform: 'lowercase' }}>(tap 3x to override theme)</span>
        </span>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(45px, 9vw, 90px)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: 'var(--text-ghost)', // Darkened Ashok
          whiteSpace: 'nowrap',
        }}>
          Ashok<span style={{ color: 'var(--accent)', opacity: 0.4, margin: '0 12px', fontWeight: 300 }}>/</span><span style={{ color: 'transparent', WebkitTextStroke: '2px var(--accent)', textShadow: '0 0 20px rgba(0,255,136,0.3)' }}>Pasala</span>
          <span style={{ color: 'var(--accent)', animation: 'blink 1s step-end infinite', marginLeft: '8px' }}>_</span>
        </h1>
      </div>

      {/* Role */}
      <div className="reveal" style={{ animationDelay: '0.2s' }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 'clamp(11px, 1.3vw, 14px)',
          color: 'var(--text-secondary)', letterSpacing: '0.15em',
          textTransform: 'uppercase', marginTop: '16px', marginBottom: '24px',
        }}>
          {personal.roles.join('  /  ')}
        </p>
      </div>

      {/* Tagline */}
      <div className="reveal" style={{ animationDelay: '0.3s' }}>
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)', maxWidth: '550px',
          lineHeight: 1.6, marginBottom: '36px',
        }}>
          {personal.tagline}
        </p>
      </div>

      {/* CTAs */}
      <div className="reveal" style={{ animationDelay: '0.4s', display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
        <button className="btn-ghost" onClick={() => navigate('/projects')}>
          ⚡ Explore Projects
        </button>
        <a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">⌥ GitHub</a>
        <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-ghost">◈ LinkedIn</a>
        <a href="https://instagram.com/_ashok.dev" target="_blank" rel="noopener noreferrer" className="btn-ghost">📷 Instagram</a>
        <a href={`mailto:${personal.email}`} className="btn-ghost">✉ Contact</a>
      </div>

      {/* Stats */}
      <div className="reveal" style={{ animationDelay: '0.5s' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '1px', background: 'var(--border-subtle)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius)', overflow: 'hidden',
          maxWidth: '600px',
        }}>
          {[
            { val: `${counters.domains}+`, label: 'Tech Domains' },
            { val: `${counters.projects}+`, label: 'Projects Built' },
            { val: '∞', label: 'Learning Mode' },
            { val: '24/7', label: 'Build Mode' },
          ].map((stat, i) => (
            <div key={i} style={{
              background: 'var(--bg-deep)', padding: '18px 20px',
              transition: 'background 0.2s', cursor: 'default',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: '22px',
                fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em',
              }}>{stat.val}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px',
                color: 'var(--text-ghost)', letterSpacing: '0.08em',
                textTransform: 'uppercase', marginTop: '4px',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Game Trigger */}
      <div className="reveal" style={{ animationDelay: '0.6s', marginTop: '32px' }}>
        <button 
          onClick={triggerTerminalGame}
          className="btn-primary"
          style={{ 
            background: 'transparent',
            border: '1px solid #ff003c',
            color: '#ff003c',
            boxShadow: '0 0 10px rgba(255,0,60,0.2)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,0,60,0.1)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(255,0,60,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(255,0,60,0.2)';
          }}
        >
          [ EXECUTE TERMINAL_GAME ]
        </button>
      </div>

      {/* Terminal widget */}
      <HomeTerminal />
    </div>
  );
}
