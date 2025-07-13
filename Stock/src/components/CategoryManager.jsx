import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function CategoryManager({
  categories,
  setCategories,
  products,
}) {
  const [name, setName] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    category: null,
  });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("El nombre de la categoría es obligatorio.");
      setOpenSnackbar(true);
      return;
    }
    if (trimmedName.toLowerCase() === "sin categoría") {
      setError('No se puede crear una categoría llamada "Sin categoría".');
      setOpenSnackbar(true);
      return;
    }
    if (
      categories.some(
        (cat) =>
          cat.name.toLowerCase() === trimmedName.toLowerCase() &&
          (!editingCategory || cat.id !== editingCategory.id)
      )
    ) {
      setError("Ya existe una categoría con ese nombre.");
      setOpenSnackbar(true);
      return;
    }
    if (editingCategory) {
      const updated = categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name: trimmedName } : cat
      );
      setCategories(updated);
      localStorage.setItem("categories", JSON.stringify(updated));
      setEditingCategory(null);
    } else {
      const newCat = {
        id: categories.length
          ? Math.max(...categories.map((c) => c.id)) + 1
          : 1,
        name: trimmedName,
      };
      const updated = [...categories, newCat];
      setCategories(updated);
      localStorage.setItem("categories", JSON.stringify(updated));
    }
    setName("");
  };

  const handleDelete = () => {
    const updated = categories.filter((cat) => cat.id !== deleteDialog.category.id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    setDeleteDialog({ open: false, category: null });
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Categorías
      </Typography>
      <Box component="form" onSubmit={handleAddOrEdit} sx={{ display: "flex", mb: 2 }}>
        <TextField
          label="Nombre categoría"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          sx={{ mr: 1 }}
        />
        <Button type="submit" variant="contained">
          {editingCategory ? "Editar" : "Agregar"}
        </Button>
        {editingCategory && (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ ml: 1 }}
            onClick={() => {
              setEditingCategory(null);
              setName("");
            }}
          >
            Cancelar
          </Button>
        )}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>
                <Tooltip title="Editar">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingCategory(cat);
                      setName(cat.name);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    color="error"
                    onClick={() =>
                      setDeleteDialog({ open: true, category: cat })
                    }
                    disabled={products.some((p) => p.categoryId === cat.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, category: null })}>
        <DialogTitle>
          ¿Seguro que quieres eliminar la categoría "{deleteDialog.category?.name}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, category: null })}>
            Cancelar
          </Button>
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar && !!error}
        autoHideDuration={2500}
        onClose={() => {
          setOpenSnackbar(false);
          setError("");
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
        * No se puede eliminar una categoría si tiene productos asignados.
      </Typography>
    </Box>
  );
}