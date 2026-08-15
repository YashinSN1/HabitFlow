import React from "react";
import Menu from "./Menu.jsx";
import LookUpNav from "./LookUp-Nav.jsx";

function ProductNavbar({ handleMenuClick }) {
  return (
    <div className="w-full h-full max-h-15 flex border-b border-gray-100">
      <Menu handleMenuClick={handleMenuClick} />
      <LookUpNav />
    </div>
  );
}

export default ProductNavbar;
