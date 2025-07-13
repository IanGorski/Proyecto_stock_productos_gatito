import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
  Avatar,
} from "@mui/material";

const initialForm = {
  id: null,
  name: "",
  description: "",
  stock: 1,
  categoryId: "",
  image: "",
};

export default function ProductForm({
  setProducts,
  products,
  categories,
  editingProduct,
  setEditingProduct,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    } else {
      setForm(initialForm);
    }
  }, [editingProduct]);

  const validate = () => {
    if (!form.name.trim()) return "El nombre es obligatorio";
    if (form.stock < 1) return "El stock debe ser al menos 1";
    return "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "stock" ? Math.max(1, Number(value)) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      setForm(prev => ({ ...prev, image: evt.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      setOpenSnackbar(true);
      return;
    }
    if (editingProduct && editingProduct.id != null) {
      const updatedProducts = products.map((p) =>
        p.id === form.id ? { ...form } : p
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setSuccess("Producto editado correctamente");
    } else {
      const newProduct = {
        ...form,
        id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      setSuccess("Producto agregado correctamente");
    }
    setError("");
    setOpenSnackbar(true);
    setForm(initialForm);
    if (setEditingProduct) setEditingProduct(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {editingProduct && editingProduct.id != null ? "Editar producto" : "Agregar producto"}
      </Typography>
      <TextField
        label="Nombre"
        name="name"
        value={form.name}
        onChange={handleInputChange}
        required
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={form.description}
        onChange={handleInputChange}
        multiline
        rows={2}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Stock"
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleInputChange}
        required
        fullWidth
        sx={{ mb: 2 }}
        inputProps={{ min: 1 }}
      />
      <TextField
        select
        label="Categoría"
        name="categoryId"
        value={form.categoryId}
        onChange={handleInputChange}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="">Sin categoría</MenuItem>
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Button component="label" variant="outlined" color="primary">
          {form.image ? "Cambiar imagen" : "Agregar imagen"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
        {form.image && (
          <Avatar
            src={form.image}
            alt={form.name}
            sx={{ width: 48, height: 48, ml: 2 }}
          />
        )}
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {editingProduct && editingProduct.id != null ? "Guardar cambios" : "Agregar"}
      </Button>
      {editingProduct && (
        <Button
          variant="outlined"
          color="secondary"
          sx={{ ml: 2 }}
          onClick={() => setEditingProduct(null)}
        >
          Cancelar
        </Button>
      )}
      <Snackbar
        open={openSnackbar && (error || success)}
        autoHideDuration={2500}
        onClose={() => {
          setOpenSnackbar(false);
          setError("");
          setSuccess("");
        }}
      >
        {error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          success && <Alert severity="success">{success}</Alert>
        )}
      </Snackbar>
    </Box>
  );
}