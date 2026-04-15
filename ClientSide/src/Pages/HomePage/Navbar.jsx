import React, { useState } from "react";
import clsx from "clsx";
import assets from '@/assets/assets.js';


function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const links = ["Features", "Impact", "About", "Contact"];

  return (
    <header
      className={clsx(
        " w-full p-3 flex flex-col md:flex-row md:items-center bg-white backdrop-blur-md top-0 md:justify-between md:px-11 lg:px-32 gap-5 fixed border-b-2 2xl:text-xl"
      )}>
      <div className="flex flex-row justify-between items-center text-red-500 text-2xl">
        <span>HabitFlow</span>
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-xl hover:bg-red-500">
          <img
            src={isMenuOpen ? assets.cross : assets.menu}
            alt="menu toggle"
            className="w-6 opacity-65 hover:opacity-100"
          />
        </button>
      </div>

      <nav className="hidden md:flex flex-row gap-8 text-lg font-medium items-center">
        {links.map((label) => (
          <button
            key={label}
            className="transition-all duration-200 p-2 md:p-0 rounded-xl opacity-80 text-left
            md:text-black md:hover:text-red-400 hover:opacity-1a0 md:hover:bg-white relative
            after:content-[''] after:absolute after:left-0 after:bottom-0 
            after:h-2px after:w-0 after:bg-red-500 
            after:transition-all after:duration-300
            md:hover:after:w-full"
          >
            {label}
          </button>
        ))}
      </nav>

      <button className="hidden md:block bg-red-500 text-white px-8 md:py-1.5 py-2 rounded-xl hover:bg-red-400">
        Get Started
      </button>
    </header>
  );
}

export default Navbar;
