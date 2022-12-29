import { createSlice } from "@reduxjs/toolkit";

// jobs array is more like a master list of jobs, or a cache. Filtered jobs are what is actually rendered, and keyword is the search term
export const jobsSlice = createSlice({
    name: "jobs",
    initialState: {
        jobs: [],
        filteredJobs: [],
        keyword: "",
        selectedJob: {},
    },
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
            state.filteredJobs = action.payload;
        },
        filterJobs: (state, action) => {
            // set the filtered jobs in state
            state.filteredJobs = action.payload;
        },
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        },
        setSelectedJob: (state, action) => {
            console.log(action.payload)
            state.selectedJob = { ...action.payload };
        }
    },
});

export const { setJobs, filterJobs, setKeyword, setSelectedJob } = jobsSlice.actions;

export default jobsSlice.reducer;