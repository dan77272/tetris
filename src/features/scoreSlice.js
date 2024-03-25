import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        value: 0
    },
    reducers: {
        increaseScore: (state, actions) => {
            state.value += actions.payload || 10
        }
    }
}) 

export const {increaseScore} = scoreSlice.actions
export default scoreSlice.reducer