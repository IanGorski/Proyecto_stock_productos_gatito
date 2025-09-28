import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Avatar,
} from "@mui/material";
import "./ProductList.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

export default function ProductList({
  products,
  setProducts,
  categories,
  setEditingProduct,
  setDetailProduct,
}) {
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    product: null,
  });

  const handleDelete = () => {
    const updated = products.filter((p) => p.id !== deleteDialog.product.id);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setDeleteDialog({ open: false, product: null });
  };

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "Sin categoría";
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Sin categoría";
  };

  if (!products.length) {
    return (
      <Typography sx={{ mt: 2, fontStyle: "italic" }}>
        No hay productos para mostrar.
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 3, overflowX: "auto" }}>
      <Table className="product-table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Imagen</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
            <TableCell><strong>Stock</strong></TableCell>
            <TableCell><strong>Categoría</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.image ? (
                  <Avatar src={p.image} alt={p.name} variant="rounded" sx={{ width: 40, height: 40 }} />
                ) : (
                  <Avatar variant="rounded" sx={{ width: 40, height: 40, bgcolor: "grey.300" }} />
                )}
              </TableCell>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.description}</TableCell>
              <TableCell
                sx={{
                  color: p.stock === 0 ? "error.main" : p.stock <= 3 ? "warning.main" : "text.primary",
                  fontWeight: p.stock === 0 || p.stock <= 3 ? 700 : "normal",
                }}
              >
                {p.stock}
              </TableCell>
              <TableCell>{getCategoryName(p.categoryId)}</TableCell>
              <TableCell>
                <Tooltip title="Ver detalles">
                  <IconButton color="info" onClick={() => setDetailProduct(p)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar">
                  <IconButton color="primary" onClick={() => setEditingProduct(p)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar">
                  <IconButton
                    color="error"
                    onClick={() => setDeleteDialog({ open: true, product: p })}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, product: null })}>
        <DialogTitle>
          ¿Seguro que quieres eliminar el producto "{deleteDialog.product?.name}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, product: null })}>
            Cancelar
          </Button>
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}