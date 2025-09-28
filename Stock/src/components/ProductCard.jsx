import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import "./ProductCard.css";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function ProductCard({ product }) {
  return (
    <Card className="product-card" sx={{ maxWidth: 320, m: 2 }}>
      <CardMedia
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FDCB6E",
          height: 120,
        }}
      >
        <InventoryIcon sx={{ fontSize: 64, color: "#0984E3" }} />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" sx={{ color: "#0984E3", fontWeight: 700 }}>
          {product.name}
        </Typography>
        <Typography color="text.secondary">{product.description}</Typography>
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="success.main">
            Stock: {product.stock}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}