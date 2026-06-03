import { useState, useEffect, useRef } from 'react';

const bootLines = [
  { text: '[SYS] Initializing kernel...', delay: 200 },
  { text: '[MEM] Allocating memory buffers                  [OK]', delay: 150 },
  { text: '[NET] Establishing secure connection             [OK]', delay: 200 },
  { text: '[ENV] Loading environment variables              [OK]', delay: 180 },
  { text: '[SEC] Firewall protocols active                  [OK]', delay: 150 },
  { text: '[UI] Mounting virtual DOM                        [OK]', delay: 250 },
  { text: '', delay: 100 },
  { text: '> SYSTEM ONLINE. Authentication Required.', delay: 300 },
];

export default function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [waitingForLogin, setWaitingForLogin] = useState(false);
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Skip if already booted this session
    if (sessionStorage.getItem('nexus-booted')) {
      onComplete();
      return;
    }

    let totalDelay = 0;
    const timeouts = [];

    bootLines.forEach((line, i) => {
      totalDelay += line.delay;
      const t1 = setTimeout(() => {
        setVisibleLines(prev => [...prev, line.text]);
        setProgress(Math.round(((i + 1) / bootLines.length) * 100));
      }, totalDelay);
      timeouts.push(t1);
    });

    // Show login prompt after lines finish
    const t2 = setTimeout(() => {
      setWaitingForLogin(true);
    }, totalDelay + 400);
    timeouts.push(t2);

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    if (waitingForLogin && inputRef.current) {
      inputRef.current.focus();
    }
  }, [waitingForLogin]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input.trim().toLowerCase();
      if (val === 'login' || val === 'guest') {
        setDone(true);
        sessionStorage.setItem('nexus-booted', 'true');
        setTimeout(onComplete, 600);
      } else {
        setErrorMsg('Authentication failed. Type "login" to proceed.');
        setInput('');
      }
    }
  };

  // Skip if already booted
  if (sessionStorage.getItem('nexus-booted')) return null;

  return (
    <div className={`boot-screen ${done ? 'done' : ''}`}>
      <div className="boot-logo">NEXUS://OS</div>
      <div className="boot-lines">
        {visibleLines.map((line, i) => (
          <div key={i} className="boot-line visible" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
            {line.includes('[OK]') ? (
              <>
                {line.replace('[OK]', '')}
                <span className="ok">[OK]</span>
              </>
            ) : (
              <span style={{ color: line.startsWith('>') ? 'var(--accent)' : 'var(--text-ghost)' }}>{line}</span>
            )}
          </div>
        ))}
        
        {waitingForLogin && (
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', animation: 'fade-in 0.5s forwards' }}>
            {errorMsg && <div style={{ color: '#ff5f56', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>{errorMsg}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>guest@nexus:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="type 'login' to enter..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  width: '200px'
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="boot-progress" style={{ opacity: waitingForLogin ? 0 : 1, transition: 'opacity 0.3s' }}>
        <div className="boot-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
