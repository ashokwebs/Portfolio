import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BUILD_ROTATION = ['Multi-Agent AI System', 'AI Workflow Dashboard', 'Knowledge Engine', 'Trading Algorithm', 'Security Framework'];

const navItems = [
  { path: '/', icon: '⬡', label: 'Home', color: '#00ff88' },
  { path: '/about', icon: '◈', label: 'Identity', color: '#ff00ff' },
  { path: '/skills', icon: '⚡', label: 'Arsenal', color: '#ffd700' },
  { path: '/projects', icon: '❖', label: 'Projects', color: '#00ccff' },
  { path: '/lab', icon: '⚗', label: 'Systems Lab', color: '#ff3366' },
  { path: '/cyber', icon: '⛊', label: 'Cyber', color: '#ff4400' },
  { path: '/breach', icon: '⚔', label: 'Breach Simulator', color: '#ff003c' },
  { path: '/about-you', icon: '👁', label: 'Diagnostics', color: '#8b7cf7' },
  { divider: true },
  { path: '/web3', icon: '⛓', label: 'Web3 & Trading', color: '#00ffcc' },
  { path: '/research', icon: '◎', label: 'Research', color: '#ff9900' },
  { path: '/writing', icon: '✎', label: 'Writing', color: '#cccccc' },
  { divider: true },
  { path: '/services', icon: '⚙', label: 'Services', color: '#aaaaaa' },
  { path: '/roadmap', icon: '⟫', label: 'Roadmap', color: '#ffff00' },
  { path: '/contact', icon: '✉', label: 'Contact', color: '#00ff88' },
];

export function SideDock() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="side-dock">
      <button type="button" className="dock-brand" onClick={() => navigate('/')} title="NEXUS://OS" aria-label="Go to home">
        N
      </button>
      <div className="dock-nav">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return item.divider ? (
            <div className="dock-divider" key={`d-${i}`} style={{ background: 'rgba(255,255,255,0.05)', margin: '12px 0' }} />
          ) : (
            <button
              type="button"
              key={item.path}
              className={`dock-item ${isActive ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              style={{
                color: isActive ? '#fff' : item.color,
                background: isActive ? item.color : 'rgba(255,255,255,0.02)',
                boxShadow: isActive 
                  ? `0 0 15px ${item.color}80, inset 0 2px 5px rgba(255,255,255,0.5)`
                  : `inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 6px rgba(0,0,0,0.3)`,
                border: `1px solid ${isActive ? item.color : 'rgba(255,255,255,0.05)'}`,
                borderRadius: '12px',
                width: '44px',
                height: '44px',
                marginBottom: '8px',
                transform: 'perspective(100px) translateZ(0px)',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'perspective(100px) translateZ(10px) translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 15px rgba(0,0,0,0.5), 0 0 15px ${item.color}40, inset 0 1px 2px rgba(255,255,255,0.3)`;
                  e.currentTarget.style.border = `1px solid ${item.color}60`;
                  e.currentTarget.style.color = item.color;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'perspective(100px) translateZ(0px) translateY(0px)';
                  e.currentTarget.style.boxShadow = `inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 6px rgba(0,0,0,0.3)`;
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = item.color;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }
              }}
              >
                <span style={{ 
                  filter: isActive ? 'drop-shadow(0 0 5px rgba(255,255,255,0.8))' : `drop-shadow(0 0 2px ${item.color}60)`,
                  textShadow: isActive ? 'none' : `0 0 8px ${item.color}80`
                }}>
                  {item.icon}
                </span>
                <span className="dock-tooltip">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  );
}

export function TopBar({ onOpenCmd }) {
  const [time, setTime] = useState('');
  const [currentBuild, setCurrentBuild] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    const buildInterval = setInterval(() => {
      setCurrentBuild(prev => (prev + 1) % BUILD_ROTATION.length);
    }, 4000);

    return () => { clearInterval(interval); clearInterval(buildInterval); };
  }, []);

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          NEXUS<span>://</span>OS
        </div>
        <div className="topbar-status">
          <span className="dot" />
          SYSTEM ONLINE
        </div>
        <span style={{ color: 'var(--text-ghost)', fontSize: '10px' }}>
          Currently building: <span style={{ color: 'var(--accent-secondary)' }}>{BUILD_ROTATION[currentBuild]}</span>
        </span>
      </div>
      <div className="topbar-right">
        <span>{time}</span>
        <button
          type="button"
          aria-label="Open terminal command palette"
          className="topbar-cmd" 
          onClick={onOpenCmd}
          style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '8px 16px', 
            background: 'rgba(0, 255, 136, 0.08)', 
            border: '1px solid var(--accent)', 
            borderRadius: '6px',
            color: 'var(--accent)', 
            cursor: 'pointer', 
            transition: 'all 0.3s ease',
            boxShadow: '0 0 15px rgba(0,255,136,0.15)',
            marginLeft: '16px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0,255,136,0.4)';
            e.currentTarget.style.background = 'rgba(0, 255, 136, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0,255,136,0.15)';
            e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)';
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, letterSpacing: '0.15em' }}>TERMINAL</span>
          <div style={{ display: 'flex', gap: '4px', marginLeft: '8px' }}>
            <kbd style={{ background: 'transparent', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--accent)', padding: '2px 6px' }}>⌘</kbd>
            <kbd style={{ background: 'transparent', border: '1px solid rgba(0,255,136,0.3)', color: 'var(--accent)', padding: '2px 6px' }}>K</kbd>
          </div>
        </button>
      </div>
    </div>
  );
}
