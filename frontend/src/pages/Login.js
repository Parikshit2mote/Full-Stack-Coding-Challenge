// frontend/src/pages/Login.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      // Decode token to route by role (basic way)
      const { role } = JSON.parse(atob(res.data.token.split(".")[1]));
      if (role === "ADMIN") navigate("/admin");
      else if (role === "OWNER") navigate("/store");
      else navigate("/user");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <LockOutlinedIcon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
          Login
        </Typography>
          </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 2, borderRadius: 3, fontWeight: 600, fontSize: 18 }}
            >
            Login
          </Button>
            <Button
              variant="text"
              color="inherit"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{ mt: 1, borderRadius: 3, fontWeight: 600, color: '#6b7280' }}
            >
              Don't have an account? Register
            </Button>
        </form>
        </Paper>
      </Container>
      </Box>
  );
};

export default Login;
