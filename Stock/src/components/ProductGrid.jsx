import { Box, Typography, Paper, Avatar, useTheme, Fade } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory2";
import CategoryIcon from "@mui/icons-material/Category";
import ErrorIcon from "@mui/icons-material/Error";
import PieChartIcon from "@mui/icons-material/PieChart";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ChartTooltip } from "recharts";
import { useMemo } from "react";

const COLORS = ["#0984E3", "#E17055", "#fdcb6e", "#00b894", "#636e72", "#d63031"];

export default function Dashboard({ products, categories, onCategorySelect }) {
  const theme = useTheme();

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

  // Data para gráfico de stock por categoría
  const stockByCategory = categories.map(cat => ({
    name: cat.name,
    value: products.filter(p => p.categoryId === cat.id).reduce((acc, p) => acc + p.stock, 0)
  })).concat([
    {
      name: "Sin categoría",
      value: products.filter(p => !p.categoryId).reduce((acc, p) => acc + p.stock, 0)
    }
  ]).filter(d => d.value > 0);

  return (
    <Fade in>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3, alignItems: "center" }}>
        <Paper elevation={3} sx={{
          p: 2, minWidth: 170, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2
        }}>
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
        <Paper elevation={3} sx={{
          p: 2, minWidth: 170, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2, cursor: "pointer"
        }} onClick={() => onCategorySelect && onCategorySelect("Sin categoría")}>
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
        <Paper elevation={3} sx={{
          p: 2, minWidth: 170, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2
        }}>
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
        <Paper elevation={3} sx={{
          p: 2, minWidth: 170, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2
        }}>
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
        <Paper elevation={3} sx={{
          p: 2, minWidth: 170, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2
        }}>
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
        <Paper elevation={3} sx={{
          p: 2, minWidth: 220, bgcolor: theme.palette.background.paper,
          display: "flex", alignItems: "center", gap: 2, flexDirection: "column"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ bgcolor: "info.main" }}>
              <PieChartIcon />
            </Avatar>
            <Typography variant="body2" color="text.secondary">
              Stock por categoría
            </Typography>
          </Box>
          <ResponsiveContainer width={160} height={120}>
            <PieChart>
              <Pie
                data={stockByCategory}
                dataKey="value"
                nameKey="name"
                innerRadius={30}
                outerRadius={55}
                paddingAngle={2}
                label={({ name }) => name}
              >
                {stockByCategory.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Fade>
  );
}