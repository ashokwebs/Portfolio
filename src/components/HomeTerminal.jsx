import { useState, useEffect, useRef } from 'react';
import { personal } from '../data/content';

export default function HomeTerminal() {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'booting NEXUS kernel...' },
    { type: 'system', text: 'authenticating user session...' },
    { type: 'success', text: 'access granted.' },
    { type: 'system', text: 'Interactive shell is ready. You can type commands below.' },
    { type: 'system', text: 'Type "help" for a list of available commands.' }
  ]);
  
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isMinimized, isMaximized]);

  const handleCommand = (cmd) => {
    const val = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: 'user', text: `ashok_pasala@nexus ~ % ${cmd}` }];

    const [cmdName, ...args] = val.split(' ');

    switch (cmdName) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands:' });
        newHistory.push({ type: 'output', text: '  whoami   - display user identity' });
        newHistory.push({ type: 'output', text: '  skills   - display technical proficiencies' });
        newHistory.push({ type: 'output', text: '  projects - list recent deployments' });
        newHistory.push({ type: 'output', text: '  contact  - view communication channels' });
        newHistory.push({ type: 'output', text: '  date     - print system date and time' });
        newHistory.push({ type: 'output', text: '  echo     - print text to standard output' });
        newHistory.push({ type: 'output', text: '  reboot   - restart the terminal interface' });
        newHistory.push({ type: 'output', text: '  clear    - clear terminal output' });
        newHistory.push({ type: 'output', text: '  sudo     - execute command as superuser' });
        break;
      case 'whoami':
        newHistory.push({ type: 'output', text: `NAME: Ashok Pasala` });
        newHistory.push({ type: 'output', text: `ROLE: ${personal.roles.join(' | ')}` });
        newHistory.push({ type: 'output', text: `STATUS: ${personal.status}` });
        break;
      case 'skills':
        newHistory.push({ type: 'output', text: 'CORE STACK:' });
        newHistory.push({ type: 'output', text: '  > Frontend: React, Next.js, WebGL' });
        newHistory.push({ type: 'output', text: '  > Backend: Node.js, Python, PostgreSQL' });
        newHistory.push({ type: 'output', text: '  > SecOps: Penetration Testing, IAM, Zero-Trust' });
        break;
      case 'projects':
        newHistory.push({ type: 'output', text: 'ACTIVE DEPLOYMENTS:' });
        newHistory.push({ type: 'output', text: '  [1] NEXUS Identity OS (Current)' });
        newHistory.push({ type: 'output', text: '  [2] ShadowForge Crypto Intelligence' });
        newHistory.push({ type: 'output', text: '  [3] NovaVault Fintech Platform' });
        newHistory.push({ type: 'output', text: '  [4] PROX Casino Engine' });
        break;
      case 'contact':
        newHistory.push({ type: 'output', text: 'COMMUNICATION PROTOCOLS:' });
        newHistory.push({ type: 'output', text: `  > Email: ${personal.email}` });
        newHistory.push({ type: 'output', text: `  > GitHub: github.com/ashokwebs` });
        newHistory.push({ type: 'output', text: `  > Phone: ${personal.phone}` });
        break;
      case 'strings':
        if (args.join(' ') === 'kernel.log') {
          newHistory.push({ type: 'output', text: 'trace://artifact => /.well-known/nexus-seed.txt' });
          newHistory.push({ type: 'output', text: 'If you are reading hidden strings, you are exactly the target audience.' });
        } else {
          newHistory.push({ type: 'error', text: `strings: cannot open ${args.join(' ') || 'input'}` });
        }
        break;
      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;
      case 'echo':
        newHistory.push({ type: 'output', text: args.join(' ') });
        break;
      case 'reboot':
        setHistory([
          { type: 'system', text: 'rebooting...' },
          { type: 'system', text: 'loading kernel modules...' },
          { type: 'success', text: 'system online.' },
          { type: 'system', text: 'Interactive shell is ready.' }
        ]);
        return;
      case 'clear':
        setHistory([]);
        return;
      case 'sudo':
        newHistory.push({ type: 'error', text: 'ashok is not in the sudoers file. This incident will be reported.' });
        break;
      case '':
        break;
      default:
        newHistory.push({ type: 'error', text: `zsh: command not found: ${cmdName}` });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="reveal" 
      style={{ 
        animationDelay: '0.6s', 
        marginTop: '48px',
        width: isMaximized ? '100%' : '100%',
        maxWidth: isMaximized ? '1000px' : '700px',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div style={{
        background: 'var(--bg-deep)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        backdropFilter: 'blur(10px)',
        height: isMinimized ? '40px' : (isMaximized ? '500px' : '300px'),
        transition: 'height 0.3s ease',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Terminal Header & Traffic Lights */}
        <div style={{
          background: 'rgba(0,0,0,0.3)',
          borderBottom: isMinimized ? 'none' : '1px solid var(--border-subtle)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Close */}
            <div 
              onClick={() => setIsVisible(false)}
              style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            {/* Minimize */}
            <div 
              onClick={() => setIsMinimized(!isMinimized)}
              style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
            {/* Maximize */}
            <div 
              onClick={() => {
                if (isMinimized) setIsMinimized(false);
                setIsMaximized(!isMaximized);
              }}
              style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
            ashok_pasala@nexus ~ zsh
          </div>
          <div style={{ width: '44px' }}></div> {/* Spacer for centering */}
        </div>

        {/* Terminal Body */}
        {!isMinimized && (
          <div 
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            style={{
              padding: '20px',
              flex: 1,
              overflowY: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '13px',
              lineHeight: 1.6,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              cursor: 'text'
            }}
          >
            {history.map((line, i) => (
              <div key={i} style={{ 
                color: line.type === 'system' ? 'var(--text-secondary)' : 
                       line.type === 'error' ? '#ff5f56' : 
                       line.type === 'success' ? '#27c93f' :
                       line.type === 'user' ? '#fff' : 'var(--accent)'
              }}>
                {line.text}
              </div>
            ))}
            
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <span style={{ color: 'var(--accent)' }}>ashok_pasala@nexus ~ %</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  padding: 0
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
