import React from "react";

const MentoraLogo = () => {
  return (
    <div className="flex items-center justify-center gap-3 mb-16">
      {/* Logo Icon */}
      <div className="w-12 h-12 bg-mentora-blue rounded-lg flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          {/* Geometric pattern inspired by the design */}
          <path
            d="M8 6L20 6M8 14L20 14M8 22L20 22M6 8L6 20M14 8L14 20M22 8L22 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
          <circle cx="18" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </div>

      {/* Logo Text */}
      <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">
        Mentora
      </h1>
    </div>
  );
};

export default MentoraLogo;
