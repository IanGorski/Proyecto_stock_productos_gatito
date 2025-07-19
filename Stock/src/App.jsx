import { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WaveBackground from "./components/WaveBackground";
import Footer from "./components/Footer";

// Inicializar sin productos ni categorías
const initialCategories = [];
const initialProducts = [];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = () => {
    // Lógica para agregar un producto/formulario
    const newProduct = {
      id: products.length + 1,
      name: "Nuevo producto",
      description: "Descripción...",
      stock: 1,
      categoryId: 1,
    };
    setProducts([...products, newProduct]);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh", background: "#FFF8F0", display: "flex", flexDirection: "column" }}>
        <WaveBackground />
        <Navbar products={products} categories={categories} />
        <Box sx={{ position: "relative", zIndex: 1, flex: 1 }}>
          <Home
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            onAddProduct={handleAddProduct}
          />
        </Box>
        {/* ---- Footer ---- */}
        <Footer />
      </Box>
    </>
  );
}

export default App;