// frontend/src/pages/StoreDashboard.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Navbar from "../components/Navbar";
import API from "../services/api";

const StoreDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchRatings = async () => {
    try {
      const res = await API.get("/stores"); // get stores owned by the logged-in owner
      const ownerStore = res.data.find((s) => s.isMine); // backend should tag `isMine`
      if (ownerStore) {
        const [avgRes, ratingRes] = await Promise.all([
          API.get(`/ratings/${ownerStore.id}`),
          API.get(`/stores/${ownerStore.id}/ratings`),
        ]);
        setAverage(avgRes.data.average);
        setRatings(ratingRes.data);
      }
    } catch (err) {
      alert("Failed to fetch ratings");
    }
  };

  useEffect(() => {
    fetchRatings();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Store Ratings
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Average Rating: {parseFloat(average || 0).toFixed(2)}
          </Typography>

          <Paper sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ratings.map((rating) => (
                  <TableRow key={rating.id}>
                    <TableCell>{rating.name}</TableCell>
                    <TableCell>{rating.email}</TableCell>
                    <TableCell>{rating.rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default StoreDashboard;
