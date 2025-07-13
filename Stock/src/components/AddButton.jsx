import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({ onClick, label }) {
  return (
    <Fab
      color="primary"
      aria-label={label || "Agregar"}
      onClick={onClick}
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 100,
        boxShadow: 6,
      }}
    >
      <AddIcon />
    </Fab>
  );
}