import { useSelector } from "react-redux"



export default function Score(){

    const score = useSelector(state => state.score.value)
    const level = useSelector(state => state.level.value)

    return (
        <div className="bg-[#4f4f5c] w-[200px] py-[20px] border-[5px] border-solid rounded-lg mt-24">
            <div className="flex flex-col items-center mt-[-15px]"> {/* Move bg-black here to fill this div */}
                <p className="text-[36px] font-semibold text-white w-full text-center">Score</p>
                <div className="h-[50px] w-[80%] bg-gray-900 rounded-md flex justify-center items-center">
                    <p className="text-white text-4xl">{score}</p>
                </div>
                <p className="text-[36px] font-semibold text-white w-full text-center">Level</p>
                <div className="h-[50px] w-[80%] bg-gray-900 rounded-md flex justify-center items-center">
                    <p className="text-white text-4xl">{level}</p>
                </div>
                <p className="text-[36px] font-semibold text-white w-full text-center">Lines</p>
                <div className="h-[50px] w-[80%] bg-gray-900 rounded-md flex justify-center items-center">
                    <p className="text-white text-4xl">{score / 10}</p>
                </div>
            </div>
        </div>
    )
}