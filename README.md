# 🐾 Stock Productos Gatito
Sistema de Gestión de Stock para Tiendas.

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live-black?logo=vercel)](https://proyecto-stock-productos-gatito.vercel.app/)

> Versión desplegada: haz clic en el badge para abrir la aplicación en producción.

---

## 📖 Descripción del Proyecto
Stock Productos Gatito es una aplicación web moderna desarrollada con React y Vite, diseñada para optimizar la gestión de inventario de productos en tiendas. Permite controlar productos y categorías, visualizar el stock en tiempo real, y realizar búsquedas y filtrados de manera ágil y sencilla. La interfaz es intuitiva, responsiva y amigable, con un diseño inspirado en Material Design y detalles visuales únicos.

El sistema implementa persistencia local (localStorage), dashboards interactivos con métricas clave, y una arquitectura de componentes escalable y fácil de mantener.

---

## 🛠️ Tecnologías y Librerías Utilizadas
- React 19.x – Biblioteca principal para la UI
- Vite 7.x – Build tool y servidor de desarrollo rápido
- Material UI (MUI) 7 – Componentes de interfaz y theming
- Emotion (@emotion/react & styled) – Motor de estilos para MUI
- Recharts 3 – Gráfico circular (stock por categoría)
- MUI Icons – Iconografía
- ESLint 9 – Linting y calidad de código
- LocalStorage – Persistencia ligera cliente
- CSS (media queries, utilidades) – Ajustes responsivos y micro‑transiciones

---

## ✨ Características Implementadas

### 🏗️ Arquitectura
- Componentes reutilizables y separación clara de responsabilidades
- Theming con CSS Custom Properties
- Persistencia de datos con localStorage y sincronización automática
- Arquitectura modular y escalable
- Manejo de estado local optimizado con React Hooks

### 📊 Dashboard y Visualización
- Dashboard interactivo con métricas clave (productos, categorías, stock bajo, sin stock, sin categoría, stock total)
- Gráfico circular (pie) de distribución de stock por categoría (Recharts)
- (Pendiente) Gráfico de barras (mencionado previamente pero aún NO implementado)
- Búsqueda y filtrado en tiempo real
- Visualización responsiva adaptable a diferentes resoluciones

### 🗃️ Gestión de Datos
- CRUD completo para productos y categorías
- Búsqueda y ordenamiento multi‑criterio (nombre, stock, categoría)
- Importación y exportación de datos en CSV (incluye reconstrucción de categorías)
- (Aún no implementado) Paginación – actualmente se manejan todas las filas en memoria
- Validación básica de formularios y feedback vía Snackbar

### 📱 Diseño Responsivo
Mobile‑first. Puntos clave:
 - <400px: layout compacto (tipografías y paddings reducidos).
 - <600px: acciones y botones apilados.
 - 600px–<900px: 2 columnas (hook `useResponsiveColumns`).
 - ≥900px: grilla completa (4 columnas).
 - Tablas con scroll horizontal seguro en pantallas chicas.
 - Modo oscuro persistente + respeto de `prefers-color-scheme`.

### 🎨 Interfaz de Usuario
- Diseño minimalista inspirado en Material Design + paleta personalizada
- Tema claro + modo oscuro (toggle persistente)
- Transiciones suaves (hover en tarjetas y botones)
- Feedback visual inmediato (chips de estado, colores según stock)
- Diálogos de confirmación para acciones destructivas

---

## 🗂️ Estructura del Proyecto

```text
Stock/
├── public/
├── src/
│   ├── components/                 # UI y elementos funcionales (cada uno con su .css)
│   │   ├── AddButton.{jsx,css}        # Botón flotante añadir
│   │   ├── CategoryManager.{jsx,css}  # CRUD categorías
│   │   ├── CatLogo.{jsx,css}          # Logo / branding
│   │   ├── Dashboard.{jsx,css}        # Métricas + KPIs
│   │   ├── Footer.{jsx,css}           # Pie de página
│   │   ├── Navbar.{jsx,css}           # Barra superior
│   │   ├── ProductCard.{jsx,css}      # Tarjeta producto (vista grid)
│   │   ├── ProductDetailModal.{jsx,css} # Modal detalle
│   │   ├── ProductForm.{jsx,css}      # Formulario alta / edición
│   │   ├── ProductGrid.{jsx,css}      # Contenedor métricas + gráfico
│   │   ├── ProductItem.{jsx,css}      # Representación lista simple
│   │   ├── ProductList.{jsx,css}      # Tabla productos
│   │   ├── SearchBar.{jsx,css}        # Filtros y búsqueda
│   │   └── WaveBackground.{jsx,css}   # Fondo decorativo animado
│   ├── hooks/
│   │   └── useResponsiveColumns.js    # Columna dinámica según breakpoint
│   ├── pages/
│   │   └── Home.jsx                   # Vista principal (coordina estado)
│   ├── App.jsx                        # Setup raíz + theming
│   ├── main.jsx                       # Entry point React
│   ├── index.css                      # Estilos globales / overrides
│   └── theme.jsx                      # Tema y palette MUI
├── package.json                       # Dependencias y scripts
├── vite.config.js                     # Config Vite
├── eslint.config.js                   # Reglas ESLint
└── README.md                          # Este archivo

Nota: La aplicación vive dentro de la subcarpeta `Stock/` (el repositorio raíz no contiene `package.json`).
```

---

## 🎯 Funcionalidades Principales
- Dashboard con métricas de inventario
- Gráfico circular de stock por categoría
- CRUD productos y categorías (con restricciones de borrado seguro)
- Filtros: texto, categoría, estado de stock, orden dinámico, modo vista (tabla / tarjetas)
- Importación y exportación CSV
- Modo oscuro persistente
- Feedback visual según estado (chips y colores de stock)

---

## 🚧 Desafíos Técnicos Resueltos
1. Persistencia de Datos Local
   - Sin backend: sincronización incremental vía localStorage + normalización mínima
2. Visualización de Datos
   - Gráfico circular reactivo (Recharts) con datasets dinámicos
3. Gestión de Filtrado/Ordenamiento
   - Pipeline de filtros + orden estable sin dependencias externas de estado global
4. Import/Export CSV con Reconstrucción
   - Reconstrucción de categorías inexistentes al importar y saneamiento de comillas
5. UX Adaptativo
   - Ajustes para pantallas < 400px (diálogos, tablas compactas, chips)

---

## 🔧 Instalación y Desarrollo
```bash
# Clonar el repositorio
git clone https://github.com/IanGorski/proyecto-stock-productos-gatito.git
cd proyecto-stock-productos-gatito

# Ir a la carpeta de la app
cd Stock

# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build producción
npm run build

# Vista previa local del build
npm run preview

# Linting
npm run lint
```

### Persistencia
Los datos (productos, categorías, preferencia de modo oscuro) se guardan en `localStorage`. Un borrado de caché del navegador restablecerá el estado.

### Importación / Exportación CSV
- Exporta columnas: `ID, Nombre, Descripción, Stock, Categoría, Imagen`
- Importación recrea categorías faltantes y asigna `Sin categoría` cuando aplica.
> Sugerencia: realizar respaldo antes de importar para evitar sobrescribir datos accidentalmente.

---

## 📦 Distribución y Compatibilidad
- Navegadores modernos (Chrome, Firefox, Edge, Safari). No se testea IE.
- Resoluciones soportadas: 320px → 4K
- Renderizado client‑side (SPA pura)

---

## 🎨 Principios de Diseño Aplicados
- DRY: Reutilización de componentes (formularios, tablas, modales)
- KISS & YAGNI: Sin sobre‑ingeniería para el alcance actual
- Mobile First progresivo
- Accesibilidad básica: contraste y tamaños mínimos; (Pendiente) roles ARIA enriquecidos
- Performance: Memoización selectiva (useMemo), lightweight bundle (sin state managers externos)

---

## 📄 Licencia
Este proyecto está bajo la licencia MIT - ver el archivo LICENSE para más detalles.

---

## 🚀 Despliegue
La aplicación se despliega en **Vercel** usando un `vercel.json` en la raíz que:
```jsonc
{
   "installCommand": "cd Stock && npm install",
   "buildCommand": "cd Stock && npm run build",
   "outputDirectory": "Stock/dist",
   "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
Esto permite que la app (ubicada en la subcarpeta `Stock/`) se construya y sirva como SPA.

### Próximas mejoras de despliegue sugeridas
- Analizar división de código (code splitting) para reducir tiempo inicial de carga.
- Añadir meta tags (Open Graph / SEO) en `index.html`.
- Incorporar PWA (manifiesto + service worker) si se requiere trabajo offline.

---

## 👤 Autor
Desarrollado por Ian Gorski
📧 gorskiandev@gmail.com
🐙 GitHub: [@IanGorski](https://github.com/IanGorski/)

