import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Fetch Data
export const fetchCovidData = createAsyncThunk('data/getCovidData',
    async () => {
        let one = `https://api.covid19api.com/summary`

        const requestOne = await axios.get(one);

        return requestOne.data
    }
);

export const covid19DataSlice = createSlice({
    name: 'covid19Data',
    initialState: {
        dataList: [],
        selectedLocation: { value: 'global', label: 'Global' },
        status: 'idle',
    },
    reducers: {
        changeSelectedLocation: (state, action) => {
            state.selectedLocation = action.payload
        },
    },
    extraReducers: {
        [fetchCovidData.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchCovidData.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            console.log("action.payload", action.payload)
            state.dataList = [...action.payload.Countries];
            state.dataList.push({
                ...action.payload.Global,
                Country: 'Global',
                Slug: 'global',
                CountryCode: 'global',
            })
        },
        [fetchCovidData.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        },
    },
});

export const { changeSelectedLocation } = covid19DataSlice.actions;

export default covid19DataSlice.reducer;