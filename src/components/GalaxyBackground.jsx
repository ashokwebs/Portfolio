import { useRef, useEffect } from 'react';

export default function GalaxyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let stars = [];
    let shootingStars = [];
    let nebulae = [];
    let mouseX = 0, mouseY = 0;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      // Reduced star count for better performance
      const count = Math.min(400, Math.floor((canvas.width * canvas.height) / 4000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 3 + 0.5,
          size: Math.random() * 1.8 + 0.2,
          baseOpacity: Math.random() * 0.6 + 0.1,
          opacity: 0,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: randomStarColor(),
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.04,
        });
      }
      // Simplified Nebulae to be static performance-friendly circles
      nebulae = [];
      for (let i = 0; i < 3; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 100,
          color: ['rgba(0,255,136,', 'rgba(139,124,247,', 'rgba(0,212,255,'][i],
          opacity: Math.random() * 0.01 + 0.005,
          drift: Math.random() * 0.05,
        });
      }
    }

    function randomStarColor() {
      const colors = [
        '255,255,255',
        '200,220,255',
        '255,240,220',
        '180,200,255',
        '0,255,136',
        '139,124,247',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function spawnShootingStar() {
      if (Math.random() > 0.997) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          opacity: 1,
          life: 1,
        });
      }
    }

    function draw(time) {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Deep space background is now handled by CSS to save GPU cycles
      
      // Nebula clouds - Optimized to use solid translucent arcs instead of heavy radial gradients
      nebulae.forEach(n => {
        n.x += Math.sin(time * 0.0001 + n.drift) * 0.1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color + n.opacity + ')';
        ctx.fill();
      });

      // Stars
      stars.forEach(star => {
        // Parallax from mouse
        const px = (mouseX - canvas.width / 2) * star.z * 0.003;
        const py = (mouseY - canvas.height / 2) * star.z * 0.003;
        
        // Drift
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        star.opacity = star.baseOpacity + twinkle * 0.2;

        const drawX = star.x + px;
        const drawY = star.y + py;

        // Optimized Glow: Replaced expensive radial gradients with a simple translucent arc
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(drawX, drawY, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color},${star.opacity * 0.15})`;
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color},${Math.max(0, star.opacity)})`;
        ctx.fill();
      });

      // Shooting stars
      spawnShootingStar();
      shootingStars = shootingStars.filter(s => {
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.015;
        s.opacity = s.life;

        if (s.life <= 0) return false;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(
          s.x - Math.cos(s.angle) * s.length * s.life,
          s.y - Math.sin(s.angle) * s.length * s.life
        );
        // Optimized Shooting Star: Use simple stroke instead of linear gradient
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });

      // Mouse glow - Optimized to use a simple soft arc
      if (mouseX > 0 && mouseY > 0) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 150, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, 0.02)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', onMouseMove);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="galaxy-bg">
      <canvas ref={canvasRef} />
    </div>
  );
}
