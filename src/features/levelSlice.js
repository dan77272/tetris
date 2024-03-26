import { createSlice } from "@reduxjs/toolkit";

export const levelSlice = createSlice({
    name: 'level',
    initialState: {
        value: 1
    },
    reducers: {
        changeLevel: state => {
            state.value = (state.value % 3) + 1
        }
    }
})

export const {changeLevel} = levelSlice.actions
export default levelSlice.reducer