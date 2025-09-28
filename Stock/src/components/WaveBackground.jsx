import "./WaveBackground.css";

export default function WaveBackground() {
  return (
    <div className="wave-bg">
      <svg viewBox="0 0 1440 120" style={{ width: "100%", height: "100%" }}>
        <path
          fill="var(--wave-color)"
          fillOpacity="1"
          d="M0,80 C360,140 1080,20 1440,80 L1440,0 L0,0 Z"
        ></path>
      </svg>
    </div>
  );
}