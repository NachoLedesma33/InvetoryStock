"use client";

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";

export const Cart = ({ open, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: "divider" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Carrito de compras
            </Typography>
            <IconButton onClick={onClose} size="small">
              <X size={20} />
            </IconButton>
          </Box>
        </Box>

        {cart.length === 0 ? (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography color="text.secondary">El carrito esta vacío</Typography>
          </Box>
        ) : (
          <List sx={{ flexGrow: 1, overflow: "auto", px: 2 }}>
            {cart.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  py: 2,
                }}
              >
                <Box sx={{ display: "flex", width: "100%", mb: 2 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "background.default",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        padding: "8px",
                      }}
                    />
                  </Box>
                  <Box sx={{ ml: 2, flex: 1 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500 }}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "background.default",
                    borderRadius: 1,
                    p: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      updateQuantity(item.id, Math.max(0, item.quantity - 1))
                    }
                  >
                    <Minus size={16} />
                  </IconButton>
                  <Typography
                    sx={{ mx: 2, minWidth: "20px", textAlign: "center" }}
                  >
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ ml: "auto" }}
                  >
                    <Trash2 size={16} />
                  </IconButton>
                </Box>
                <Divider sx={{ mt: 2 }} />
              </ListItem>
            ))}
          </List>
        )}

        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary.main">
              ${total.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            fullWidth
            disabled={cart.length === 0}
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Verificar
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
