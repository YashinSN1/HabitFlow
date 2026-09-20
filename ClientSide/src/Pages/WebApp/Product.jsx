import ProductNavbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import React from "react";
import { Outlet } from "react-router-dom";
import MobileNav from "./MobileNav.jsx";
import Hero from "./Hero.jsx";

function Product() {
  let [ismenuclicked, setIsMenuClicked] = React.useState(false);

  function handleMenuClick() {
    setIsMenuClicked(!ismenuclicked);
  }
  return (
    <div className="h-full w-full flex flex-col">
      <ProductNavbar handleMenuClick={handleMenuClick} />

      <div className="flex w-full h-full overflow-auto relative">
        <Sidebar MenuClicked={ismenuclicked} />

        <div className="flex-1 lg:overflow-hidden overflow-y-auto h-full w-full pb-20">
         <Outlet />
        </div>
      </div>

      <MobileNav />
    </div>
  );
}

export default Product;
