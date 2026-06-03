import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useTelemetry } from '../context/TelemetryContext';

export default function AboutYouPage() {
  const containerRef = useRef(null);
  const { telemetry, hasScanned } = useTelemetry();
  
  const [phase, setPhase] = useState('decrypting'); // decrypting, complete
  const [decryptProgress, setDecryptProgress] = useState(0);

  // Cinematic Sequences
  useEffect(() => {
    if (!hasScanned) return; // Wait for global telemetry to finish if they opened this page instantly

    if (phase === 'decrypting') {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15; // Fast decryption
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTimeout(() => setPhase('complete'), 300);
        }
        setDecryptProgress(Math.floor(progress));
      }, 50);
      return () => clearInterval(interval);
    }

    if (phase === 'complete') {
      const ctx = gsap.context(() => {
        gsap.from('.diag-panel', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)"
        });
        
        gsap.to('.radar-sweep', {
          rotation: 360,
          repeat: -1,
          duration: 4,
          ease: "linear"
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [phase, hasScanned]);

  return (
    <div className="page" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      
      <div className="section-header reveal-item" style={{ marginBottom: '24px' }}>
        <div className="section-num">sys</div>
        <div className="section-title">Visitor Diagnostics</div>
        <div className="section-line"></div>
      </div>

      {phase !== 'complete' || !hasScanned ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)' }}>
          <div style={{ 
            width: '120px', height: '120px', borderRadius: '50%', 
            border: '2px solid rgba(0,255,136,0.2)', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: '10px', borderRadius: '50%', borderTop: '2px solid var(--accent)', animation: 'spin 0.5s linear infinite' }} />
            {/* Decrypt glitch effect */}
            <div style={{ fontSize: '24px', color: 'var(--accent)', fontWeight: 'bold', animation: 'glitch 0.2s infinite' }}>{decryptProgress}%</div>
          </div>
          <h2 style={{ color: 'var(--text-primary)', letterSpacing: '0.2em', fontSize: '14px', marginBottom: '8px', animation: 'blink 1.5s infinite' }}>
            DECRYPTING STORED TELEMETRY...
          </h2>
          <p style={{ color: 'var(--text-ghost)', fontSize: '12px', textAlign: 'center', maxWidth: '400px', lineHeight: 1.6 }}>
            The system already gathered your data in the background. Unpacking localized variables, network topology, and hardware metrics.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI INTERPRETATION HEADER */}
          <div className="diag-panel" style={{
            background: 'rgba(0, 255, 136, 0.05)', border: '1px solid var(--accent)', 
            borderRadius: '12px', padding: '24px', display: 'flex', gap: '24px', alignItems: 'center',
            boxShadow: '0 0 30px rgba(0,255,136,0.1)'
          }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
               <div className="radar-sweep" style={{ position: 'absolute', top: '50%', left: '50%', width: '100%', height: '100%', background: 'conic-gradient(from 0deg, transparent 70%, rgba(0,255,136,0.5) 100%)', transformOrigin: '0 0' }} />
               <span style={{ fontSize: '24px', position: 'relative', zIndex: 1 }}>👁️</span>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', letterSpacing: '0.2em', marginBottom: '8px' }}>SYSTEM OBSERVATION</h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, margin: 0, fontFamily: 'var(--font-display)', letterSpacing: '0.02em', lineHeight: 1.5 }}>
                "{telemetry.aiInsight}"
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* HARDWARE PANEL */}
            <div className="diag-panel" style={{ background: 'rgba(10,12,18,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>// HARDWARE SPECS</h3>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <StatRow label="RENDERER (GPU)" value={telemetry.gpu} highlight />
                <StatRow label="COMPUTE CORES" value={`${telemetry.device.cores} Threads`} />
                <StatRow label="DEVICE MEMORY" value={`~${telemetry.device.memory} GB Allocated`} />
                <StatRow label="PLATFORM" value={telemetry.device.platform} />
                <StatRow label="RESOLUTION" value={telemetry.device.screenRes} />
                {telemetry.device.battery !== 'Unknown' && <StatRow label="POWER STATE" value={telemetry.device.battery} />}
              </div>
            </div>

            {/* NETWORK PANEL */}
            <div className="diag-panel" style={{ background: 'rgba(10,12,18,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>// NETWORK TOPOLOGY</h3>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-secondary)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <StatRow label="PUBLIC IPV4" value={telemetry.network.ip} highlight color="var(--accent-secondary)" />
                <StatRow label="LOCATION" value={telemetry.network.country} />
                <StatRow label="PROVIDER (ISP)" value={telemetry.network.isp} />
                <StatRow label="CONNECTION TYPE" value={telemetry.network.connection} />
                <StatRow label="EST. LATENCY" value={telemetry.network.latency} />
              </div>
            </div>

            {/* ENVIRONMENT PANEL */}
            <div className="diag-panel" style={{ background: 'rgba(10,12,18,0.8)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '24px', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.01)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>// ENVIRONMENT</h3>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-tertiary)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <StatRow label="DEVICE TYPE" value={telemetry.device.deviceType} />
                <StatRow label="TIMEZONE" value={telemetry.device.timezone} />
                <StatRow label="LANGUAGE" value={telemetry.device.lang} />
                {telemetry.device.heapLimit !== 'Unknown' && <StatRow label="JS HEAP LIMIT" value={telemetry.device.heapLimit} />}
                <StatRow label="USER AGENT" value={navigator.userAgent.split(' ')[0]} />
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Embedded CSS for this specific page animations */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes glitch { 
          0% { transform: translate(0); opacity: 1; }
          20% { transform: translate(-2px, 2px); opacity: 0.8; }
          40% { transform: translate(-2px, -2px); opacity: 0.9; }
          60% { transform: translate(2px, 2px); opacity: 1; }
          80% { transform: translate(2px, -2px); opacity: 0.8; }
          100% { transform: translate(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function StatRow({ label, value, highlight, color = "var(--accent)" }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dashed rgba(255,255,255,0.05)', paddingBottom: '6px' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '0.05em' }}>{label}</span>
      <span style={{ 
        fontFamily: 'var(--font-mono)', 
        fontSize: '12px', 
        color: highlight ? color : 'var(--text-primary)',
        textShadow: highlight ? `0 0 10px ${color}` : 'none',
        textAlign: 'right',
        maxWidth: '60%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }} title={value}>
        {value}
      </span>
    </div>
  );
}
