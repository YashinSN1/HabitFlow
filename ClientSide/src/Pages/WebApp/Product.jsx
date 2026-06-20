import ProductNavbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";
import React from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
function Product() {
  let [ismenuclicked, setIsMenuClicked] = React.useState(false);

  useEffect(() => {
    getUserTimezone();
  }, []);

  const getUserTimezone = async () => {
    try {
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await axios.post(
        `/api/app/timezone`,
        { timezone: userTimezone },
        { headers: { "Content-Type": "application/json" } },
      );
      console.log("User timezone updated successfully:", response.data);
    } catch (error) {
      console.error("Error fetching user timezone:", error);
    }
  }

  function handleMenuClick() {
    setIsMenuClicked(!ismenuclicked);
  }

  return (
    <div className="w-screen h-screen">
      <div className="w-full h-full flex flex-col">
        <ProductNavbar handleMenuClick={handleMenuClick}></ProductNavbar>
        <div className="flex w-full h-full">
          <Sidebar MenuClicked={ismenuclicked}></Sidebar>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Product;
