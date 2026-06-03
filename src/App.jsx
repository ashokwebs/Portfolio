import { useState, useEffect, Suspense, lazy, Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useSoundEffects } from './hooks/useSoundEffects';
import GalaxyBackground from './components/GalaxyBackground';
import { SideDock, TopBar } from './components/Navigation';
import CommandPalette from './components/CommandPalette';
import BootSequence from './components/BootSequence';
import FloatingAI from './components/FloatingAI';
import { TelemetryProvider } from './context/TelemetryContext';
import { ThemeProvider } from './context/ThemeContext';
import CrimsonGame from './components/CrimsonGame';

// Lazy loaded pages for massive performance boost
const HomePage = lazy(() => import('./pages/Home'));
const IdentityPage = lazy(() => import('./pages/Identity'));
const ProjectsPage = lazy(() => import('./pages/Projects'));
const SkillsPage = lazy(() => import('./pages/Skills'));
const { SystemsLab, CyberSecurity, Roadmap, Web3Trading, Research, Writing, Services } = await import('./pages/SubPages'); // using await import to unpack named exports for lazy loading is tricky, let's create a proxy component for each.
// Actually, it's cleaner to lazy load them like this:
const SystemsLabPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.SystemsLab })));
const CyberSecurityPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.CyberSecurity })));
const Web3TradingPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.Web3Trading })));
const ResearchPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.Research })));
const WritingPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.Writing })));
const ServicesPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.Services })));
const RoadmapPage = lazy(() => import('./pages/SubPages').then(module => ({ default: module.Roadmap })));

const ContactPage = lazy(() => import('./pages/Contact'));
const TerminalPage = lazy(() => import('./pages/Terminal'));
const ClassifiedPage = lazy(() => import('./pages/Classified'));
const AboutYouPage = lazy(() => import('./pages/AboutYou'));
const BreachPage = lazy(() => import('./pages/Breach'));

// Global Error Boundary
class GlobalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Global crash:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          height: '100vh', width: '100vw', background: '#050508', 
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', color: '#ff5f57', textAlign: 'center', padding: '40px'
        }}>
          <h1 style={{ fontSize: '24px', marginBottom: '16px', letterSpacing: '0.1em' }}>[ SYSTEM KERNEL PANIC ]</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>A critical failure occurred in the UI thread.</p>
          <div style={{ 
            background: 'rgba(255, 95, 87, 0.1)', border: '1px solid #ff5f57', 
            padding: '24px', borderRadius: '8px', maxWidth: '600px',
            fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all', textAlign: 'left'
          }}>
            {this.state.error?.toString()}
          </div>
          <button 
            onClick={() => window.location.reload()}
            style={{ 
              marginTop: '32px', background: 'transparent', border: '1px solid #ff5f57', 
              color: '#ff5f57', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer',
              fontFamily: 'inherit', letterSpacing: '0.1em'
            }}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Scanline overlay
const Scanline = () => <div className="scanline-overlay" />;
const Noise = () => <div className="noise-overlay" />;

// Main layout wrapper
function Layout({ children, onOpenCmd }) {
  const location = useLocation();
  const isTerminal = location.pathname === '/terminal';
  const isHome = location.pathname === '/';

  if (isTerminal) return children;

  return (
    <>
      <TopBar onOpenCmd={onOpenCmd} />
      <SideDock />
      <main className="main-content">
        <div key={location.pathname} className="page-enter">
          <Suspense fallback={<div className="page-loader">[ ALLOCATING MEMORY... ]</div>}>
            {children}
          </Suspense>
        </div>
      </main>
    </>
  );
}

function AppContent() {
  const [cmdOpen, setCmdOpen] = useState(false);
  const [booted, setBooted] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  
  useSoundEffects();

  useEffect(() => {
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    const handleKeyDown = (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setGlitchMode(true);
          console.log("%c[ EASTER EGG ] Konami Code Accepted. Initializing Glitch Protocol...", "color: #ff00ff; font-weight: bold;");
          setTimeout(() => setGlitchMode(false), 3000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('nexus-booted')) {
      setBooted(true);
    }
    
    // EASTER EGG: Fake Developer Logs
    console.log("%c[ NEXUS://OS ] KERNEL INITIALIZED", "color: #00ff88; font-size: 16px; font-weight: bold;");
    console.log("%cCurious, aren't you? If you are reading this, you are a builder.", "color: #8b7cf7; font-size: 12px;");
    console.log("%cTry typing 'classified' into the Terminal.", "color: var(--text-ghost); font-size: 10px; font-style: italic;");
  }, []);

  return (
    <>
      <GalaxyBackground />
      <Scanline />
      <Noise />
      {glitchMode && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none', background: 'rgba(255,0,255,0.1)', mixBlendMode: 'difference', animation: 'blink 0.1s infinite' }} />
      )}
      
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      
      {booted && (
        <>
          <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />
          <Layout onOpenCmd={() => setCmdOpen(true)}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<IdentityPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/lab" element={<SystemsLabPage />} />
              <Route path="/cyber" element={<CyberSecurityPage />} />
              <Route path="/web3" element={<Web3TradingPage />} />
              <Route path="/research" element={<ResearchPage />} />
              <Route path="/writing" element={<WritingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/terminal" element={<TerminalPage />} />
              <Route path="/classified" element={<ClassifiedPage />} />
              <Route path="/about-you" element={<AboutYouPage />} />
              <Route path="/breach" element={<BreachPage />} />
            </Routes>
          </Layout>
          <FloatingAI />
          <CrimsonGame />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <GlobalErrorBoundary>
      <ThemeProvider>
        <TelemetryProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TelemetryProvider>
      </ThemeProvider>
    </GlobalErrorBoundary>
  );
}
