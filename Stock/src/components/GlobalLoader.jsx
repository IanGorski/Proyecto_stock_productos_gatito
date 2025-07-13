import { Backdrop, CircularProgress } from "@mui/material";
import { useUI } from "../context/UIcontext";

export default function GlobalLoader() {
  const { loading } = useUI();
  return (
    <Backdrop open={loading} sx={{ zIndex: 2000, color: "#fff" }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}