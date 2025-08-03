# 🐾 Stock Productos Gatito
Sistema de Gestión de Stock para Tiendas.

---

## 📖 Descripción del Proyecto
Stock Productos Gatito es una aplicación web moderna desarrollada con React y Vite, diseñada para optimizar la gestión de inventario de productos en tiendas. Permite controlar productos y categorías, visualizar el stock en tiempo real, y realizar búsquedas y filtrados de manera ágil y sencilla. La interfaz es intuitiva, responsiva y amigable, con un diseño inspirado en Material Design y detalles visuales únicos.

El sistema implementa persistencia local (localStorage), dashboards interactivos con métricas clave, y una arquitectura de componentes escalable y fácil de mantener.

---

## 🛠️ Tecnologías y Librerías Utilizadas
- React 19.x – Framework principal para la UI
- Vite 7.x – Build tool y servidor de desarrollo
- Material UI – Componentes visuales y diseño
- ESLint – Linting y calidad de código
- CSS Custom Properties – Theming y variables CSS

---

## ✨ Características Implementadas

### 🏗️ Arquitectura
- Componentes reutilizables y separación clara de responsabilidades
- Theming con CSS Custom Properties
- Persistencia de datos con localStorage y sincronización automática
- Arquitectura modular y escalable
- Manejo de estado local optimizado con React Hooks

### 📊 Dashboard y Visualización
- Dashboard interactivo con métricas de stock y categorías
- Gráficos de barras y torta personalizados con SVG/Material UI
- Filtros temporales y búsqueda en tiempo real
- Visualización responsiva adaptable a diferentes resoluciones

### 🗃️ Gestión de Datos
- CRUD completo para productos y categorías
- Paginación inteligente y búsqueda por múltiples criterios
- Exportación de datos a CSV
- Validación de formularios y manejo de errores

### 📱 Diseño Responsivo
- Breakpoints específicos: 600px, 900px
- Interfaz adaptativa para tablets y dispositivos móviles
- Tablas y grids con scroll horizontal en dispositivos móviles
- Tipografía escalable y espaciado responsivo

### 🎨 Interfaz de Usuario
- Diseño minimalista con principios de Material Design
- Tema claro con alta legibilidad y contraste
- Animaciones suaves y transiciones CSS optimizadas
- Componentes interactivos con feedback visual inmediato
- Modales de confirmación para acciones críticas

---

## 🗂️ Estructura del Proyecto
Stock/
├── public/
├── src/

│   ├── components/         # Componentes reutilizables
│   │   ├── AddButton.jsx           # Botón flotante para agregar productos
│   │   ├── CategoryManager.jsx     # Gestión y edición de categorías
│   │   ├── CatLogo.jsx             # Logo animado del gatito
│   │   ├── Dashboard.jsx           # Panel de métricas y resumen de stock
│   │   ├── Footer.jsx              # Pie de página con créditos y enlaces
│   │   ├── Navbar.jsx              # Barra de navegación superior
│   │   ├── ProductCard.jsx         # Tarjeta visual de producto
│   │   ├── ProductDetailModal.jsx  # Modal con detalles ampliados del producto
│   │   ├── ProductForm.jsx         # Formulario para alta/edición de productos
│   │   ├── ProductGrid.jsx         # Vista en cuadrícula de productos
│   │   ├── ProductItem.jsx         # Item individual de producto en listas
│   │   ├── ProductList.jsx         # Listado de productos en formato tabla
│   │   ├── SearchBar.jsx           # Barra de búsqueda y filtrado
│   │   └── WaveBackground.jsx      # Fondo decorativo animado tipo onda
│   ├── hooks/                      # Custom hooks (lógica reutilizable)
│   │   └── useResponsiveColumns.js # Hook para columnas responsivas según pantalla
│   ├── pages/                      # Páginas principales de la app
│   │   └── Home.jsx                # Página principal con dashboard y productos
│   ├── App.jsx                     # Componente raíz, gestiona estado global
│   ├── main.jsx                    # Punto de entrada de la app React
│   ├── index.css                   # Estilos globales base
│   └── theme.jsx                   # Theming y variables de diseño
├── package.json                    # Dependencias y scripts del proyecto
├── vite.config.js                  # Configuración de Vite
├── eslint.config.js                # Configuración de ESLint
└── README.md                       # Documentación del proyecto

---

## 🎯 Funcionalidades Principales
- Dashboard con métricas de stock y categorías
- Gestión CRUD de productos y categorías
- Búsqueda y filtrado en tiempo real
- Interfaz responsiva y moderna
- Exportación de datos a CSV
- Animaciones y feedback visual

---

## 🚧 Desafíos Técnicos Resueltos
1. Persistencia de Datos Local
   - Sistema robusto con localStorage y estructura JSON jerarquizada
2. Visualización de Datos
   - Gráficos interactivos sin librerías pesadas externas
3. Responsive Design Complejo
   - Sistema de breakpoints con CSS Grid y Flexbox avanzado
4. Accesibilidad y UX
   - Contrastes adecuados, navegación por teclado y feedback visual

---

## 🔧 Instalación y Desarrollo
```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Linting de código
npm run lint
```

---

## 📦 Distribución y Compatibilidad
- Compatible con navegadores modernos (Chrome, Firefox, Edge, Safari)
- Adaptado para dispositivos móviles, tablets y escritorio
- Resoluciones: Desde 320px (móvil) hasta 4K+ (escritorio)

---

## 🎨 Principios de Diseño Aplicados
- DRY (Don't Repeat Yourself): Componentes reutilizables y funciones auxiliares
- SOLID: Separación de responsabilidades y extensibilidad
- Mobile First: Diseño responsive desde móviles hacia escritorio
- Accesibilidad: Contrastes adecuados y navegación por teclado
- Performance: Componentes optimizados y lazy loading donde aplique

---

## 📄 Licencia
Este proyecto está bajo la licencia MIT - ver el archivo LICENSE para más detalles.

---

## 👤 Autor
Desarrollado por Ian Gorski
📧 gorskiandev@gmail.com
🐙 GitHub: [@IanGorski](https://github.com/IanGorski/)
🐙 GitHub: [@IanGorski](https://github.com/IanGorski/)

