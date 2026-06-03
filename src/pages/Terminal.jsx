import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TerminalPage() {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'NEXUS OS Terminal [Version 3.7.1]' },
    { type: 'sys', text: 'Type "help" for available commands.' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const endRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      if (!cmd) return;
      
      const newHistory = [...history, { type: 'cmd', text: cmd }];
      setInput('');
      
      // Process command
      setTimeout(() => processCommand(cmd, newHistory), 50);
    }
  };

  const processCommand = (cmd, currentHistory) => {
    const args = cmd.split(' ').filter(Boolean);
    const command = args[0].toLowerCase();
    
    let output;
    
    switch (command) {
      case 'help':
        output = [
          { type: 'out', text: 'Available commands:' },
          { type: 'out', text: '  whoami    - Display user identity' },
          { type: 'out', text: '  ls        - List directory contents' },
          { type: 'out', text: '  cd <dir>  - Change directory / navigate' },
          { type: 'out', text: '  cat <file>- View file contents' },
          { type: 'out', text: '  clear     - Clear terminal' },
          { type: 'out', text: '  status    - View system status' },
          { type: 'out', text: '  matrix    - Enter the matrix' },
        ];
        break;
      case 'whoami':
        output = [{ type: 'out', text: 'ashok_pasala [systems_engineer, full_stack_dev, ai_builder]' }];
        break;
      case 'ls':
        output = [
          { type: 'out', text: 'projects/    skills.json    about.md     contact.txt' },
          { type: 'out', text: 'research/    services.yml   roadmap.sh' }
        ];
        break;
      case 'cd':
        if (args[1]) {
          const dir = args[1].replace('/', '');
          const routes = ['projects', 'skills', 'about', 'research', 'services', 'roadmap', 'contact'];
          if (routes.includes(dir)) {
            output = [{ type: 'out', text: `Navigating to /${dir}...` }];
            setTimeout(() => navigate(`/${dir}`), 800);
          } else if (dir === '..') {
            output = [{ type: 'out', text: `Navigating to root...` }];
            setTimeout(() => navigate('/'), 800);
          } else {
            output = [{ type: 'out', text: `cd: no such file or directory: ${args[1]}` }];
          }
        } else {
          output = [{ type: 'out', text: `Navigating to root...` }];
          setTimeout(() => navigate('/'), 800);
        }
        break;
      case 'cat':
        if (args[1] === 'about.md') {
          output = [
            { type: 'out', text: '# Ashok Pasala' },
            { type: 'out', text: 'Full-stack developer, AI builder, and systems thinker.' },
            { type: 'out', text: 'Building intelligent systems and scalable products.' }
          ];
        } else if (args[1] === 'contact.txt') {
          output = [
            { type: 'out', text: 'Email: ashokashishms@gmail.com' },
            { type: 'out', text: 'GitHub: github.com/ashokwebs' }
          ];
        } else if (args[1] === '.nexus-note') {
          output = [
            { type: 'out', text: '[DEVELOPER NOTE]' },
            { type: 'out', text: 'If you found this, you already know the best interfaces reward inspection.' },
            { type: 'out', text: 'CTF fragment: GLASS-GARDEN // Next breadcrumb lives in page source.' },
          ];
        } else {
          output = [{ type: 'out', text: `cat: ${args[1] || ''}: No such file` }];
        }
        break;
      case 'trace':
        if (args[1] === '--override') {
          output = [
            { type: 'out', text: 'trace://override accepted' },
            { type: 'out', text: 'Artifact located: /.well-known/nexus-seed.txt' },
            { type: 'out', text: 'Secondary note: try `cat .nexus-note`' },
          ];
        } else {
          output = [{ type: 'out', text: 'trace: missing override token. Hint: --override' }];
        }
        break;
      case 'status':
        output = [
          { type: 'out', text: 'SYSTEM: ONLINE' },
          { type: 'out', text: 'COGNITIVE BUFFER: 99.4% STABLE' },
          { type: 'out', text: 'AVAILABILITY: ACCEPTING CONTRACTS' }
        ];
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'matrix':
        output = [{ type: 'out', text: 'Follow the white rabbit...' }];
        document.body.style.filter = 'hue-rotate(90deg)';
        setTimeout(() => { document.body.style.filter = ''; }, 5000);
        break;
      case 'sudo':
        output = [{ type: 'out', text: 'nice try. This incident has been logged.' }];
        break;
      case 'hack':
        output = [
          { type: 'out', text: 'Initializing mainframe breach...' },
          { type: 'out', text: 'Bypassing firewalls...' },
          { type: 'out', text: 'ACCESS DENIED. Security protocols engaged.' }
        ];
        break;
      case 'classified':
        output = [{ type: 'out', text: 'Redirecting to secure portal...' }];
        setTimeout(() => navigate('/classified'), 1000);
        break;
      default:
        output = [{ type: 'out', text: `command not found: ${command}` }];
    }
    
    setHistory([...currentHistory, ...output]);
  };

  return (
    <div className="page" style={{ padding: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(5,5,8,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-ghost)' }}>root@nexus-os:~</span>
        </div>
        <button onClick={() => navigate('/')} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>[ EXIT TERMINAL ]</button>
      </div>

      <div style={{ flex: 1, padding: '32px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '14px', lineHeight: 1.6, color: 'var(--accent)' }} onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: '8px' }}>
            {line.type === 'cmd' ? (
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: 'var(--accent)' }}>root@nexus❯</span>
                <span style={{ color: 'var(--text-primary)' }}>{line.text}</span>
              </div>
            ) : line.type === 'sys' ? (
              <div style={{ color: 'var(--text-secondary)' }}>{line.text}</div>
            ) : (
              <div style={{ color: 'var(--accent-dim)', paddingLeft: '24px', filter: 'brightness(1.5)' }}>{line.text}</div>
            )}
          </div>
        ))}
        
        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <span style={{ color: 'var(--accent)' }}>root@nexus❯</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            autoFocus
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              fontFamily: 'inherit', fontSize: 'inherit', color: 'var(--text-primary)'
            }}
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
}
