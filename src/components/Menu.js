import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../features/startGameSlice";
import { changeLevel } from "../features/levelSlice";

export default function Menu() {

    const dispatch = useDispatch()
    const level = useSelector(state => state.level.value)
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-[#22222b] h-[800px] w-[400px] text-white flex flex-col items-center border-[5px] border-solid rounded-lg">
                <img src="tetris-logo.png" alt="tetris-logo" className="mt-10"/>
                <button className="button-3d" onClick={() => dispatch(startGame())}>Start Game</button>
                <button className="button-3d bg-gray-600" onClick={() => dispatch(changeLevel())}>Level</button>
                <p className="text-3xl font-semibold mt-3">{level}</p>
            </div>
        </div>
    );
}
