import assets from "@/assets/assets.js";

function LookUpNav() {
  return (
    <div className="border-b border-gray-100 bg-white flex py-2.5 items-center justify-end h-full gap-3 px-5 w-full">
      <div className="flex items-center gap-2.5 px-3.5 border border-gray-200 transition-colors focus-within:border-red-400 rounded-xl h-full w-full min-w-[10vw] max-w-xl bg-white">
        <img src={assets.search_Icon} className="w-4 h-4 opacity-50" alt="" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400"
        />
        <img
          src={assets.filter}
          className="w-4 h-4 opacity-50 cursor-pointer"
          alt=""
        />
      </div>

      <button className="flex justify-center items-center rounded-xl h-full aspect-square border border-gray-200 hover:border-red-400 transition-colors shrink-0">
        <img className="w-4 h-4" src={assets.bell} alt="Notifications" />
      </button>

      <div className="rounded-xl px-3 w-full max-w-fit h-full md:flex hidden justify-center items-center border border-gray-200 hover:border-red-400 transition-colors">
        <div className="w-full h-full flex justify-start items-center gap-2.5">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-red-500">
            <img src={assets.avatar} className="w-4 h-4" alt="" />
          </div>
          <div className="flex flex-col leading-tight justify-center pr-2">
            <span className="font-bold text-sm text-black">Yashin</span>
            <span className="text-xs text-gray-400">User</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LookUpNav;
