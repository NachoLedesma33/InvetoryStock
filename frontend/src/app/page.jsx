"use client";

import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Container,
} from "@mui/material";
import { Moon, Sun, ShoppingCart } from "lucide-react";
import { LoginForm } from "@/components/login/LoginForm";
import { ProductList } from "@/components/product/ProductList";
import { Cart } from "@/components/cart/Cart";
import { useStore } from "@/store/useStore";

function Page() {
  const { isAuthenticated, darkMode, toggleTheme, cart } = useStore();
  const [cartOpen, setCartOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#2563eb",
      },
      background: {
        default: darkMode ? "#111827" : "#f3f4f6",
        paper: darkMode ? "#1f2937" : "#ffffff",
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
            color: darkMode ? "#ffffff" : "#111827",
            boxShadow: "none",
            borderBottom: "1px solid",
            borderColor: darkMode ? "#374151" : "#e5e7eb",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  });

  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoginForm />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar position="sticky" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Fake Store
              </Typography>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  mr: 2,
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  },
                }}
              >
                {darkMode ? <Sun /> : <Moon />}
              </IconButton>
              <IconButton
                onClick={() => setCartOpen(true)}
                sx={{
                  "&:hover": {
                    backgroundColor: darkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Badge
                  badgeContent={cart.length}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#2563eb",
                      color: "#ffffff",
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
        <ProductList />
        <Cart open={cartOpen} onClose={() => setCartOpen(false)} />
      </Box>
    </ThemeProvider>
  );
}

export default Page;
