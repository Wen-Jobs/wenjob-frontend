import { createSlice } from "@reduxjs/toolkit";

export const connectionsSlice = createSlice({
    name: "connections",
    initialState: {
        connections: [],
        message: '',
    },
    reducers: {
        setConnectionsData: (state, action) => {
            state.connections = action.payload;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
    },
});

export const { setConnectionsData, setMessage } = connectionsSlice.actions;

export default connectionsSlice.reducer;