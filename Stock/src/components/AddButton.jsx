import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./AddButton.css";

export default function AddButton({ onClick, label }) {
  return (
    <Fab
      color="primary"
      aria-label={label || "Agregar"}
      onClick={onClick}
      className="add-button"
    >
      <AddIcon />
    </Fab>
  );
}