import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

// Simple Synth for Audio Effects (no external files needed)
const playSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'type') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400 + Math.random() * 100, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {
    console.error('AudioContext error:', e);
  }
};

const MASTER_TASKS = [
  // Core System & Processes
  { command: 'kill -9 1337', hint: 'Force terminate the rogue process with PID 1337.' },
  { command: 'killall -9 node', hint: 'Force terminate all running Node.js instances.' },
  { command: 'systemctl restart nginx', hint: 'Restart the Nginx web server daemon.' },
  { command: 'systemctl stop sshd', hint: 'Halt the SSH daemon to prevent lateral movement.' },
  { command: 'htop', hint: 'Launch the interactive process viewer to monitor CPU spikes.' },
  { command: 'lsof -i :8080', hint: 'List open files and processes bound to port 8080.' },
  { command: 'init 0', hint: 'Initiate a hard system shutdown.' },
  
  // Networking & Firewall
  { command: 'iptables -A INPUT -j DROP', hint: 'Drop all incoming network packets via iptables.' },
  { command: 'ufw default deny incoming', hint: 'Set the Uncomplicated Firewall default policy to deny incoming traffic.' },
  { command: 'tcpdump -i eth0', hint: 'Capture and analyze live network traffic on interface eth0.' },
  { command: 'nmap -sS -p- 127.0.0.1', hint: 'Perform a stealth SYN scan across all local ports.' },
  { command: 'netstat -tulpn', hint: 'Display all listening ports and their associated PIDs.' },
  { command: 'ping -c 4 8.8.8.8', hint: 'Send 4 ICMP echo requests to Google DNS to test outbound connectivity.' },
  { command: 'traceroute 1.1.1.1', hint: 'Trace the packet routing path to Cloudflare DNS.' },
  { command: 'ip route flush cache', hint: 'Flush the routing cache table.' },
  { command: 'echo 1 > /proc/sys/net/ipv4/tcp_syncookies', hint: 'Enable TCP SYN cookies to mitigate flood attacks.' },

  // Filesystem & Storage
  { command: 'chmod 000 /sys/malware', hint: 'Strip all read/write/execute permissions from the malware directory.' },
  { command: 'chown root:root /bin/sys', hint: 'Restore user and group ownership of the sys binary to root.' },
  { command: 'chattr +i /etc/passwd', hint: 'Make the password file immutable so it cannot be modified.' },
  { command: 'mount -o remount,ro /', hint: 'Remount the root filesystem in strict read-only mode.' },
  { command: 'umount -f /mnt/backdoor', hint: 'Forcefully unmount the compromised backdoor volume.' },
  { command: 'rm -rf /tmp/payload', hint: 'Recursively and forcefully delete the payload directory.' },
  { command: 'shred -u /etc/shadow.bak', hint: 'Securely overwrite and delete the exposed shadow backup.' },
  { command: 'tar -czvf logs.tar.gz /var/log/', hint: 'Compress the entire log directory into a gzipped tarball.' },
  { command: 'find / -name "*.sh" -type f -delete', hint: 'Find and delete all shell scripts on the filesystem.' },
  { command: 'df -h', hint: 'Display disk space usage in human-readable format.' },

  // Security & Auditing
  { command: 'passwd -l root', hint: 'Lock the root user account to prevent login.' },
  { command: 'usermod -aG sudo ashok', hint: 'Add the user ashok to the sudoers group.' },
  { command: 'grep -r "Failed password" /var/log/auth.log', hint: 'Search the authentication logs for failed login attempts.' },
  { command: 'tail -f /var/log/syslog', hint: 'Follow the system log in real-time.' },
  { command: 'history -c', hint: 'Clear the current shell session command history.' },
  { command: 'ssh-keygen -t ed25519', hint: 'Generate a new Ed25519 cryptographic key pair.' },
  { command: 'crontab -r', hint: 'Remove the current users crontab file to stop scheduled malware.' },
  { command: 'awk -F\':\' \'{ print $1}\' /etc/passwd', hint: 'Parse the passwd file and print only the usernames.' },
  { command: 'docker stop $(docker ps -q)', hint: 'Stop all running Docker containers simultaneously.' },
  { command: 'sudo purge parasite', hint: 'Last resort override. Elevate privileges and purge the resident parasite from kernel memory.' }
];

const FINAL_TASK_COMMAND = 'sudo purge parasite';
const PLAYABLE_TASKS = MASTER_TASKS.filter((task) => task.command !== FINAL_TASK_COMMAND);

