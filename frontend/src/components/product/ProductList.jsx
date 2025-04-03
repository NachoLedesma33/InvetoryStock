import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Container,
  TextField,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { ShoppingBag, Search } from "lucide-react";
import { useStore } from "@/store/useStore";

const API_URL = process.env.API_URL;

export const ProductList = () => {
  const { products, setProducts, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        fetch("https://fakestoreapi.com/products")
          .then((res) => res.json())
          .then((data) => setProducts(data));
      });
  }, [setProducts]);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: "12px", boxShadow: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            label="Buscar productos"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 1 }}>
                  <Search size={20} />
                </Box>
              ),
            }}
            sx={{
              borderRadius: "8px",
            }}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category === "all" ? "Todos" : category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "filled" : "outlined"}
                sx={{
                  fontWeight: 500,
                  cursor: "pointer",
                  "&.MuiChip-filled": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: "12px",
                boxShadow: 2,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 5,
                },
                cursor: "pointer",
              }}
              onClick={() => handleOpenDialog(product)}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
                sx={{
                  objectFit: "cover",
                  borderRadius: "12px 12px 0 0",
                  transition: "opacity 0.3s ease",
                  "&:hover": {
                    opacity: 0.9,
                  },
                }}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: "0.875rem",
                      mb: 2,
                      height: "3em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {product.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pt: 2,
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 700 }}
                  >
                    ${Number(product.price || 0).toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    startIcon={<ShoppingBag size={18} />}
                    sx={{
                      borderRadius: "8px",
                      textTransform: "none",
                      fontWeight: 600,
                      transition: "background 0.3s",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    }}
                  >
                    Agregar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.title}</DialogTitle>
            <DialogContent>
              <Typography variant="body1" color="text.secondary">
                {selectedProduct.description}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ fontWeight: 700, mt: 2 }}
              >
                ${Number(selectedProduct.price || 0).toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Cerrar
              </Button>
              <Button
                variant="contained"
                onClick={() => addToCart(selectedProduct)}
                startIcon={<ShoppingBag size={18} />}
              >
                Agregar al carrito
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};
