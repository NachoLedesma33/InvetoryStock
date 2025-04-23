"use client";

import React, { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { useStore } from "@/store/useStore";
import { LogIn } from "lucide-react";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthenticated = useStore((state) => state.setAuthenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "user" && password === "password") {
      setAuthenticated(true);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontWeight: 700,
              background: "linear-gradient(45deg, #2563eb, #3b82f6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Bienvenido a la Fake Store
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inicie sesión para iniciar su compra
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 1.5,
              },
            }}
          />
          <Button
            fullWidth
            variant="contained"
            type="submit"
            startIcon={<LogIn size={20} />}
            sx={{
              mt: 3,
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            Iniciar sesión
          </Button>
          <Typography
            variant="caption"
            display="block"
            sx={{
              mt: 2,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Usar usuario: user / contraseña: password
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};
