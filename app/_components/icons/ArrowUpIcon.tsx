'use client';

interface ArrowUpIconProps {
  className?: string;
}

export default function ArrowUpIcon({ className }: ArrowUpIconProps) {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.4998 20.8334V2.16675M11.4998 2.16675L2.1665 11.5001M11.4998 2.16675L20.8332 11.5001"
        stroke="#2B4C7E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

  );
}


