import { useState, useRef, useEffect } from 'react';
import { generateAIResponse } from '../utils/nlpEngine';
import { useTheme } from '../context/ThemeContext';

export default function FloatingAI() {
  const { isCrimson, aiOverrideMessage, clearAiDialogue } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'SYSTEM ONLINE. I am the NEXUS heuristic agent. Query my database for context on Ashok\'s projects, skills, or services.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Listen for emergency AI overrides from the game state
  useEffect(() => {
    if (aiOverrideMessage) {
      setIsOpen(true); // Force open the AI window
      setMessages(prev => [...prev, { role: 'ai', text: aiOverrideMessage }]);
      clearAiDialogue(); // Consume the message
    }
  }, [aiOverrideMessage, clearAiDialogue]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    
    // Simulate AI thinking delay for cinematic effect
    setTimeout(() => {
      const response = generateAIResponse(userMsg, isCrimson);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    }, 600);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        aria-label={isOpen ? 'Close NEXUS agent' : 'Open NEXUS agent'}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '16px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: 'rgba(8,8,16,0.9)',
          border: '1px solid var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: isOpen ? '0 0 20px rgba(0,255,136,0.4)' : '0 0 10px rgba(0,255,136,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        <span style={{ fontSize: '20px' }}>{isOpen ? '×' : '🤖'}</span>
        {!isOpen && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse-dot 2s infinite'
          }} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '16px',
          width: 'min(320px, calc(100vw - 32px))',
          height: 'min(450px, calc(100vh - 120px))',
          background: 'rgba(8,8,16,0.95)',
          border: '1px solid var(--accent-dim)',
          borderRadius: '12px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,136,0.02)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(0,255,136,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'blink 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.1em' }}>
              NEXUS_AGENT
            </span>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              lineHeight: 1.5
            }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: m.role === 'user' ? 'rgba(0,255,136,0.1)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${m.role === 'user' ? 'var(--accent-dim)' : 'var(--border-subtle)'}`,
                padding: '10px 14px',
                borderRadius: '8px',
                color: m.role === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}>
                {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} style={{
            padding: '12px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            gap: '8px',
            background: 'rgba(0,0,0,0.2)'
          }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                outline: 'none',
                padding: '4px 8px'
              }}
            />
            <button type="submit" style={{
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              SEND
            </button>
          </form>
        </div>
      )}
    </>
  );
}
