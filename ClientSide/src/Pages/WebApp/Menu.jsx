import MenuSvg from "@/assets/menu.svg";

function Menu({ handleMenuClick }) {
    return (
        <>
            <div className="items-center w-full max-w-2/12 gap-3 px-3 py-3 border-b border-r bg-white hidden lg:flex lg:justify-between">
                <div className="hidden gap-2 items-center lg:flex">
                    <div className="font-bold text-lg">Logo</div>
                    <div className="flex flex-col text-sm leading-tight">
                        <span className="font-medium">HabitFlow</span>
                        <span className="text-gray-500">Free Plan</span>
                    </div>
                </div>

                <img
                    src={MenuSvg}
                    alt="Menu"
                    className="w-7 cursor-pointer "
                    onClick={handleMenuClick}
                />
            </div>
        </>
    )
}

export default Menu
