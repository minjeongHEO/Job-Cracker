interface SpinnerIconProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function SpinnerIcon({ width = 64, height = 64, className }: SpinnerIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
    >
      <g>
        <path
          d="M46.03,32c0,-2.751 2.233,-4.985 4.985,-4.985c2.751,0 4.985,2.234 4.985,4.985c0,2.751 -2.234,4.985 -4.985,4.985c-2.752,0 -4.985,-2.234 -4.985,-4.985Z"
          style={{ fill: '#d9d9d9' }}
        />
        <path
          d="M41.92,41.92c1.946,-1.945 5.105,-1.945 7.051,0c1.945,1.946 1.945,5.105 0,7.051c-1.946,1.945 -5.105,1.945 -7.051,0c-1.945,-1.946 -1.945,-5.105 0,-7.051Z"
          style={{ fill: '#b3b3b3' }}
        />
        <circle cx="32" cy="51.015" r="4.985" style={{ fill: '#8c8c8c' }} />
        <path
          d="M22.08,41.92c1.945,1.946 1.945,5.105 0,7.051c-1.946,1.945 -5.105,1.945 -7.051,0c-1.945,-1.946 -1.945,-5.105 0,-7.051c1.946,-1.945 5.105,-1.945 7.051,0Z"
          style={{ fill: '#666' }}
        />
        <path
          d="M17.97,32c0,2.751 -2.233,4.985 -4.985,4.985c-2.751,0 -4.985,-2.234 -4.985,-4.985c0,-2.751 2.234,-4.985 4.985,-4.985c2.752,0 4.985,2.234 4.985,4.985Z"
          style={{ fill: '#404040' }}
        />
        <path
          d="M22.08,22.08c-1.946,1.945 -5.105,1.945 -7.051,0c-1.945,-1.946 -1.945,-5.105 0,-7.051c1.946,-1.945 5.105,-1.945 7.051,0c1.945,1.946 1.945,5.105 0,7.051Z"
          style={{ fill: '#404040' }}
        />
        <circle cx="32" cy="12.985" r="4.985" />
      </g>
    </svg>
  );
}
