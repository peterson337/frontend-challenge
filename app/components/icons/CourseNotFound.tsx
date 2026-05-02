import React from "react";

export default function CourseNotFound() {
  return (
    <>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="20" y="20" width="60" height="70" rx="8" fill="#E5E7EB" />
        <rect x="30" y="35" width="40" height="6" rx="3" fill="#CBD5E1" />
        <rect x="30" y="50" width="30" height="6" rx="3" fill="#CBD5E1" />
        <rect x="30" y="65" width="35" height="6" rx="3" fill="#CBD5E1" />
        <circle
          cx="75"
          cy="75"
          r="20"
          stroke="#4B5563"
          strokeWidth="6"
          fill="none"
        />
        <line
          x1="88"
          y1="88"
          x2="105"
          y2="105"
          stroke="#4B5563"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
