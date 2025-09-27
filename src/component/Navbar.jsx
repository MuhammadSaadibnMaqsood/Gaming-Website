import React, { useRef } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const Navbar = () => {
  const navContainerRef = useRef(null);
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex p-4 size-full items-center justify-between">
          {/* LEFT SIDE  */}
          <div className="flex items-center gap-7">
            <img className="w-10" src="/img/logo.png" alt="logo" />
            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-ceneter gap-1"
            />
          </div>
          {/* RIGHT SIDE  */}
          <div></div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
