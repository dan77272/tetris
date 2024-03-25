export default function Next(){
    return (
        <div className="bg-[#4f4f5c] w-[200px] py-[20px] border-[5px] border-solid rounded-lg mt-24">
            <div className="flex flex-col items-center mt-[-15px]"> {/* Move bg-black here to fill this div */}
                <p className="text-[36px] font-semibold text-white w-full text-center">Next</p>
                <div className="h-[250px] w-[80%] bg-gray-900 rounded-md"></div>
            </div>
        </div>
    )
}