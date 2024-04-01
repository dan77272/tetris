import { useEffect, useState } from "react"
import shapes from "./shapes"

export default function Next(props){

    const {pieces, colours} = props
    const [piecesArray, setPiecesArray] = useState([])

    useEffect(() => {
        const newPiecesArray = []

        for(let i = 1; i < pieces.length; i++){
            const pieceShape = shapes[pieces[i]][0].map(row => 
                row.map(cell => (cell === 1 ? colours[pieces[i]] : 'transparent')))
            newPiecesArray.push(pieceShape)
        }
        setPiecesArray(newPiecesArray)
    }, [pieces, colours])



    return (
        <div className="bg-[#4f4f5c] w-[200px] py-[20px] border-[5px] border-solid rounded-lg mt-24">
            <div className="flex flex-col items-center mt-[-15px]">
                <p className="text-[36px] font-semibold text-white w-full text-center">Next</p>
                <div className="h-[250px] w-[80%] bg-gray-900 rounded-md flex flex-col gap-3 justify-between items-center py-3">
                    {console.log(piecesArray)}
                    {piecesArray.map((piece, index) => (
                        <div key={index} className="flex flex-col">
                            {piece.map((row, rowIndex) => (
                                <div key={rowIndex} className="flex">
                                    {row.map((cell, cellIndex) => (
                                        <div key={cellIndex} style={{ height: '30px', width: '30px', backgroundColor: cell}}></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}