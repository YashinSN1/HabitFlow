import ProductNavbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import MobileNav from "./MobileNav.jsx";
import MobileCalander from "./MobileCalander.jsx";

function Product() {
  let [ismenuclicked, setIsMenuClicked] = React.useState(false);

  function handleMenuClick() {
    setIsMenuClicked(!ismenuclicked);
  }
  return (
 <div className="w-screen h-screen flex flex-col">
  <ProductNavbar handleMenuClick={handleMenuClick} />
  
  <div className="flex w-full overflow-hidden relative">
    <Sidebar MenuClicked={ismenuclicked} />
    
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="flex-1 lg:overflow-hidden overflow-y-auto pb-15">
        <Outlet />
      </div>
    </div>
    
  </div>
  
  <MobileNav />
</div>
  );
}

export default Product;
