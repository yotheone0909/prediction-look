export default function CardMatch({ predict })
{
    return (
        <div className="flex-1 basis-1/4">
            <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
                <img className="w-full" src="https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg" alt="Sunset in the mountains" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Test</div>

                    <div className="flex">
                        <p>Test Close Prediction : 10D 5H 20M 10S</p>
                    </div>

                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700">Home</span>
                        <span className="text-sm font-medium text-blue-700 ">Test</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700">Draw</span>
                        <span className="text-sm font-medium text-blue-700">Test</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>

                    <div className="flex justify-between mb-1">
                        <span className="text-base font-medium text-blue-700 ">Away</span>
                        <span className="text-sm font-medium text-blue-700 ">Test</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: "40%" }}></div>
                    </div>

                </div>
                <div className="px-2 pt-4 pb-2 flex ">
                    <button className="bg-blue-500 btn-sm mr-1 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-1/3 mb-4">Home</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white mr-1 font-bold py-2 rounded-full w-1/3 mb-4 ">Draw</button>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white mr-1 font-bold py-2 rounded-full w-1/3 mb-4">Away</button>
                </div>
            </div>
        </div>
    )
}