export default function CrimsonGame() {
  const { terminalGameState, endTerminalGame, injectAiDialogue } = useTheme();
  
  const [corruption, setCorruption] = useState(60);
  const [currentTask, setCurrentTask] = useState(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const initializedRef = useRef(false);

  const getRandomTask = () => {
    return PLAYABLE_TASKS[Math.floor(Math.random() * PLAYABLE_TASKS.length)];
  };

  // Initialize the Override
  useEffect(() => {
    if (terminalGameState === 'active' && !initializedRef.current) {
      initializedRef.current = true;
      const initialTask = getRandomTask();
      setCorruption(60);
      setCurrentTask(initialTask);
      setInput('');
      
      setHistory([
        { type: 'system', text: 'CRITICAL CONTAINMENT BREACH DETECTED.' },
        { type: 'system', text: 'MANUAL OVERRIDE REQUIRED.' },
        { type: 'system', text: 'Type "help" for a list of commands, or "hint" for a clue.' },
        { type: 'ai', text: `Next Objective: ${initialTask.hint}` }
      ]);
      
      injectAiDialogue(`CRITICAL: SYSTEM COMPROMISED. Objective: ${initialTask.hint}`);
    } else if (terminalGameState === 'idle') {
      initializedRef.current = false;
    }
  }, [terminalGameState, injectAiDialogue]);

  // Auto-scroll to bottom of terminal
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Keep input focused
  useEffect(() => {
    const handleClick = () => {
      if (terminalGameState === 'active' && inputRef.current) {
        inputRef.current.focus();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [terminalGameState]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = input.trim();
      if (!val) return;

      const newHistory = [...history, { type: 'user', text: `root@nexus:~# ${val}` }];
      
      if (val.toLowerCase() === 'help') {
        playSound('type');
        newHistory.push({ type: 'system', text: 'AVAILABLE SYSTEM COMMANDS:' });
        PLAYABLE_TASKS.forEach(t => {
          newHistory.push({ type: 'ai', text: `  - ${t.command}` });
        });
        newHistory.push({ type: 'system', text: 'Analyze the hint to find the correct command.' });
        newHistory.push({ type: 'ai', text: `Current Objective: ${currentTask.hint}` });
      }
      else if (val.toLowerCase() === 'hint') {
        playSound('type');
        const firstWord = currentTask.command.split(' ')[0];
        newHistory.push({ type: 'ai', text: `HINT: The correct command begins with: '${firstWord}'` });
        injectAiDialogue(`HINT: Try starting your command with '${firstWord}'.`);
      }
      else if (currentTask && val === currentTask.command) {
        // Success
        playSound('success');
        
        const nextCorruption = Math.max(0, corruption - 20);
        setCorruption(nextCorruption);

        if (nextCorruption === 0) {
          // Win
          newHistory.push({ type: 'success', text: `FINAL COMMAND ACCEPTED. PARASITE PURGED.` });
          newHistory.push({ type: 'system', text: `INITIATING SYSTEM RESTORE...` });
          endTerminalGame(true);
        } else if (nextCorruption === 20) {
          // About to win - set final task
          const finalTask = MASTER_TASKS.find(t => t.command === FINAL_TASK_COMMAND);
          setCurrentTask(finalTask);
          newHistory.push({ type: 'success', text: `Command accepted. Corruption dropping.` });
          newHistory.push({ type: 'ai', text: `MUTATED PARASITE EXPOSED. ${finalTask.hint}` });
          injectAiDialogue(`MUTATED PARASITE EXPOSED. Execute final command: ${finalTask.hint}`);
        } else {
          // Next random task
          const nextTask = getRandomTask();
          setCurrentTask(nextTask);
          newHistory.push({ type: 'success', text: `Command accepted. Corruption dropping.` });
          newHistory.push({ type: 'ai', text: nextTask.hint });
          injectAiDialogue(`Command accepted. Next: ${nextTask.hint}`);
        }
      } else {
        // Error
        playSound('error');
        const nextCorruption = Math.min(100, corruption + 20);
        setCorruption(nextCorruption);

        if (nextCorruption >= 100) {
          newHistory.push({ type: 'error', text: `FATAL ERROR. CORRUPTION AT 100%.` });
          endTerminalGame(false);
        } else {
          newHistory.push({ type: 'error', text: `ERROR: Unrecognized command. Corruption increasing!` });
          newHistory.push({ type: 'ai', text: `Current Objective: ${currentTask.hint}` });
          injectAiDialogue(`WARNING: Wrong command. Corruption at ${nextCorruption}%. Try again.`);
        }
      }
      
      setHistory(newHistory);
      setInput('');
    } else {
      playSound('type');
    }
  };

  if (terminalGameState === 'idle') return null;

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        pointerEvents: 'auto',
        background: 'rgba(10,0,2,0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}
    >
      {/* Terminal Window */}
      <div style={{
        width: '100%',
        maxWidth: '800px',
        height: '600px',
        background: 'rgba(255,0,60,0.05)',
        border: '1px solid #ff003c',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 0 50px rgba(255,0,60,0.2), inset 0 0 20px rgba(255,0,60,0.1)'
      }}>
        
        {/* Terminal Header */}
        <div style={{ background: 'rgba(255,0,60,0.2)', padding: '12px 20px', borderBottom: '1px solid #ff003c', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
          <span style={{ color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em' }}>
            NEXUS_OS // EMERGENCY OVERRIDE TERMINAL
          </span>
          <span style={{ color: '#ff003c', fontFamily: 'var(--font-mono)', fontSize: '12px', animation: corruption > 80 ? 'blink 0.2s infinite' : 'blink 1s infinite' }}>
            CORRUPTION: {corruption}%
          </span>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {history.map((line, i) => (
            <div key={i} style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '14px',
              color: line.type === 'system' ? '#ff3366' : 
                     line.type === 'ai' ? '#00d4ff' : 
                     line.type === 'error' ? '#ff003c' : 
                     line.type === 'success' ? '#00ff88' : '#e8eaed',
              animation: line.type === 'system' ? 'glitch 0.2s' : 'none',
              lineHeight: 1.5
            }}>
              {line.type === 'ai' && '> '}
              {line.text}
            </div>
          ))}
          
          {/* Input Line */}
          {terminalGameState === 'active' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px' }}>
              <span style={{ color: '#ff003c', fontFamily: 'var(--font-mono)', fontSize: '14px' }}>root@nexus:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoFocus
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  textShadow: '0 0 5px rgba(255,255,255,0.5)'
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
