// Side-view car as inline SVG. Each wheel is drawn around (0,0) inside a
// positioned <g>, so GSAP can spin it on its own centre.
function Wheel({ cx }) {
  return (
    <g transform={`translate(${cx} 126)`}>
      <g className="wheel">
        <circle r="31" fill="#10161f" />
        <circle r="17" fill="#d7dee6" />
        <path d="M0 -17V17M-17 0H17M-12 -12L12 12M12 -12L-12 12" stroke="#10161f" strokeWidth="3" />
      </g>
    </g>
  );
}

export default function Car() {
  return (
    <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" className="block h-auto w-full overflow-visible">
      <ellipse cx="212" cy="156" rx="190" ry="8" fill="#000" opacity=".18" />
      <path d="M18 118 Q18 90 50 84 L110 77 Q140 40 195 38 L272 38 Q312 42 336 74 L384 82 Q406 88 406 112 L406 124 L18 124 Z" fill="#ff5a36" />
      <path d="M134 74 Q156 51 192 49 L226 49 L226 76 Z" fill="#cfe6f5" />
      <path d="M238 49 L270 49 Q294 54 311 76 L238 76 Z" fill="#cfe6f5" />
      <rect x="388" y="92" width="18" height="9" rx="4" fill="#fff3b0" />
      <rect x="18" y="94" width="14" height="8" rx="3" fill="#b5200a" />
      <rect x="228" y="82" width="22" height="4" rx="2" fill="#b5200a" />
      <Wheel cx={98} />
      <Wheel cx={326} />
    </svg>
  );
}
