import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { personal } from '../data/content';

export default function ClassifiedPage() {
  const [access, setAccess] = useState('denied'); // 'denied', 'authenticating', 'granted'
  const [input, setInput] = useState('');
  const [glitchText, setGlitchText] = useState('TOP SECRET');
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fake hacker console logs for visitors
    console.log("%c[!] KERNEL WARNING: UNAUTHORIZED ACCESS DETECTED", "color: red; font-size: 20px; font-weight: bold;");
    console.log("%cTo whoever found this: The password is a reference to the core protocol.", "color: #00ff88; font-size: 14px;");
  }, []);

  useEffect(() => {
    if (access === 'granted') {
      const interval = setInterval(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let res = '';
        for (let i = 0; i < 10; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
        setGlitchText(res);
      }, 50);
      
      setTimeout(() => {
        clearInterval(interval);
        setGlitchText('PROJECT OMEGA');
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [access]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.toLowerCase() === 'nexus' || input.toLowerCase() === 'nexus os' || input.toLowerCase() === 'nexus://os') {
      setAccess('authenticating');
      setTimeout(() => setAccess('granted'), 1500);
    } else {
      setInput('');
      // shake animation
      gsap.fromTo('.auth-box', { x: -10 }, { x: 10, yoyo: true, repeat: 5, duration: 0.05, onComplete: () => gsap.set('.auth-box', { x: 0 }) });
    }
  };

  if (access === 'granted') {
    return (
      <div className="page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '40px', color: '#ff5f57', letterSpacing: '0.2em', marginBottom: '24px', animation: 'blink 2s infinite' }}>
          {glitchText}
        </h1>
        <div style={{ background: 'rgba(255,95,87,0.1)', border: '1px solid #ff5f57', padding: '32px', borderRadius: '8px', maxWidth: '600px', textAlign: 'left' }}>
          <h3 style={{ color: '#ff5f57', marginBottom: '16px', fontFamily: 'var(--font-mono)' }}>CONFIDENTIAL // OVERRIDE ACCEPTED</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            Congratulations on finding the hidden directory. You are one of the few who look beyond the surface.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            As a reward, here is a classified piece of data:
            <br/><br/>
            <strong style={{ color: 'var(--text-primary)' }}>TRUE OBJECTIVE:</strong> {personal.tagline}
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{ background: 'transparent', border: '1px solid #ff5f57', color: '#ff5f57', padding: '8px 16px', fontFamily: 'var(--font-mono)', cursor: 'pointer' }}
          >
            RETURN TO SURFACE WEBW
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div className="auth-box" style={{ background: 'rgba(8,8,16,0.9)', border: '1px solid #ff5f57', padding: '40px', borderRadius: '12px', textAlign: 'center', boxShadow: '0 0 30px rgba(255,95,87,0.2)' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', color: '#ff5f57', letterSpacing: '0.1em', marginBottom: '8px' }}>LEVEL 4 CLEARANCE REQUIRED</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '32px' }}>Enter the core protocol override key to access classified directories.</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="password" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={access === 'authenticating'}
            placeholder="OVERRIDE KEY"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,95,87,0.5)',
              padding: '12px',
              color: '#ff5f57',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center',
              outline: 'none',
              letterSpacing: '0.2em'
            }}
          />
          <button 
            type="submit" 
            disabled={access === 'authenticating'}
            style={{
              background: access === 'authenticating' ? 'rgba(255,95,87,0.2)' : 'transparent',
              border: '1px solid #ff5f57',
              color: '#ff5f57',
              padding: '12px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            {access === 'authenticating' ? 'VERIFYING...' : 'AUTHENTICATE'}
          </button>
        </form>
      </div>
    </div>
  );
}
