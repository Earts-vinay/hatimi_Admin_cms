import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { Upload, Image } from "antd";
import { FontSizeOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { fetchLocations, fetchPropertyTypes, } from "../../redux/Slices/Properties/locationSlice";
import { fetchIndoorAminities, fetchOutdoorAminities, } from "../../redux/Slices/Properties/aminitySlice";
import CustomTextField from "../custom/CustomTextField";
import CustomDropdown from "../custom/CustomDropdown";
import CustomButton from "../custom/CustomButton"
import colors from "../../utils/colors";
import fontFamily from "../../utils/fonts";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState({
    propertyName: "",
    phoneNumber: "",
    city: "",
    state: "",
    country: "",
    checkInTime: "",
    checkOutTime: "",
    description: "",
    propertyType: "",
    totalRooms: "",
    maxCapacity: "",
    areaDetails: "",
    indoorAmenities: [],
    outdoorAmenities: [],
    images: [],
  });

  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const { locations } = useSelector((state) => state.locations);
  const { propertyTypes } = useSelector((state) => state.locations);
  const { indooraminities } = useSelector((state) => state.aminities);
  const { outdooraminities } = useSelector((state) => state.aminities);

  useEffect(() => {
    dispatch(fetchLocations());
    dispatch(fetchPropertyTypes());
    dispatch(fetchIndoorAminities());
    dispatch(fetchOutdoorAminities());
  }, [dispatch]);

  const handlenav = () => {
    navigate("/properties");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPropertyDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    const selectedLocation = locations.find(
      (location) => location.city === selectedCity
    );
    setPropertyDetails((prev) => ({
      ...prev,
      city: selectedCity,
      state: selectedLocation?.state || "",
      country: selectedLocation?.country || "India",
    }));
  };

  const handleAmenityChange = (amenityId, type) => {
    setPropertyDetails((prev) => {
      const amenityList = type === "indoor" ? "indoorAmenities" : "outdoorAmenities";
      const newAmenities = prev[amenityList].includes(amenityId)
        ? prev[amenityList].filter((id) => id !== amenityId)
        : [...prev[amenityList], amenityId];

      return { ...prev, [amenityList]: newAmenities };
    });
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    const imageUrls = fileList.map((file) => file.url || file.preview);
    setPropertyDetails((prev) => ({
      ...prev,
      images: imageUrls,
    }));
  };

  const handlePreview = async (file) => {
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Property Data:", propertyDetails);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ display: "flex", gap: "10px", alignItems: "center", mb: 2 }}>
        <MdKeyboardArrowLeft size={28} cursor="pointer" onClick={handlenav}/>
        <Typography variant="h5" sx={{ fontFamily }}>
          Add Property
        </Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Property Name & Phone Number */}
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="Property Name"
              name="propertyName"
              value={propertyDetails.propertyName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              type="number"
              required
              label="Phone Number"
              name="phoneNumber"
              value={propertyDetails.phoneNumber}
              onChange={handleChange}
            />
          </Grid>

          {/* City Dropdown */}
          <Grid item xs={12} md={4}>
            <CustomDropdown
              required
              label="City"
              name="city"
              value={propertyDetails.city}
              onChange={handleCityChange}
            >
              {locations?.map((location) => (
                <MenuItem key={location._id} value={location.city}>
                  {location.city}
                </MenuItem>
              ))}
            </CustomDropdown>
          </Grid>

          {/* State and Country (Auto-selected) */}
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="State"
              name="state"
              value={propertyDetails.state}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="Country"
              name="country"
              value={propertyDetails.country}
              onChange={handleChange}
              disabled
            />
          </Grid>

          {/* Property Type & Total Rooms */}
          <Grid item xs={12} md={4}>
            <CustomDropdown
              label="Property Type"
              name="propertyType" // Pass the correct name
              value={propertyDetails.propertyType} // Empty string if no value
              onChange={handleChange} // Trigger handleChange on change
            >
              {propertyTypes?.map((type) => (
                <MenuItem key={type._id} value={type.type}>
                  {type.type}
                </MenuItem>
              ))}
            </CustomDropdown>

          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="Total Rooms"
              name="totalRooms"
              type="number"
              value={propertyDetails.totalRooms}
              onChange={handleChange}
            />
          </Grid>

          {/* Maximum Capacity & Area Details */}
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="Maximum Capacity"
              name="maxCapacity"
              type="number"
              value={propertyDetails.maxCapacity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CustomTextField
              required
              label="Area Details"
              name="areaDetails"
              value={propertyDetails.areaDetails}
              onChange={handleChange}
            />
          </Grid>

          {/* Check In & Check Out Times */}
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              margin="dense"
              label="Check In Time"
              type="time"
              name="checkInTime"
              InputLabelProps={{ shrink: true }}
              value={propertyDetails.checkInTime}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              required
              margin="dense"
              label="Check Out Time"
              type="time"
              name="checkOutTime"
              InputLabelProps={{ shrink: true }}
              value={propertyDetails.checkOutTime}
              onChange={handleChange}
            />
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              multiline
              margin="dense"
              rows={3}
              label="Description"
              name="description"
              value={propertyDetails.description}
              onChange={handleChange}
            />
          </Grid>

          {/* Amenities Section */}
          {/* Indoor Amenities */}
          <Grid item xs={12} mb={2}>
            <Typography variant="h6" mb={1} sx={{ fontFamily }}>Indoor Amenities</Typography>
            <Grid container spacing={1}>
              {indooraminities?.map((item) => (
                <Grid item xs={6} sm={4} key={item._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={propertyDetails.indoorAmenities.includes(item._id)}
                        onChange={() => handleAmenityChange(item._id, "indoor")}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <img src={item.icon} alt={item.name} width={20} height={20} style={{ marginRight: 8 }} />
                        <Typography sx={{ fontFamily, color: "text.secondary" }}> {item.name}</Typography>
                      </Box>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Outdoor Amenities */}
          <Grid item xs={12} mb={2}>
            <Typography variant="h6" mb={1} sx={{ fontFamily }}>Outdoor Amenities</Typography>
            <Grid container spacing={1}>
              {outdooraminities?.map((item) => (
                <Grid item xs={6} sm={4} key={item._id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={propertyDetails.outdoorAmenities.includes(item._id)}
                        onChange={() => handleAmenityChange(item._id, "outdoor")}
                      />
                    }
                    label={
                      <Box display="flex" alignItems="center">
                        <img src={item.icon} alt={item.name} width={20} height={20} style={{ marginRight: 8 }} />
                        <Typography sx={{ fontFamily, color: "text.secondary" }}> {item.name}</Typography>
                      </Box>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontFamily, mb: 1 }}>
                Upload Images of your Property
              </Typography>
              <Typography sx={{ color: colors.red, fontFamily }}>(Image size should not be greater than 5MB)</Typography>
            </Box>
            <Upload
              action="#"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleUploadChange}
              required
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Grid>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", width: "100%", my: 2 }}>
            <CustomButton>Cancel</CustomButton>
            <CustomButton type="submit"> Save</CustomButton>
          </Box>
        </Grid>
      </form>
    </Box>
  );
};

export default AddProperty;
