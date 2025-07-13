import { Box, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "#fff",
        py: 3,
        mt: 6,
        px: { xs: 2, md: 8 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        © 2025 Stock Gatito. Hecho con 🐾 por IanGorski.
      </Typography>
      <Box>
        <IconButton
          component={Link}
          href="https://github.com/IanGorski/"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://instagram.com/"
          target="_blank"
          rel="noopener"
          sx={{ color: "#fff" }}
        >
          <InstagramIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="mailto:contacto@tudominio.com"
          sx={{ color: "#fff" }}
        >
          <EmailIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Footer;