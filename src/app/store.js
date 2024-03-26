import { configureStore } from "@reduxjs/toolkit";
import startGameReducer from '../features/startGameSlice'
import scoreReducer from '../features/scoreSlice'
import levelReducer from '../features/levelSlice'

export default configureStore({
    reducer: {
        startGame: startGameReducer,
        score: scoreReducer,
        level: levelReducer,
    }
})