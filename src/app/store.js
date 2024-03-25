import { configureStore } from "@reduxjs/toolkit";
import startGameReducer from '../features/startGameSlice'
import scoreReducer from '../features/scoreSlice'

export default configureStore({
    reducer: {
        startGame: startGameReducer,
        score: scoreReducer
    }
})