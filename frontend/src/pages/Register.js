// frontend/src/pages/Register.js
import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Paper } from "@mui/material";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <PersonAddAlt1Icon color="primary" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="h4" gutterBottom fontWeight={700} color="primary.main">
              Register
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
              label="Address"
              required
              onChange={(e) => setForm({ ...form, address: e.target.value })}
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
              Register
            </Button>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={() => navigate("/")}
              sx={{ mt: 1, borderRadius: 3, fontWeight: 600 }}
            >
              Already have an account? Login
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
