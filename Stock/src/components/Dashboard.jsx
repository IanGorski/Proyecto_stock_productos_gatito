import { Box, Typography, Paper, Avatar, useTheme, Fade } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ErrorIcon from "@mui/icons-material/Error";
import { useMemo } from "react";

export default function Dashboard({ products, categories, onCategorySelect }) {
  const theme = useTheme();

  const totalStock = useMemo(
    () => products.reduce((acc, p) => acc + p.stock, 0),
    [products]
  );
  const stockLowCount = useMemo(
    () => products.filter((p) => p.stock <= 3 && p.stock > 0).length,
    [products]
  );
  const outOfStockCount = useMemo(
    () => products.filter((p) => p.stock === 0).length,
    [products]
  );
  const uncategorizedCount = useMemo(
    () => products.filter((p) => !p.categoryId).length,
    [products]
  );

  return (
    <Fade in>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <InventoryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="primary">
              {products.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Productos
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
            cursor: "pointer",
          }}
          onClick={() => onCategorySelect && onCategorySelect("Sin categoría")}
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <CategoryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="secondary">
              {categories.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categorías
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "warning.main" }}>
            <ErrorIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="warning.main">
              {stockLowCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock bajo (≤3)
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "error.main" }}>
            <ErrorIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="error.main">
              {outOfStockCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sin stock
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "grey.500" }}>
            <CategoryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="text.secondary">
              {uncategorizedCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sin categoría
            </Typography>
          </Box>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            minWidth: 170,
            bgcolor: theme.palette.background.paper,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: "info.main" }}>
            <InventoryIcon />
          </Avatar>
          <Box>
            <Typography variant="h6" color="info.main">
              {totalStock}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock total
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
}