import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { fetchProperties } from "../redux/Slices/Properties/propertySlice"; // Adjust path based on your structure

const Master = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.properties);
  const [selectedProperty, setSelectedProperty] = useState("");

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    // Retrieve selected property from localStorage
    const savedProperty = localStorage.getItem("selected_property_name");
    if (savedProperty) {
      setSelectedProperty(savedProperty);
    }
  }, []);

  useEffect(() => {
    if (properties.length > 0) {
      if (!selectedProperty) {
        // Set first property by default if nothing is selected
        const firstProperty = properties[0];
        setSelectedProperty(firstProperty.property_name);
        localStorage.setItem("selected_property_name", firstProperty.property_name);
        localStorage.setItem("property_uid", firstProperty.property_uid);
      } else {
        // Ensure localStorage updates if selectedProperty exists in properties
        const selectedPropertyData = properties.find(
          (property) => property.property_name === selectedProperty
        );

        if (selectedPropertyData) {
          localStorage.setItem("property_uid", selectedPropertyData.property_uid);
          localStorage.setItem("selected_property_name", selectedProperty);
        }
      }
    }
  }, [selectedProperty, properties]);

  const handlePropertyChange = (event) => {
    const selectedPropertyName = event.target.value;
    setSelectedProperty(selectedPropertyName);

    const selectedPropertyData = properties.find(
      (property) => property.property_name === selectedPropertyName
    );

    if (selectedPropertyData) {
      localStorage.setItem("property_uid", selectedPropertyData.property_uid);
      localStorage.setItem("selected_property_name", selectedPropertyName);
    }
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
