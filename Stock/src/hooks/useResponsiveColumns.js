import { useTheme, useMediaQuery } from "@mui/material";

export function useResponsiveColumns(defaultCount = 4) {
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("sm"));
  const sm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  if (xs) return 1;
  if (sm) return Math.max(2, Math.floor(defaultCount / 2));
  return defaultCount;
}