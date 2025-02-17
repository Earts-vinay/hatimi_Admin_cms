import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProperties } from "../redux/Slices/Properties/propertySlice";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import fontFamily from "../utils/fonts";
import HashLoader from "react-spinners/HashLoader";
import CustomButton from "../components/custom/CustomButton";
import colors from "../utils/colors";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, loading, error } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const handlenav = () => {
    navigate("/addproperty");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 160px)" }}>
        <HashLoader color="#1D525B" />
      </Box>
    );
  }

  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Fixed Header */}
      <Box sx={{ 
        position: "sticky", 
        top: 0, 
        backgroundColor: "white", 
        zIndex: 1000, 
        px: 3, 
        pt:3,
        pb:1,
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <Typography variant="h5" sx={{ fontFamily }}>
          My Properties
        </Typography>
        <CustomButton width="120px" onClick={handlenav}>Add Property</CustomButton>
      </Box>

      {/* Scrollable Card Container */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 3,py:1 }}>
        <Grid container spacing={3}>
          {properties?.map((property) => (
            <Grid item xs={12} key={property.id}>
              <Card sx={{ display: "flex", boxShadow: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 400, height: 340, objectFit: "cover" }}
                  image={property.property_images[0]}
                  alt="property"
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontFamily }}>
                    {property.property_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                    {property.property_city}, {property.property_state}, {property.property_country}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontFamily, fontSize: "12px" }}>
                    {property.property_description.split(" ").length > 40
                      ? property.property_description.split(" ").slice(0, 40).join(" ") + " ..."
                      : property.property_description}
                  </Typography>

                  <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Property Type</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.property_type}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Area Details</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.property_size}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Total Rooms</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.rooms.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Max Capacity</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.max_capacity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Check In</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.check_in_time}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Check Out</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.check_out_time}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle2" sx={{ fontFamily }}>Phone Number</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily }}>
                        {property.phone_number}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box sx={{ marginTop: 3, display: "flex", justifyContent: "end", gap: 1 }}>
                    <Button size="small" sx={{ textTransform: "capitalize", color: colors.green }}>
                      View Property
                    </Button>
                    <CustomButton color="#007bff" borderColor="#007bff" hoverColor="white" hoverBorderColor="#0056b3" hoverBackgroundColor="#0056b3">
                      Edit
                    </CustomButton>
                    <CustomButton color={colors.red} borderColor={colors.red} hoverColor={colors.white} hoverBorderColor={colors.red} hoverBackgroundColor={colors.red}>
                      Delete
                    </CustomButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Properties;
