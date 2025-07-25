// frontend/src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Snackbar, Alert, TextField, Grid, Stack } from "@mui/material";
import Navbar from "../components/Navbar";
import StoreCard from "../components/StoreCard";
import API from "../services/api";

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores", { params: filters });
      setStores(res.data);
    } catch (err) {
      setSnackbar({ open: true, message: "Failed to load stores", severity: "error" });
    }
  };

  const fetchUserRatings = async () => {
    try {
      // Try to fetch all ratings by the current user
      const res = await API.get("/ratings/user");
      // Assume response is [{ store_id, rating }]
      const ratingsMap = {};
      res.data.forEach(r => { ratingsMap[r.store_id] = r.rating; });
      setUserRatings(ratingsMap);
    } catch (err) {
      // If endpoint not available, fallback to empty
      setUserRatings({});
    }
  };

  const handleRating = async (storeId, value) => {
    try {
      await API.post("/ratings", { store_id: storeId, rating: value });
      setUserRatings({ ...userRatings, [storeId]: value });
      setSnackbar({ open: true, message: "Rating submitted!", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: "Error submitting rating", severity: "error" });
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchStores();
    fetchUserRatings();
  }, [filters]);

  return (
    <>
      <Navbar />
      <Container>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            All Stores
          </Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search by Name"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search by Address"
                name="address"
                value={filters.address}
                onChange={handleFilterChange}
              />
            </Grid>
          </Grid>
          <Stack spacing={2}>
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                userRating={userRatings[store.id] || null}
                onRate={handleRating}
              />
            ))}
          </Stack>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default UserDashboard;
