import { useRef } from 'react';

export default function TiltCard({ children, options = {} }) {
  const cardRef = useRef(null);
  const frameRef = useRef(0);

  const maxTilt = options.max ?? 10;
  const scale = options.scale ?? 1.02;
  const perspective = options.perspective ?? 1000;
  const reverse = options.reverse ? -1 : 1;

  const updateTransform = (clientX, clientY) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const offsetX = (clientX - rect.left) / rect.width;
    const offsetY = (clientY - rect.top) / rect.height;
    const rotateY = (offsetX - 0.5) * maxTilt * 2 * reverse;
    const rotateX = (0.5 - offsetY) * maxTilt * 2 * reverse;

    card.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
  };

  const handlePointerMove = (event) => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      updateTransform(event.clientX, event.clientY);
    });
  };

  const resetTransform = () => {
    const card = cardRef.current;
    if (!card) return;

    cancelAnimationFrame(frameRef.current);
    card.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTransform}
      onPointerCancel={resetTransform}
      style={{
        height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 180ms ease-out',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
