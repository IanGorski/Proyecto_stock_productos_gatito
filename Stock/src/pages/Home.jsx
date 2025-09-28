import { useState, useEffect, useMemo } from "react";
import ProductList from "../components/ProductList";
import ProductGrid from "../components/ProductGrid";
import ProductForm from "../components/ProductForm";
import CategoryManager from "../components/CategoryManager";
import SearchBar from "../components/SearchBar";
import Dashboard from "../components/Dashboard";
// import AddButton from "../components/AddButton";
import WaveBackground from "../components/WaveBackground";
import ProductDetailModal from "../components/ProductDetailModal";
import { Box, Typography, Paper, Switch, FormControlLabel, Button, Tabs, Tab } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";

function loadLocal(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export default function Home() {
  const [products, setProducts] = useState(() => loadLocal("products", []));
  const [categories, setCategories] = useState(() => loadLocal("categories", []));
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  const [editingProduct, setEditingProduct] = useState(null);
  const [orderBy, setOrderBy] = useState("name");
  const [orderDir, setOrderDir] = useState("asc");
  const [stockFilter, setStockFilter] = useState("all"); // all, low, zero
  const [darkMode, setDarkMode] = useState(() => loadLocal("darkMode", false));
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [detailProduct, setDetailProduct] = useState(null);

  // Persistencia
  useEffect(() => { localStorage.setItem("products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("categories", JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem("darkMode", JSON.stringify(darkMode)); }, [darkMode]);

  // Filtros avanzados y ordenamiento
  const filteredProducts = useMemo(() => {
    let arr = [...products];
    arr = arr.filter(p => {
      let catName = "Sin categoría";
      if (p.categoryId) {
        const catObj = categories.find(cat => cat.id === p.categoryId);
        if (catObj) catName = catObj.name;
      }
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (catName && catName.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        categoryFilter === "Todas" ||
        (categoryFilter === "Sin categoría" && !p.categoryId) ||
        (catName === categoryFilter);
      return matchesSearch && matchesCategory;
    });
    if (stockFilter === "low") arr = arr.filter(p => p.stock <= 3 && p.stock > 0);
    if (stockFilter === "zero") arr = arr.filter(p => p.stock === 0);
    arr.sort((a, b) => {
      let aVal, bVal;
      if (orderBy === "name") {
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
      } else if (orderBy === "stock") {
        aVal = a.stock;
        bVal = b.stock;
      } else if (orderBy === "category") {
        const aCat = categories.find(cat => cat.id === a.categoryId)?.name || "Sin categoría";
        const bCat = categories.find(cat => cat.id === b.categoryId)?.name || "Sin categoría";
        aVal = aCat.toLowerCase();
        bVal = bCat.toLowerCase();
      }
      if (aVal < bVal) return orderDir === "asc" ? -1 : 1;
      if (aVal > bVal) return orderDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [products, categories, search, categoryFilter, orderBy, orderDir, stockFilter]);

  // Exportar a CSV
  const handleExport = () => {
    const headers = ["ID", "Nombre", "Descripción", "Stock", "Categoría", "Imagen"];
    const rows = products.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.description.replace(/"/g, '""')}"`,
      p.stock,
      categories.find(cat => cat.id === p.categoryId)?.name || "Sin categoría",
      p.image || ""
    ]);
    let csv = headers.join(",") + "\n" + rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "inventario.csv";
    a.click();
  };

  // Importar de CSV
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const text = evt.target.result;
      const lines = text.trim().split("\n");
      const [header, ...rest] = lines;
      const headers = header.split(",");
      const idx = Object.fromEntries(headers.map((h, i) => [h.trim().toLowerCase(), i]));
      const importedProducts = rest.map(line => {
        const cols = line.split(",");
        return {
          id: Number(cols[idx["id"]]),
          name: cols[idx["nombre"]]?.replace(/^"|"$/g, ""),
          description: cols[idx["descripción"]]?.replace(/^"|"$/g, ""),
          stock: Number(cols[idx["stock"]]),
          categoryId: (() => {
            const catName = cols[idx["categoría"]];
            if (!catName || catName === "Sin categoría") return null;
            let cat = categories.find(c => c.name === catName);
            if (!cat) {
              cat = { id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1, name: catName };
              setCategories(cats => [...cats, cat]);
            }
            return cat.id;
          })(),
          image: cols[idx["imagen"]] || "",
        };
      });
      setProducts(importedProducts);
      localStorage.setItem("products", JSON.stringify(importedProducts));
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#0984E3" },
      secondary: { main: "#E17055" },
      background: {
        default: darkMode ? "#212121" : "#FFF8F0",
        paper: darkMode ? "#333" : "#fff"
      },
    }
  }), [darkMode]);

  // handleAddProduct eliminado

  // SOLO UNA "Sin categoría" en los filtros:
  const filterCategories = [
    { id: null, name: "Sin categoría" },
    ...categories.filter(cat => cat.name.toLowerCase() !== "sin categoría")
  ];

  return (
    <ThemeProvider theme={theme}>
      <WaveBackground />
      <Box sx={{ px: 3, py: 2, minHeight: "100vh", position: "relative", zIndex: 1, bgcolor: "background.default" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormControlLabel
            control={<Switch checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />}
            label="Modo oscuro"
          />
          <Button
            startIcon={<DownloadIcon />}
            variant="outlined"
            sx={{ ml: 2, mr: 1 }}
            onClick={handleExport}
          >
            Exportar CSV
          </Button>
          <Button
            startIcon={<UploadIcon />}
            component="label"
            variant="outlined"
          >
            Importar CSV
            <input type="file" accept=".csv" hidden onChange={handleImport} />
          </Button>
        </Box>
        <Dashboard
          products={products}
          categories={categories}
          onCategorySelect={nombre => setCategoryFilter(nombre)}
        />
        {/* AddButton eliminado */}
        <Paper sx={{ p: 3, mb: 3, borderRadius: 4, boxShadow: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: "primary.main", fontWeight: 700 }}>
            Inventario
          </Typography>
          <CategoryManager
            categories={categories}
            setCategories={setCategories}
            products={products}
          />
          <ProductForm
            setProducts={setProducts}
            products={products}
            categories={categories}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
          />
          <SearchBar
            search={search}
            setSearch={setSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            categories={filterCategories}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderDir={orderDir}
            setOrderDir={setOrderDir}
            stockFilter={stockFilter}
            setStockFilter={setStockFilter}
            setViewMode={setViewMode}
            viewMode={viewMode}
          />
        </Paper>
        <Tabs value={viewMode} onChange={(e, v) => setViewMode(v)} sx={{ mb: 2 }}>
          <Tab label="Tabla" value="table" />
          <Tab label="Tarjetas" value="grid" />
        </Tabs>
        {viewMode === "table" ? (
          <ProductList
            products={filteredProducts}
            setProducts={setProducts}
            categories={categories}
            setEditingProduct={setEditingProduct}
            setDetailProduct={setDetailProduct}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            categories={categories}
            setDetailProduct={setDetailProduct}
          />
        )}
        <ProductDetailModal
          product={detailProduct}
          categories={categories}
          open={!!detailProduct}
          onClose={() => setDetailProduct(null)}
        />
      </Box>
    </ThemeProvider>
  );
}