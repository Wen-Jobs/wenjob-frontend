import { configureStore } from "@reduxjs/toolkit";
import jobsReducer from "./slices/jobs";
import connectionsReducer from "./slices/connections";

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        connections: connectionsReducer,
    },
});
