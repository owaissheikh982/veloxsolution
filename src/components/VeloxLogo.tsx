import React from "react";

export function VeloxLogoIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="50 80 180 190" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoSharpGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E5A93C" />
          <stop offset="100%" stopColor="#916007" />
        </linearGradient>
        <linearGradient id="logoAiMatrix" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFA3" />
          <stop offset="100%" stopColor="#00B8FF" />
        </linearGradient>
      </defs>

      <style>
        {`
          @keyframes matrixGlitchIcon {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.9; }
          }
          .icon-dot { animation: matrixGlitchIcon 2s infinite ease-in-out; }
          .icon-dot-2 { animation-delay: 0.6s; }
          .icon-dot-3 { animation-delay: 1.2s; }
        `}
      </style>

      {/* Cyber Geometric Monogram */}
      <path 
        d="M 60,100 L 110,100 L 140,170 L 170,100 L 220,100 L 140,260 Z" 
        fill="url(#logoSharpGold)" 
      />
      
      {/* Floating AI Tech Coordinates (Matrix Dots) */}
      <circle cx="140" cy="85" r="5" fill="url(#logoAiMatrix)" className="icon-dot" />
      <circle cx="85" cy="180" r="4" fill="url(#logoAiMatrix)" className="icon-dot icon-dot-2" />
      <circle cx="195" cy="180" r="4" fill="url(#logoAiMatrix)" className="icon-dot icon-dot-3" />
      
      {/* Connection lines to dots */}
      <line x1="140" y1="85" x2="140" y2="130" stroke="#00B8FF" strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />
      <line x1="85" y1="180" x2="115" y2="180" stroke="#00FFA3" strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />
    </svg>
  );
}

export function VeloxLogoFull({ className = "w-full h-auto" }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 800 350" 
      className={className}
    >
      <defs>
        <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020205" />
          <stop offset="100%" stopColor="#0d0d1a" />
        </linearGradient>
        <linearGradient id="sharpGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="60%" stopColor="#E5A93C" />
          <stop offset="100%" stopColor="#916007" />
        </linearGradient>
        <linearGradient id="aiMatrix" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FFA3" />
          <stop offset="100%" stopColor="#00B8FF" />
        </linearGradient>
      </defs>

      <style>
        {`
          @keyframes matrixGlitchFull {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.9; }
          }
          .matrix-dot-full { animation: matrixGlitchFull 2s infinite ease-in-out; }
          .dot-2-full { animation-delay: 0.6s; }
          .dot-3-full { animation-delay: 1.2s; }
        `}
      </style>

      <rect width="100%" height="100%" fill="url(#bgGrad2)" rx="16" />

      <g transform="translate(40, 0)">
        {/* Cyber Geometric Monogram */}
        <path d="M 60,100 L 110,100 L 140,170 L 170,100 L 220,100 L 140,260 Z" fill="url(#sharpGold)" />
        
        {/* Floating AI Tech Coordinates (Matrix Dots) */}
        <circle cx="140" cy="85" r="5" fill="url(#aiMatrix)" className="matrix-dot-full" />
        <circle cx="85" cy="180" r="4" fill="url(#aiMatrix)" className="matrix-dot-full dot-2-full" />
        <circle cx="195" cy="180" r="4" fill="url(#aiMatrix)" className="matrix-dot-full dot-3-full" />
        
        {/* Connection lines to dots */}
        <line x1="140" y1="85" x2="140" y2="130" stroke="#00B8FF" strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />
        <line x1="85" y1="180" x2="115" y2="180" stroke="#00FFA3" strokeWidth="1" opacity="0.4" strokeDasharray="4,4" />

        {/* Typography */}
        <text x="270" y="170" fill="#ffffff" fontSize="46" fontFamily="'Segoe UI', Roboto, sans-serif" fontWeight="bold" letterSpacing="4px">
          VELOX <tspan fill="url(#aiMatrix)">SOLUTIONS</tspan>
        </text>
        <text x="272" y="210" fill="#ffffff" fontSize="13" fontFamily="Arial" letterSpacing="6px" opacity="0.5">
          FULL-SERVICE SOFTWARE HOUSE &amp; AI AGENCY
        </text>
      </g>
    </svg>
  );
}
