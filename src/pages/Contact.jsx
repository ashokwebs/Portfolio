import { useState } from 'react';
import { personal } from '../data/content';

const initialFormData = {
  name: '',
  email: '',
  message: '',
  'bot-field': '',
};

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [formState, setFormState] = useState('idle'); // idle, sending, sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState === 'sending') return;

    setFormState('sending');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({ 'form-name': 'contact', ...formData }),
      });

      if (!response.ok) {
        throw new Error('Netlify form submission failed.');
      }

      setFormState('sent');
      setFormData(initialFormData);
      setTimeout(() => setFormState('idle'), 3000);
    } catch {
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <div className="page" style={{ maxWidth: '900px' }}>
      <div className="section-header">
        <div className="section-num">07</div>
        <div className="section-title">Establish Connection</div>
        <div className="section-line"></div>
      </div>

      <div className="grid-2" style={{ gap: '64px', alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.8 }}>
            I'm always open to interesting projects, technical conversations, and collaboration opportunities. Whether you need a developer, a technical co-founder, or just want to exchange ideas — reach out.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href={`mailto:${personal.email}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--accent-dim)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                ✉
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Encrypted Email</div>
                <div style={{ fontWeight: 600 }}>{personal.email}</div>
              </div>
            </a>

            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                ⌥
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>GitHub</div>
                <div style={{ fontWeight: 600 }}>github.com/ashokwebs</div>
              </div>
            </a>

            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(139,124,247,0.1)', color: 'var(--accent-tertiary)', border: '1px solid rgba(139,124,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                ◈
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>LinkedIn Network</div>
                <div style={{ fontWeight: 600 }}>ashok-raj-p</div>
              </div>
            </a>
          </div>
        </div>

        <form className="card" style={{ padding: '32px' }} onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <div style={{ display: 'none' }}>
            <label>
              Do not fill this field if you are human.
              <input name="bot-field" value={formData['bot-field']} onChange={handleChange} />
            </label>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }} />
              Direct Transmission
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-ghost)', marginBottom: '8px', textTransform: 'uppercase' }}>Identification</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name / Alias" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-ghost)', marginBottom: '8px', textTransform: 'uppercase' }}>Return Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" style={{ width: '100%', padding: '12px 16px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none' }} />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-ghost)', marginBottom: '8px', textTransform: 'uppercase' }}>Payload</label>
              <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Transmission data..." style={{ width: '100%', height: '120px', padding: '12px 16px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', borderRadius: '8px', color: 'var(--text-primary)', outline: 'none', resize: 'none' }} />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={formState !== 'idle'}>
              {formState === 'idle' ? 'INITIATE TRANSFER →' : formState === 'sending' ? 'ENCRYPTING & SENDING...' : formState === 'sent' ? '✓ TRANSMISSION COMPLETE' : 'RETRY TRANSMISSION'}
            </button>
            {formState === 'sent' && (
              <p style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--accent)' }}>
                Message captured. Netlify will store the submission and forward it through your configured notifications.
              </p>
            )}
            {formState === 'error' && (
              <p style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#ff5f57' }}>
                Transmission failed. Check Netlify form settings after deployment and try again.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
