import assets from '@/assets/assets.js';

function LookUpNav() {
    return (
        <>
            <div className="hidden border-b bg-white lg:flex py-1.5 justify-end h-full items-center gap-4 px-5 w-full">

                <div className="flex items-center gap-2 px-3 border-2 transition-colors hover:border-red-500 border-red-100 rounded-md h-full w-full min-w-[10vw] max-w-xl bg-white">
                    <div className="flex items-center justify-center">
                        <img
                            src={assets.search_Icon}
                            className="w-5 h-5"/>
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 text-sm outline-none bg-transparent border-red-100 placeholder-gray-400"/>
                    <div className="flex items-center justify-center">
                        <img
                            src={assets.filter}
                            className="w-5 h-5"/>
                    </div>
                </div>

                <div className="text-center flex justify-center items-center rounded-xl h-full px-3 border-2 transition-colors hover:border-red-500 border-red-100">
                    <div>
                        <img className="w-5 h-5" src={assets.bell} />
                    </div>
                </div>

                <div className="rounded-xl px-4 w-full max-w-fit h-full flex justify-center items-center border-2 transition-colors hover:border-red-500 border-red-100">
                    <div className="w-full h-full flex justify-start items-center gap-2">
                        <div className="w-full px-3 flex items-center justify-center rounded-3xl bg-red-400 h-full"><img src={assets.avatar} className="w-5 h-5" /></div>
                        <div className="flex items-center flex-col leading-tight justify-center">
                            <div className="font-medium">Yashin</div>
                            <div className="text-sm">User</div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default LookUpNav;