import { AppBar, Toolbar, Typography, Box, Badge } from "@mui/material";
import "./Navbar.css";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import CatLogo from "./CatLogo"; // <-- Acá puedo importar el logo del gatito animado

function Navbar({ products, categories }) {
  return (
    <AppBar position="static" color="primary" elevation={2} className="navbar">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center">
          <CatLogo /> {/* Aquí está tu gatito animado */}
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold", mr: 2 }}>
            Stock Gatito 
          </Typography>
          <Badge
            badgeContent={products.length}
            color="secondary"
            sx={{ ml: 2 }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <InventoryIcon sx={{ color: "#fff" }} />
          </Badge>
          <Badge
            badgeContent={categories.length}
            color="secondary"
            sx={{ ml: 2 }}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <CategoryIcon sx={{ color: "#fff" }} />
          </Badge>
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Sistema de inventario
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;