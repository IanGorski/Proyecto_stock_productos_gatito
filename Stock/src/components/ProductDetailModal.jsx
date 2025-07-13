import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Chip,
  Avatar,
  Fade,
  DialogActions,
  Button,
} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

export default function ProductDetailModal({ product, categories, open, onClose }) {
  if (!product) return null;

  const getCategoryName = (categoryId) => {
    if (!categoryId) return "Sin categoría";
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.name : "Sin categoría";
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Fade in={open}>
        <DialogTitle>
          Detalles de "{product.name}"
        </DialogTitle>
      </Fade>
      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          {product.image ? (
            <Avatar
              src={product.image}
              alt={product.name}
              variant="rounded"
              sx={{ width: 120, height: 120 }}
            />
          ) : (
            <Avatar sx={{ width: 120, height: 120 }}>
              <ErrorIcon fontSize="large" />
            </Avatar>
          )}
          <Box>
            <Chip
              label={`Stock: ${product.stock}`}
              color={product.stock === 0 ? "error" : product.stock <= 3 ? "warning" : "default"}
              size="medium"
              sx={{ mb: 1 }}
            />
            <Chip
              label={getCategoryName(product.categoryId)}
              color="secondary"
              size="medium"
              sx={{ mb: 1 }}
            />
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Descripción:</b> {product.description || "Sin descripción"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ID: {product.id}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}