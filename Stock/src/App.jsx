import { useState } from "react";
import { CssBaseline, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WaveBackground from "./components/WaveBackground";

// Inicializar sin productos ni categorías
const initialCategories = [];
const initialProducts = [];

function App() {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);

  const handleAddProduct = () => {
    // Aquí deberías mostrar un modal o formulario de agregar producto
    // Este ejemplo agrega un producto genérico (puedes eliminarlo si usas un modal/form)
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ position: "relative", minHeight: "100vh", background: "#FFF8F0" }}>
        <WaveBackground />
        <Navbar products={products} categories={categories} />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Home
            products={products}
            setProducts={setProducts}
            categories={categories}
            setCategories={setCategories}
            onAddProduct={handleAddProduct}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;