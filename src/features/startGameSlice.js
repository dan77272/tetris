import { createSlice } from "@reduxjs/toolkit";

export const startGameSlice = createSlice({
    name: 'startGame',
    initialState: {
        value: false
    },
    reducers: {
        startGame: state => {
            state.value = true
        }
    }
})

export const {startGame} = startGameSlice.actions

export default startGameSlice.reducer