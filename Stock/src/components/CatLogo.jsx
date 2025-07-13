import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const AnimatedAvatar = styled(Avatar)(({ theme }) => ({
  width: 48,
  height: 48,
  background: theme.palette.secondary.main,
  marginRight: theme.spacing(2),
  animation: "cat-jump 1.4s infinite cubic-bezier(.68,-0.55,.27,1.55)",
  "@keyframes cat-jump": {
    "0%": { transform: "translateY(0)" },
    "20%": { transform: "translateY(-18px)" },
    "40%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(0)" },
  },
}));

export default function CatLogo() {
  return (
    <AnimatedAvatar alt="Logo Gatito">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <ellipse cx="16" cy="20" rx="10" ry="7" fill="#fff" stroke="#1976d2" strokeWidth="2"/>
        <polygon points="8,13 6,6 12,10" fill="#1976d2"/>
        <polygon points="24,13 26,6 20,10" fill="#1976d2"/>
        <circle cx="13" cy="19" r="2" fill="#1976d2"/>
        <circle cx="19" cy="19" r="2" fill="#1976d2"/>
        <path d="M13 23 Q16 26 19 23" stroke="#1976d2" strokeWidth="2" fill="none"/>
      </svg>
    </AnimatedAvatar>
  );
}