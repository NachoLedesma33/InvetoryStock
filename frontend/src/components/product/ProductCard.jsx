import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../../styles/theme";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  transition: theme.transitions.default,
  "&:hover": {
    boxShadow: theme.shadows.lg,
    transform: "translateY(-2px)",
  },
}));

const ProductCard = ({ product }) => {
  const { id, name, price, image, stock } = product;

  const handleAddToCart = () => {
    console.log("Agregando producto al carrito:", id);
  };

  return (
    <StyledCard>
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={name}
        sx={{
          objectFit: "cover",
          borderRadius: theme.borderRadius.lg,
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={2}>
          Stock: {stock}
        </Typography>
        <Typography variant="h6" color="primary">
          ${price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          sx={{
            mt: 2,
            width: "100%",
            borderRadius: theme.borderRadius.md,
          }}
        >
          Agregar al carrito
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ProductCard;
