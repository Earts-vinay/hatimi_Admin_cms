//https://server.hatimiretreats.com/v1/master/property/get-all-property-locations
//https://server.hatimiretreats.com/v1/master/property/get-all-property-types
//https://server.hatimiretreats.com/v1/master/property/get-all-property-outdoor-details
//https://server.hatimiretreats.com/v1/master/property/get-all-property-indoor-details

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BaseUrl = process.env.REACT_APP_API_URL;
const token = Cookies.get("token");

export const fetchLocations = createAsyncThunk('locations/fetchLocations', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/v1/master/property/get-all-property-locations`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching Locations");
    }
})

export const fetchPropertyTypes = createAsyncThunk('propertyTypes/fetchPropertyTypes',async(_,{rejectWithValue}) => {
 try {
    const response = await axios.get(`${BaseUrl}/v1/master/property/get-all-property-types`,
        {headers:{
            Authorization: `Bearer ${token}`,
        }}
    )
    return response.data.data
 } catch (error) {
    
 }
})

const locationSlice = createSlice({
    name: "locations",
    initialState: {
        locations: [],
        propertyTypes:[],
        propertyTypeloading:false,
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLocations.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.loading = false;
                state.locations = action.payload;
            })
            .addCase(fetchLocations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPropertyTypes.pending, (state) => {
                state.propertyTypeloading = true;
                state.error = null;
            })
            .addCase(fetchPropertyTypes.fulfilled,(state,action) => {
                state.propertyTypeloading=false;
                state.propertyTypes=action.payload;
            })
            .addCase(fetchPropertyTypes.rejected,(state,action) => {
                state.propertyTypeloading= false;
                state.error = action.payload;
            })
    }
})

export default locationSlice.reducer;