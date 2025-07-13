import { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  Avatar,
  Box,
  MenuItem,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InventoryIcon from "@mui/icons-material/Inventory";

function ProductItem({ product, setProducts, products, categories, cardView }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editCategory, setEditCategory] = useState(product.category || "");
  const [editStock, setEditStock] = useState(product.stock);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Eliminar producto
  const handleDelete = () => {
    setProducts(products.filter((p) => p.id !== product.id));
    setSuccess("Producto eliminado.");
  };

  // Editar producto
  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleEditSave = () => {
    // Validaciones
    if (!editName.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (
      products.some(
        (p) =>
          p.id !== product.id &&
          p.name.toLowerCase() === editName.trim().toLowerCase()
      )
    ) {
      setError("Ya existe un producto con ese nombre.");
      return;
    }
    if (editStock === "" || isNaN(editStock) || Number(editStock) < 0) {
      setError("El stock debe ser un número positivo.");
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === product.id
          ? {
              ...p,
              name: editName.trim(),
              category: editCategory.trim(),
              stock: Number(editStock),
            }
          : p
      )
    );
    setEditOpen(false);
    setSuccess("Producto actualizado.");
  };

  const catObj = categories.find(cat => cat.name === product.category);

  // Card view
  if (cardView) {
    return (
      <Fade in>
        <Card elevation={6} sx={{ borderRadius: 3, bgcolor: "#fff", boxShadow: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2} gap={1}>
              <Avatar sx={{ bgcolor: "#1976d2", mr: 1 }}>
                <InventoryIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {product.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Categoría: <b>{product.category || "Sin categoría"}</b>
              {catObj && catObj.type && (
                <span style={{ marginLeft: 10 }}>
                  | Tipo: <b>{catObj.type}</b>
                </span>
              )}
            </Typography>
            <Typography variant="body1" color="success.main">
              Stock: {product.stock}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <IconButton
              aria-label="edit"
              onClick={handleEdit}
              sx={{ color: "#1976d2", borderRadius: 2 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              sx={{ color: "#d32f2f", borderRadius: 2 }}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
          {/* Modal de edición */}
          <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
            <DialogTitle>Editar producto</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <TextField
                label="Nombre"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                select
                label="Categoría"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="">Sin categoría</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
              {editCategory && categories.find(cat => cat.name === editCategory) && (
                <Box sx={{ mb: 2, ml: 1 }}>
                  <span style={{ color: "#616161" }}>
                    Tipo: <b>{categories.find(cat => cat.name === editCategory).type || "Sin tipo"}</b>
                  </span>
                </Box>
              )}
              <TextField
                label="Stock"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
                type="number"
                fullWidth
                inputProps={{ min: 0 }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
              <Button variant="contained" onClick={handleEditSave}>
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={!!error} autoHideDuration={3500} onClose={() => setError("")}>
            <Alert severity="error" sx={{ width: "100%" }} onClose={() => setError("")}>
              {error}
            </Alert>
          </Snackbar>
          <Snackbar open={!!success} autoHideDuration={2500} onClose={() => setSuccess("")}>
            <Alert severity="success" sx={{ width: "100%" }} onClose={() => setSuccess("")}>
              {success}
            </Alert>
          </Snackbar>
        </Card>
      </Fade>
    );
  }

  // Lista tradicional (por si la usas en otro lado)
  return (
    <>
      <Fade in>
        <Box>
          <Typography variant="body1">{product.name}</Typography>
        </Box>
      </Fade>
    </>
  );
}

export default ProductItem;