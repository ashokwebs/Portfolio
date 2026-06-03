import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const cmdData = [
  { group: 'Navigate', icon: '⬡', text: 'Home', sub: 'Landing page', path: '/' },
  { group: 'Navigate', icon: '◉', text: 'Identity', sub: 'About me', path: '/about' },
  { group: 'Navigate', icon: '⚡', text: 'Arsenal', sub: 'Technologies & Skills', path: '/skills' },
  { group: 'Navigate', icon: '◆', text: 'Projects', sub: '30+ builds', path: '/projects' },
  { group: 'Navigate', icon: '⚗', text: 'Systems Lab', sub: 'AI & Automation', path: '/lab' },
  { group: 'Navigate', icon: '⛊', text: 'Cybersecurity', sub: 'Security research', path: '/cyber' },
  { group: 'Navigate', icon: '⛓', text: 'Web3 & Trading', sub: 'Crypto & finance', path: '/web3' },
  { group: 'Navigate', icon: '◎', text: 'Research', sub: 'Learning paths', path: '/research' },
  { group: 'Navigate', icon: '✎', text: 'Writing', sub: 'Essays & books', path: '/writing' },
  { group: 'Navigate', icon: '⚙', text: 'Services', sub: 'What I build', path: '/services' },
  { group: 'Navigate', icon: '⟫', text: 'Roadmap', sub: 'Goals & vision', path: '/roadmap' },
  { group: 'Navigate', icon: '✉', text: 'Contact', sub: 'Get in touch', path: '/contact' },
  { group: 'Links', icon: '⌥', text: 'GitHub', sub: 'github.com/ashokwebs', url: 'https://github.com/ashokwebs' },
  { group: 'Links', icon: '◈', text: 'LinkedIn', sub: 'ashok-raj-p', url: 'https://www.linkedin.com/in/ashok-raj-p-1b8539317/' },
  { group: 'Links', icon: '✉', text: 'Email', sub: 'ashokashishms@gmail.com', url: 'mailto:ashokashishms@gmail.com' },
];

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = cmdData.filter(d =>
    !query || d.text.toLowerCase().includes(query.toLowerCase()) || d.sub.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e) {
      if (!isOpen) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') {
        e.preventDefault();
        execCmd(filtered[selectedIdx]);
      }
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, filtered, selectedIdx]);

  function execCmd(item) {
    if (!item) return;
    if (item.path) navigate(item.path);
    else if (item.url) window.open(item.url, '_blank');
    onClose();
  }

  const groups = [...new Set(filtered.map(d => d.group))];

  return (
    <div className={`cmd-overlay ${isOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cmd-box">
        <div className="cmd-input-wrap">
          <span className="cmd-icon">⌘</span>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Type a command or search..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
          />
        </div>
        <div className="cmd-results">
          {groups.map(group => (
            <div key={group}>
              <div className="cmd-group-label">{group}</div>
              {filtered.filter(d => d.group === group).map((item, i) => {
                const globalIdx = filtered.indexOf(item);
                return (
                  <div
                    key={item.text}
                    className={`cmd-item ${globalIdx === selectedIdx ? 'selected' : ''}`}
                    onClick={() => execCmd(item)}
                    onMouseEnter={() => setSelectedIdx(globalIdx)}
                  >
                    <div className="cmd-item-icon">{item.icon}</div>
                    <div>
                      <div className="cmd-item-text">{item.text}</div>
                      <div className="cmd-item-sub">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="cmd-footer">
          <span><kbd style={{ padding: '2px 6px', background: 'var(--bg-surface)', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ padding: '2px 6px', background: 'var(--bg-surface)', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>↵</kbd> select</span>
          <span><kbd style={{ padding: '2px 6px', background: 'var(--bg-surface)', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
