'use client'

export default function Loading() {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-linear-to-br from-[#0c2419] via-[#081e13] to-[#04120a] text-[#FAFDF7]">
      {/* Background Decorative Animated Patterns / Leaves */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        {/* Floating Natural Patterns */}
        <div className="absolute top-10 left-10 h-48 w-48 animate-pulse rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-72 w-72 animate-pulse rounded-full bg-green-700/10 blur-3xl delay-700" />

        {/* Abstract Leaves silhouettes in corners */}
        <div className="absolute top-[-5%] left-[-5%] h-60 w-60 rounded-tl-[100px] border-t-2 border-l-2 border-dashed border-green-800/20" />
        <div className="absolute right-[-5%] bottom-[-5%] h-80 w-80 rounded-br-[150px] border-r-2 border-b-2 border-dashed border-green-800/20" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Animated Circular Progress & Leaf Emblem */}
        <div className="relative flex h-36 w-36 items-center justify-center md:h-40 md:w-40">
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/5 blur-xl" />

          {/* Outer Circular Loader Ring */}
          <svg
            className="absolute h-full w-full animate-spin"
            style={{ animationDuration: '3.5s' }}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="rgba(16, 185, 129, 0.05)"
              strokeWidth="3.5"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="url(#greenGradient)"
              strokeWidth="4"
              strokeDasharray="210"
              strokeDashoffset="75"
              strokeLinecap="round"
              fill="none"
              className="drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
            />
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#a3e635" />
              </linearGradient>
            </defs>
          </svg>

          {/* Inner Tracing Ring */}
          <div
            className="absolute h-[80%] w-[80%] animate-spin rounded-full border-2 border-t-[#a3e635]/60 border-r-transparent border-b-transparent border-l-transparent"
            style={{ animationDuration: '1.8s' }}
          />

          {/* Glowing Natural Leaf/Clover Brand Emblem (Center) */}
          <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-green-700/20 bg-[#0c2e1f] shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <svg
              className="h-8 w-8 animate-pulse text-green-400"
              style={{ animationDuration: '2s' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Natural clover/leaves configuration */}
              <path
                d="M12 2c0 2.5-1.5 4.5-4 4.5S4 4.5 4 2s1.5-2 4-2 4 .5 4 2z"
                transform="rotate(45 12 12)"
              />
              <path
                d="M12 2c0 2.5-1.5 4.5-4 4.5S4 4.5 4 2s1.5-2 4-2 4 .5 4 2z"
                transform="rotate(135 12 12)"
              />
              <path
                d="M12 2c0 2.5-1.5 4.5-4 4.5S4 4.5 4 2s1.5-2 4-2 4 .5 4 2z"
                transform="rotate(225 12 12)"
              />
              <path
                d="M12 2c0 2.5-1.5 4.5-4 4.5S4 4.5 4 2s1.5-2 4-2 4 .5 4 2z"
                transform="rotate(315 12 12)"
              />
              <circle cx="12" cy="12" r="1.5" fill="#a3e635" />
            </svg>
          </div>
        </div>

        {/* Brand Mantra (Fade In) */}
        <span className="mt-8 animate-pulse text-xs font-bold tracking-[0.25em] text-green-400/80 uppercase">
          Nurturing Your Path To Better Health
        </span>

        {/* Primary Load Message */}
        <h2 className="mt-3 text-xl font-black tracking-tight text-green-50 md:text-2xl">
          Preparing your personalized journey...
        </h2>

        {/* Progress Display */}
        <div className="mt-8 flex w-64 max-w-full flex-col items-center">
          {/* Subtle percentage & decorative visual */}
          <div className="relative mb-2 flex w-full items-center justify-between">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-green-800/60" />
            <span className="px-3 text-sm font-semibold text-green-400 select-none">
              Please Wait
            </span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-green-800/60" />
          </div>

          {/* Modern Slim Natural Progress Bar with leaf caps */}
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-green-950/80">
            <div className="absolute top-0 left-0 h-full animate-[loadingProgress_3s_ease-out_infinite] rounded-full bg-linear-to-r from-emerald-500 to-green-400" />
          </div>
        </div>
      </div>
    </div>
  )
}
