import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { projects } from '../data/content';
import { Tilt } from 'react-tilt';
import ForceGraph3D from 'react-force-graph-3d';
import { useTheme } from '../context/ThemeContext';

const tiltOptions = {
  reverse: true,
  max: 10,
  perspective: 1000,
  scale: 1.02,
  speed: 800,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

export default function ProjectsPage() {
  const { isCrimson } = useTheme();
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'matrix'
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const graphRef = useRef(null);

  const categories = ['All', ...new Set(projects.map(p => p.cat))];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.cat === filter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-item', { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (gridRef.current && viewMode === 'grid') {
      gsap.fromTo(
        gridRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out', overwrite: true }
      );
    }
  }, [filter, viewMode]);

  useEffect(() => {
    // Generate Graph Data
    const nodes = [];
    const links = [];
    
    // Core Node
    nodes.push({ id: 'root', name: 'NEXUS://CORE', group: 0, val: 10, color: isCrimson ? '#ff003c' : '#00ff88' });

    projects.forEach(p => {
      nodes.push({ id: p.title, name: p.title, group: 1, val: 5, color: isCrimson ? '#ff3366' : '#00d4ff' });
      links.push({ source: 'root', target: p.title });

      p.stack?.forEach(tech => {
        if (!nodes.find(n => n.id === tech)) {
          nodes.push({ id: tech, name: tech, group: 2, val: 2, color: isCrimson ? '#ff8c00' : '#8b7cf7' });
        }
        links.push({ source: p.title, target: tech });
      });
    });

    setGraphData({ nodes, links });
  }, [isCrimson]);

  return (
    <div className="page" ref={containerRef} style={{ display: 'flex', flexDirection: 'column', height: viewMode === 'matrix' ? '100vh' : 'auto' }}>
      <div className="section-header reveal-item">
        <div className="section-num">02</div>
        <div className="section-title">Project Archive</div>
        <div className="section-line"></div>
      </div>

      <div className="reveal-item" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '600px' }}>
            A selected log of architectural deployments, ranging from high-frequency AI orchestration layers to cryptographic vulnerability scanners.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                disabled={viewMode === 'matrix'}
                style={{
                  background: filter === cat ? 'var(--accent-dim)' : 'rgba(255, 255, 255, 0.02)',
                  border: `1px solid ${filter === cat ? 'var(--accent)' : 'var(--border-subtle)'}`,
                  color: filter === cat ? 'var(--accent)' : 'var(--text-secondary)',
                  padding: '6px 16px',
                  borderRadius: '100px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  cursor: viewMode === 'matrix' ? 'not-allowed' : 'pointer',
                  opacity: viewMode === 'matrix' ? 0.3 : 1,
                  transition: 'all 0.3s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div style={{ display: 'flex', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '4px', background: 'rgba(0,0,0,0.5)' }}>
          <button 
            onClick={() => setViewMode('grid')}
            style={{
              padding: '8px 16px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px',
              background: viewMode === 'grid' ? 'var(--accent-dim)' : 'transparent',
              color: viewMode === 'grid' ? 'var(--accent)' : 'var(--text-ghost)',
              transition: 'all 0.2s'
            }}>
            GRID
          </button>
          <button 
            onClick={() => setViewMode('matrix')}
            style={{
              padding: '8px 16px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px',
              background: viewMode === 'matrix' ? 'var(--accent-dim)' : 'transparent',
              color: viewMode === 'matrix' ? 'var(--accent)' : 'var(--text-ghost)',
              transition: 'all 0.2s'
            }}>
            NEURAL MATRIX
          </button>
        </div>
      </div>

      {viewMode === 'matrix' ? (
        <div className="reveal-item" style={{ flex: 1, minHeight: '500px', width: '100%', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--accent-dim)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 10, fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent)', pointerEvents: 'none' }}>
            [ LEFT CLICK: ROTATE ]<br/>
            [ SCROLL: ZOOM ]
          </div>
          <ForceGraph3D
            ref={graphRef}
            graphData={graphData}
            nodeAutoColorBy="group"
            nodeResolution={16}
            backgroundColor={isCrimson ? '#0a0002' : '#050508'}
            linkColor={() => isCrimson ? 'rgba(255,51,102,0.2)' : 'rgba(0,255,136,0.2)'}
            nodeColor={node => node.color}
            nodeLabel="name"
            width={document.querySelector('.main-content')?.clientWidth - 64 || 800}
            height={500}
            onNodeClick={node => {
              // Aim at node
              const distance = 100;
              const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
              graphRef.current.cameraPosition(
                { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
                node, // lookAt ({ x, y, z })
                3000  // ms transition duration
              );
            }}
          />
        </div>
      ) : (
        <div className="grid-2 reveal-item" ref={gridRef}>
          {filtered.map((project, i) => (
            <Tilt key={i} options={tiltOptions}>
              <div className="card" style={{ 
                height: '100%', display: 'flex', flexDirection: 'column',
                transformStyle: 'preserve-3d', padding: '32px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', transform: 'translateZ(30px)' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{project.title}</h3>
                  <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: '11px', whiteSpace: 'nowrap', marginLeft: '16px', background: 'var(--accent-dim)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                    {project.cat}
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, flex: 1, marginBottom: '24px', transform: 'translateZ(20px)' }}>
                  {project.desc}
                </p>
                
                <div style={{ transform: 'translateZ(40px)' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                    {project.stack?.map((t, j) => (
                      <span key={j} style={{
                        fontFamily: 'var(--font-mono)', fontSize: '11px',
                        color: 'var(--text-ghost)', background: 'var(--bg-elevated)',
                        padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-subtle)'
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {project.link !== '#' && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>[VIEW DEPLOYMENT]</span>
                      </a>
                    )}
                    {project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>[SOURCE CODE]</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Tilt>
          ))}
        </div>
      )}
    </div>
  );
}
