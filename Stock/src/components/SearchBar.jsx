import { Box, TextField, MenuItem, ToggleButtonGroup, ToggleButton, Chip } from "@mui/material";
import "./SearchBar.css";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function SearchBar({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  categories,
  orderBy,
  setOrderBy,
  orderDir,
  setOrderDir,
  stockFilter,
  setStockFilter,
  setViewMode,
  viewMode,
}) {
  const categoryChips = [
    { label: "Todas", value: "Todas" },
    ...categories.map(cat => ({ label: cat.name, value: cat.name }))
  ];

  return (
    <Box className="search-bar">
      <TextField
        label="Buscar"
        value={search}
        onChange={e => setSearch(e.target.value)}
        fullWidth
        variant="outlined"
      />
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
        {categoryChips.map(chip => (
          <Chip
            key={chip.value}
            label={chip.label}
            color={categoryFilter === chip.value ? "primary" : "default"}
            variant={categoryFilter === chip.value ? "filled" : "outlined"}
            onClick={() => setCategoryFilter(chip.value)}
            sx={{ cursor: "pointer" }}
          />
        ))}
      </Box>
      <TextField
        select
        label="Stock"
        value={stockFilter}
        onChange={e => setStockFilter(e.target.value)}
        sx={{ minWidth: 140 }}
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="low">Stock bajo (≤3)</MenuItem>
        <MenuItem value="zero">Sin stock</MenuItem>
      </TextField>
      <ToggleButtonGroup
        value={orderBy}
        exclusive
        onChange={(e, value) => value && setOrderBy(value)}
        sx={{ ml: 2 }}
      >
        <ToggleButton value="name" size="small">
          <SortIcon fontSize="small" /> Nombre
        </ToggleButton>
        <ToggleButton value="stock" size="small">
          <SortIcon fontSize="small" /> Stock
        </ToggleButton>
        <ToggleButton value="category" size="small">
          <FilterAltIcon fontSize="small" /> Categoría
        </ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={orderDir}
        exclusive
        onChange={(e, value) => value && setOrderDir(value)}
        sx={{ ml: 1 }}
      >
        <ToggleButton value="asc" size="small">Asc</ToggleButton>
        <ToggleButton value="desc" size="small">Desc</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(e, value) => value && setViewMode(value)}
        sx={{ ml: 2 }}
      >
        <ToggleButton value="table" size="small">
          <TableRowsIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="grid" size="small">
          <ViewModuleIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}