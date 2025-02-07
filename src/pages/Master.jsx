import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { fetchProperties } from "../redux/Slices/Properties/propertySlice"; // Adjust path based on your structure

const Master = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.properties);
  const [selectedProperty, setSelectedProperty] = useState("");

  // Retrieve selected property from localStorage on mount
  useEffect(() => {
    const savedProperty = localStorage.getItem("selected_property_name");
    if (savedProperty) {
      setSelectedProperty(savedProperty);
    }
  }, []);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (selectedProperty) {
      const selectedPropertyData = properties.find(
        (property) => property.property_name === selectedProperty
      );

      if (selectedPropertyData?.property_uid) {
        localStorage.setItem("property_uid", selectedPropertyData.property_uid);
        localStorage.setItem("selected_property_name", selectedProperty); // Save property name as well
      }
    }
  }, [selectedProperty, properties]);

  const handlePropertyChange = (event) => {
    const selectedPropertyName = event.target.value;
    setSelectedProperty(selectedPropertyName);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Select Property</InputLabel>
      <Select value={selectedProperty} onChange={handlePropertyChange} disabled={loading}>
        {loading ? (
          <MenuItem disabled>Loading...</MenuItem>
        ) : error ? (
          <MenuItem disabled>Error Loading Properties</MenuItem>
        ) : (
          properties?.map((property) => (
            <MenuItem key={property._id} value={property.property_name}>
              {property.property_name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};

export default Master;
