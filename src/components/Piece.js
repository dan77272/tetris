import shapes from './shapes'

export default function Piece({type}){

    console.log("Type: " + type)

    const shape = shapes[type]

    return (
        <div>
            {shape.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row">
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className={`w-[40px] h-[40px] ${cell ? 'bg-[#00f0f0] border border-solid border-gray-500' : 'bg-transparent'}`}></div>
                    ))}
                </div>
            ))}
        </div>
    )
}