export default function CardMatch() {
    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg mt-16 mx-8">
                <img class="w-full" src="https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Arsenal vs Sunderland</div>

                    <div class="flex justify-between mb-1">
                        <span class="text-base font-medium text-blue-700">Home</span>
                        <span class="text-sm font-medium text-blue-700 ">15%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                    </div>

                    <div class="flex justify-between mb-1">
                        <span class="text-base font-medium text-blue-700">Draw</span>
                        <span class="text-sm font-medium text-blue-700">65%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-orange-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>

                    <div class="flex justify-between mb-1">
                        <span class="text-base font-medium text-blue-700 ">Away</span>
                        <span class="text-sm font-medium text-blue-700 ">20%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div class="bg-red-600 h-2.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>

                </div>
                <div class="px-2 pt-4 pb-2 flex ">
                    <button class="bg-blue-500 btn-sm mr-1 hover:bg-blue-700 text-white font-bold py-2 rounded-full w-1/3 mb-4">Home</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white mr-1 font-bold py-2 rounded-full w-1/3 mb-4 ">Draw</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white mr-1 font-bold py-2 rounded-full w-1/3 mb-4">Away</button>
                </div>
            </div>
        </div>
    )
}