import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

/**
 * Animated Living Botanical Mascot Illustration.
 * Pure vector SVG with multilayered organic sway, glowing aura, and interactive reactivity.
 */
export default function AnimatedPlantHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  return (
    <div 
      className="plant-hero-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setClickCount(c => c + 1)}
      title="Click or hover to interact with the living botanical specimen"
    >
      <div className="plant-hero-glow" style={{ transform: isHovered ? 'scale(1.15)' : 'scale(1)' }} />
      
      <svg
        className={`plant-hero-svg ${isHovered ? 'hovered' : ''}`}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="emeraldStem" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#047857" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="leafGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="leafGradLeft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>
          <linearGradient id="leafGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="potGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="potRim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient bioluminescent spore particles */}
        <circle className="bio-particle p1" cx="80" cy="90" r="3" fill="#6EE7B7" opacity="0.6" />
        <circle className="bio-particle p2" cx="210" cy="70" r="2.5" fill="#34D399" opacity="0.7" />
        <circle className="bio-particle p3" cx="190" cy="140" r="2" fill="#A7F3D0" opacity="0.5" />
        <circle className="bio-particle p4" cx="70" cy="160" r="2" fill="#6EE7B7" opacity="0.5" />

        {/* Futuristic Pot Base */}
        <g className="pot-group" transform="translate(0, 0)">
          {/* Pot Shadow */}
          <ellipse cx="140" cy="245" rx="55" ry="12" fill="rgba(0,0,0,0.5)" filter="blur(6px)" />
          {/* Main Pot Vessel */}
          <path
            d="M95 190 L108 238 C110 242 116 245 140 245 C164 245 170 242 172 238 L185 190 Z"
            fill="url(#potGrad)"
            stroke="rgba(16, 185, 129, 0.4)"
            strokeWidth="1.5"
          />
          {/* Soil Surface */}
          <ellipse cx="140" cy="190" rx="45" ry="9" fill="#141923" stroke="#047857" strokeWidth="1" />
          {/* Glowing Cyber Rim */}
          <path
            d="M92 188 C92 184 114 181 140 181 C166 181 188 184 188 188 C188 192 166 195 140 195 C114 195 92 192 92 188 Z"
            fill="none"
            stroke="url(#potRim)"
            strokeWidth="2.5"
            filter="url(#neonBlur)"
          />
          {/* Neon Emblem on Pot */}
          <path
            d="M140 205 L144 212 L140 219 L136 212 Z"
            fill="#10B981"
            opacity="0.8"
            filter="url(#neonBlur)"
          />
        </g>

        {/* Central Stem Group with Sway */}
        <g className="stem-root-group">
          {/* Main central stem */}
          <path
            className="stem-main"
            d="M140 190 C139 160, 142 120, 140 70"
            stroke="url(#emeraldStem)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Left Branch */}
          <path
            className="stem-branch-left"
            d="M140 148 C128 140, 105 132, 92 120"
            stroke="url(#emeraldStem)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Right Branch */}
          <path
            className="stem-branch-right"
            d="M140 128 C155 120, 175 116, 192 102"
            stroke="url(#emeraldStem)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Lower Left Leaf */}
          <g className="leaf-anim leaf-lower-left" transform="translate(90, 120)">
            <path
              d="M0 0 C-25 -8, -48 10, -52 35 C-32 40, -10 25, 0 0 Z"
              fill="url(#leafGradLeft)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
            {/* Vein */}
            <path d="M0 0 C-18 12, -35 22, -48 33" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            <path d="M-15 10 L-22 6" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <path d="M-28 18 L-35 15" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          </g>

          {/* Lower Right Leaf */}
          <g className="leaf-anim leaf-lower-right" transform="translate(192, 102)">
            <path
              d="M0 0 C25 -10, 48 5, 54 28 C36 34, 12 22, 0 0 Z"
              fill="url(#leafGradRight)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
            {/* Vein */}
            <path d="M0 0 C18 10, 36 18, 50 26" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            <path d="M16 8 L22 4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
            <path d="M28 15 L36 12" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
          </g>

          {/* Middle Left Leaf */}
          <g className="leaf-anim leaf-mid-left" transform="translate(140, 105)">
            <path
              d="M0 0 C-28 -15, -45 -5, -55 12 C-38 18, -18 12, 0 0 Z"
              fill="url(#leafGradMain)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
            <path d="M0 0 C-22 3, -38 7, -50 11" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          </g>

          {/* Middle Right Leaf */}
          <g className="leaf-anim leaf-mid-right" transform="translate(140, 90)">
            <path
              d="M0 0 C28 -18, 48 -8, 56 10 C38 16, 16 10, 0 0 Z"
              fill="url(#leafGradRight)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.8"
            />
            <path d="M0 0 C22 2, 40 5, 52 9" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          </g>

          {/* Top Crown Herb / Sprout Leaf */}
          <g className="leaf-anim leaf-top-crown" transform="translate(140, 68)">
            <path
              d="M0 0 C-18 -26, -5 -50, 0 -58 C5 -50, 18 -26, 0 0 Z"
              fill="url(#leafGradMain)"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1"
            />
            {/* Center spine */}
            <path d="M0 0 L0 -54" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
            {/* Dewdrop reflection */}
            <circle cx="2" cy="-32" r="2.2" fill="#FFFFFF" opacity="0.8" />
            <circle cx="-1" cy="-20" r="1.5" fill="#FFFFFF" opacity="0.6" />
          </g>
        </g>
      </svg>

      {/* Floating Sparkle Badge */}
      <div className="hero-interaction-badge">
        <Sparkles size={14} color="#34D399" />
        <span>Living Specimen {clickCount > 0 ? `• Nurtured ${clickCount}x` : '• Interactive'}</span>
      </div>
    </div>
  );
}
