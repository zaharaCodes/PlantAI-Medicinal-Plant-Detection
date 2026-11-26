import React, { useEffect, useRef } from 'react';

/**
 * High-performance 60fps Canvas engine for floating leaves and bioluminescent spores.
 * Features realistic botanical silhouettes, wind physics, and cursor interaction.
 */
export default function FloatingFoliage({ enabled = true }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Leaf generator
    const LEAF_COUNT = Math.min(26, Math.floor(window.innerWidth / 55));
    const leaves = [];
    const leafColors = [
      'rgba(16, 185, 129, 0.28)',  // Emerald
      'rgba(52, 211, 153, 0.22)',  // Mint
      'rgba(5, 150, 105, 0.25)',   // Deep Jade
      'rgba(132, 204, 22, 0.20)',  // Olive lime
      'rgba(45, 212, 191, 0.18)'   // Teal glow
    ];

    for (let i = 0; i < LEAF_COUNT; i++) {
      leaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 14 + 10,
        speedY: Math.random() * 0.45 + 0.25,
        speedX: (Math.random() - 0.5) * 0.3,
        swaySpeed: Math.random() * 0.02 + 0.008,
        swayAngle: Math.random() * Math.PI * 2,
        swayRadius: Math.random() * 1.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        type: Math.random() > 0.4 ? 'pointed' : 'oval'
      });
    }

    // Bioluminescent spores (floating upwards)
    const SPORE_COUNT = 32;
    const spores = [];
    for (let i = 0; i < SPORE_COUNT; i++) {
      spores.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.3 + 0.15),
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.04 + 0.02,
        pulsePhase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.4 + 0.2
      });
    }

    const drawLeaf = (leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);

      ctx.fillStyle = leaf.color;
      ctx.beginPath();

      const s = leaf.size;
      // Draw organic leaf using bezier curves
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.7, -s * 0.4, s * 0.6, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.6, s * 0.5, -s * 0.7, -s * 0.4, 0, -s);
      ctx.fill();

      // Delicate leaf center vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85);
      ctx.lineTo(0, s * 0.85);
      ctx.stroke();

      ctx.restore();
    };

    const drawSpore = (spore) => {
      const alpha = spore.baseAlpha + Math.sin(spore.pulsePhase) * 0.2;
      ctx.save();
      ctx.beginPath();
      ctx.arc(spore.x, spore.y, spore.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110, 231, 183, ${Math.max(0.05, alpha)})`;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render spores
      for (let i = 0; i < spores.length; i++) {
        const sp = spores[i];
        sp.y += sp.speedY;
        sp.x += sp.speedX;
        sp.pulsePhase += sp.pulseSpeed;

        if (sp.y < -20) {
          sp.y = height + 10;
          sp.x = Math.random() * width;
        }
        if (sp.x < -10) sp.x = width + 10;
        if (sp.x > width + 10) sp.x = -10;

        drawSpore(sp);
      }

      // Render leaves
      for (let i = 0; i < leaves.length; i++) {
        const lf = leaves[i];
        lf.swayAngle += lf.swaySpeed;
        lf.x += lf.speedX + Math.sin(lf.swayAngle) * lf.swayRadius;
        lf.y += lf.speedY;
        lf.rotation += lf.rotationSpeed;

        // Mouse avoidance / gentle wind ripple
        if (mouseRef.current.active) {
          const dx = lf.x - mouseRef.current.x;
          const dy = lf.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            lf.x += (dx / dist) * force * 3;
            lf.y += (dy / dist) * force * 2;
            lf.rotation += 0.05;
          }
        }

        // Screen wraps
        if (lf.y > height + 30) {
          lf.y = -30;
          lf.x = Math.random() * width;
        }
        if (lf.x < -40) lf.x = width + 30;
        if (lf.x > width + 40) lf.x = -30;

        drawLeaf(lf);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
}
