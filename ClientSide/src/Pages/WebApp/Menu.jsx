import MenuSvg from "@/assets/menu.svg";

function Menu({ handleMenuClick }) {
  return (
    <div className="items-center w-full max-w-2/12 gap-3 px-4 py-3.5 border-b border-r border-gray-100 bg-white hidden lg:flex lg:justify-between">
      <div className="hidden gap-2.5 items-center lg:flex">
        <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center text-white font-black text-sm">
          H
        </div>
        <div className="flex flex-col text-sm leading-tight">
          <span className="font-bold text-black">HabitFlow</span>
          <span className="text-gray-400 text-xs">Free Plan</span>
        </div>
      </div>

      <button
        onClick={handleMenuClick}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-50 transition-colors"
      >
        <img src={MenuSvg} alt="Menu" className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Menu;