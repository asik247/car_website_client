import React from 'react';

const RingLoader = () => {
  return (
    <div role="status" aria-label="Loading" className="relative h-28 w-28">
      {/* soft ambient halo, breathing behind the ring */}
      <div className="absolute inset-0 animate-pulse rounded-full  blur-xl [animation-duration:2s]" />

      <svg
        viewBox="0 0 100 100"
        className="relative h-full w-full origin-center animate-spin [animation-duration:1.4s]"
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fdba74" />
            <stop offset="55%" stopColor="#e8935a" />
            <stop offset="100%" stopColor="#c2410c" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          strokeWidth="4"
          className="stroke-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="264"
          stroke="url(#ringGradient)"
          className="animate-[chase_1.4s_cubic-bezier(0.65,0.05,0.36,1)_infinite] drop-shadow-[0_0_6px_rgba(232,147,90,0.55)]"
        />
        <circle cx="50" cy="8" r="3.6" className="fill-orange-100 drop-shadow-[0_0_4px_rgba(255,237,213,0.9)]" />
      </svg>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center  font-serif">
      <style>{`
        @keyframes chase {
          0% { stroke-dashoffset: 232; }
          50% { stroke-dashoffset: 60; }
          100% { stroke-dashoffset: 232; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-spin, [class*="animate-[chase"] {
            animation-duration: 3.2s !important;
          }
        }
      `}</style>
      <div className="flex flex-col items-center gap-7">
        <RingLoader />
        <span className="text-[13px] uppercase tracking-[0.28em] ">
          Loading<span className="not-italic text-orange-400">&hellip;</span>
        </span>
      </div>
    </div>
  );
};

export default Loading;