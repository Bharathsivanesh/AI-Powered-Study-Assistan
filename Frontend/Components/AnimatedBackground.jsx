function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#22C55E", stopOpacity: 0.05 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#10B981", stopOpacity: 0.05 }}
              />
            </linearGradient>
          </defs>
          <path
            d="M0,50 Q250,20 500,50 T1000,50 T1500,50 T2000,50 V0 H0 Z"
            fill="url(#gradient1)"
            className="animate-wave"
          />
          <path
            d="M0,70 Q200,40 400,70 T800,70 T1200,70 T1600,70 V0 H0 Z"
            fill="url(#gradient1)"
            className="animate-wave-slow"
            opacity="0.5"
          />
        </svg>
      </div>
    </div>
  );
}

export default AnimatedBackground;
