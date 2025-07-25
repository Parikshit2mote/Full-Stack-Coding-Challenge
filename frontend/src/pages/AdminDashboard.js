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
  TextField,
  Paper,
  Tabs,
  Tab,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  Grid,
  TableContainer,
} from "@mui/material";
import Navbar from "../components/Navbar";
import API from "../services/api";
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import StarIcon from '@mui/icons-material/Star';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [tab, setTab] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [stats, setStats] = useState({ userCount: 0, storeCount: 0, ratingCount: 0 });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "USER",
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [addStoreDialogOpen, setAddStoreDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });
  const [owners, setOwners] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      // Optionally handle error
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users", { params: filters });
      setUsers(res.data);
    } catch (err) {
      alert("Failed to fetch users");
    }
  };

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores", {
        params: { name: filters.name, address: filters.address },
      });
      setStores(res.data);
    } catch (err) {
      alert("Failed to fetch stores");
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await API.get("/users", { params: { role: "OWNER" } });
      setOwners(res.data);
    } catch (err) {
      setOwners([]);
    }
  };

  const handleAddUser = async () => {
    try {
      await API.post("/auth/register", newUser);
      setSnackbar({ open: true, message: "User created successfully!", severity: "success" });
      setAddDialogOpen(false);
      setNewUser({ name: "", email: "", address: "", password: "", role: "USER" });
      if (tab === 0) fetchUsers();
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to create user", severity: "error" });
    }
  };

  const handleAddStore = async () => {
    try {
      await API.post("/stores", newStore);
      setSnackbar({ open: true, message: "Store created successfully!", severity: "success" });
      setAddStoreDialogOpen(false);
      setNewStore({ name: "", email: "", address: "", owner_id: "" });
      fetchStores();
    } catch (err) {
      setSnackbar({ open: true, message: err?.response?.data?.message || "Failed to create store", severity: "error" });
    }
  };

  useEffect(() => {
    fetchStats();
    if (tab === 0) fetchUsers();
    else fetchStores();
    if (tab === 1) fetchOwners();
  }, [tab, filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Admin Dashboard
          </Typography>

          {/* Stats */}
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <PeopleIcon color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle1">Total Users</Typography>
                <Typography variant="h5">{stats.userCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <StoreIcon color="secondary" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle1">Total Stores</Typography>
                <Typography variant="h5">{stats.storeCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: "center", display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <StarIcon color="warning" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle1">Total Ratings</Typography>
                <Typography variant="h5">{stats.ratingCount}</Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Add Store Button */}
          {tab === 1 && (
            <Box mb={2}>
              <Button variant="contained" color="primary" onClick={() => setAddStoreDialogOpen(true)}>
                Add Store
              </Button>
            </Box>
          )}

          {/* Add User Button */}
          {tab === 0 && (
            <Box mb={2}>
              <Button variant="contained" color="primary" onClick={() => setAddDialogOpen(true)}>
                Add User
              </Button>
            </Box>
          )}

          <Paper sx={{ marginTop: 2, padding: 2 }}>
            <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
              <Tab label="Users" />
              <Tab label="Stores" />
            </Tabs>

            <Box mt={2} display="flex" gap={2} flexWrap="wrap">
              <TextField
                name="name"
                label="Filter by Name"
                onChange={handleFilterChange}
              />
              <TextField
                name="email"
                label="Filter by Email"
                onChange={handleFilterChange}
              />
              <TextField
                name="address"
                label="Filter by Address"
                onChange={handleFilterChange}
              />
              {tab === 0 && (
                <TextField
                  name="role"
                  label="Filter by Role"
                  onChange={handleFilterChange}
                />
              )}
            </Box>

            {tab === 0 ? (
              <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
              <Table>
                  <TableHead sx={{ backgroundColor: 'grey.100' }}>
                  <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Address</b></TableCell>
                      <TableCell><b>Role</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                      <TableRow key={user.id} hover>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.address}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            ) : (
              <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 2 }}>
              <Table>
                  <TableHead sx={{ backgroundColor: 'grey.100' }}>
                  <TableRow>
                      <TableCell><b>Name</b></TableCell>
                      <TableCell><b>Email</b></TableCell>
                      <TableCell><b>Address</b></TableCell>
                      <TableCell><b>Rating</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stores.map((store) => (
                      <TableRow key={store.id} hover>
                      <TableCell>{store.name}</TableCell>
                      <TableCell>{store.email}</TableCell>
                      <TableCell>{store.address}</TableCell>
                        <TableCell>{parseFloat(store.rating || 0).toFixed(1)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>

        {/* Add User Dialog */}
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  fullWidth
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Address"
                  fullWidth
                  value={newUser.address}
                  onChange={e => setNewUser({ ...newUser, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  value={newUser.password}
                  onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={newUser.role}
                    label="Role"
                    onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <MenuItem value="USER">User</MenuItem>
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="OWNER">Store Owner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={handleAddUser} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Add Store Dialog */}
        <Dialog open={addStoreDialogOpen} onClose={() => setAddStoreDialogOpen(false)}>
          <DialogTitle>Add New Store</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Store Name"
                  fullWidth
                  value={newStore.name}
                  onChange={e => setNewStore({ ...newStore, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  value={newStore.email}
                  onChange={e => setNewStore({ ...newStore, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Address"
                  fullWidth
                  value={newStore.address}
                  onChange={e => setNewStore({ ...newStore, address: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Owner</InputLabel>
                  <Select
                    value={newStore.owner_id}
                    label="Owner"
                    onChange={e => setNewStore({ ...newStore, owner_id: e.target.value })}
                    required
                  >
                    {owners.map((owner) => (
                      <MenuItem key={owner.id} value={owner.id}>
                        {owner.name} ({owner.email})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setAddStoreDialogOpen(false)}>
              Cancel
            </Button>
            <Button color="success" onClick={handleAddStore} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for feedback */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
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

export default AdminDashboard;
