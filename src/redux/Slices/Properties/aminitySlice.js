//https://server.hatimiretreats.com/v1/master/property/get-all-property-outdoor-details
//https://server.hatimiretreats.com/v1/master/property/get-all-property-indoor-details

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Base from "antd/es/typography/Base";
import axios from "axios";
import Cookies from "js-cookie";

const BaseUrl = process.env.REACT_APP_API_URL;
const token = Cookies.get("token");

export const fetchIndoorAminities = createAsyncThunk('indooraminities/fetchIndoorAminities', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${BaseUrl}/v1/master/property/get-all-property-indoor-details`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        return response?.data.data
    } catch (error) {
        return rejectWithValue(error.response.data || "error in fetching Indoor aminities")
    }
})

export const fetchOutdoorAminities = createAsyncThunk('outdooraminities/fetchOutdoorAminiites',async(_,{rejectWithValue}) => {
 try {
    const response = await axios.get(`${BaseUrl}/v1/master/property/get-all-property-outdoor-details`,
        {headers:{
            Authorization: `Bearer ${token}`
        }}
    )
    return response?.data.data
 } catch (error) {
    
 }
})

const aminitiesSlice = createSlice({
    name: "aminities",
    initialState: {
        indooraminities: [],
        outdooraminities:[],
        OAloading:false,
        IAloading: false,
        OAerror:null,
        IAerror: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIndoorAminities.pending, (state) => {
                state.IAloading = true;
                state.IAerror = null;
            })
            .addCase(fetchIndoorAminities.fulfilled, (state, action) => {
                state.IAloading = false;
                state.indooraminities = action.payload;
            })
            .addCase(fetchIndoorAminities.rejected, (state, action) => {
                state.IAloading = false;
                state.IAerror = action.payload;
            })
            .addCase(fetchOutdoorAminities.pending,(state) => {
                state.OAloading = true;
                state.OAerror = null;
            })
            .addCase(fetchOutdoorAminities.fulfilled,(state,action) => {
                state.OAloading =false;
                state.outdooraminities = action.payload;
            })
            .addCase(fetchOutdoorAminities.rejected,(state,action) => {
                state.OAloading =false;
                state.OAerror =action.payload;
            })
    }
})


export default aminitiesSlice.reducer