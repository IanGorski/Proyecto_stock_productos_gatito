import "./CatLogo.css";
import { Avatar } from "@mui/material";

export default function CatLogo() {
  return (
    <Avatar alt="Logo Gatito" className="cat-logo">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <ellipse cx="16" cy="20" rx="10" ry="7" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
        <polygon points="8,13 6,6 12,10" fill="#1976d2"/>
        <polygon points="24,13 26,6 20,10" fill="#1976d2"/>
        <circle cx="13" cy="19" r="2" fill="#1976d2"/>
        <circle cx="19" cy="19" r="2" fill="#1976d2"/>
        <path d="M13 23 Q16 26 19 23" stroke="#1976d2" strokeWidth="2" fill="none"/>
      </svg>
    </Avatar>
  );
}