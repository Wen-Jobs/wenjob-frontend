// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const fetchJobListings = createAsyncThunk(
//   '/getJobs',
//   async (thunkAPI) => {
//     const response = await axios.get(process.env.REACT_APP_SERVER);
//     return response.data;
//   }
// )

// const initalState = {
//   job_listings: [],
// };

// export const jobSlice = createSlice({
//   name: 'jobs',
//   initalState,
//   reducers: {
//     getAllJobs: (state, action) => {
//       state.job_listings = action.payload;
//     },
//     updateJobs: (state, action) => {
//       state.job_listings = action.payload;
//     },
//     filterJobs: (state, actions) => {
//       // optional? use a cache in server/filter in front end
//     },
//   }
// });

// export const { getAllJobs, updateJobs, filterJobs } = jobSlice.actions;

// export default jobSlice.reducer;