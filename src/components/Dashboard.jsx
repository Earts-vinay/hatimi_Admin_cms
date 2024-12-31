import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = ({ children }) => {
  const [selectedProperty, setSelectedProperty] = useState("");

  const handlePropertyChange = (event) => {
    setSelectedProperty(event.target.value);
  };

  const menuItems = [
    { text: "Front Desk", path: "/frontdesk" },
    { text: "Reservations", path: "/reservations" },
    { text: "Properties", path: "/properties" },
    { text: "Coupons", path: "/coupons" },
    { text: "Master", path: "/master" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        {/* Property Select Dropdown */}
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="property-select-label">Select Property</InputLabel>
            <Select
              labelId="property-select-label"
              id="property-select"
              value={selectedProperty}
              onChange={handlePropertyChange}
              label="Select Property"
            >
              <MenuItem value={1}>Property 1</MenuItem>
              <MenuItem value={2}>Property 2</MenuItem>
              <MenuItem value={3}>Property 3</MenuItem>
              <MenuItem value={4}>Property 4</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Menu items */}
        <List>
          {menuItems.map((item) => (
            <ListItem button component={Link} to={item.path} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ p: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Dashboard;
