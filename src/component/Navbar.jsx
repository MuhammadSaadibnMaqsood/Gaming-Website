import React, { useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActice, setIsIndicatorActice] = useState(false);
  const navContainerRef = useRef(null);
  const audioElRef = useRef(null);

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];
  const toggleAudioIndicator = () => {};
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
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a className="nav-hover-btn" key={item}>
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                className="hidden"
                ref={audioElRef}
                src="/audio/loop.mp3"
                loop
              >
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActice ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </audio>
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
