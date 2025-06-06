import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { logo, search, thirdweb, menu } from "../assets";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
import Menu from "./Menu";

import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("Home");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  const { connect, address } = useStateContext();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="sm:flex hidden mr-10 relative">
        <Menu />
      </div>

      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#e9faedfd] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#77948f] text-black bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#9303B4] flex justify-center items-center cursor-pointer" >
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[14px] object-contain"
          />
        </div>
      </div>
      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={address ? "Create a Campaign" : "Connect"}
          styles={address ? "bg-[#9303B4]" : "bg-[#8c6dfd]"}
          handleClick={() => {
            if (address) {
              navigate("create-campaign");
            } else {
              connect();
            }
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-full bg-[#e9faedfd] flex justify-center items-center cursor-pointer">
            <img
              src={thirdweb}
              alt="user"
              className="w-[60%] h-[60%] object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Small Screen Navbar */}

      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#e9faedfd] flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z=10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${
                  isActive === link.name && "bg-[#3a3a43]"
                } cursor-pointer`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? "text-[#e9faedfd]" : "text-[#808191]"
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={address ? "Create a Campaign" : "Connect"}
              styles={address ? "bg-[#1dc071]" : "bg-[#8c6dfd]"}
              handleClick={() => {
                if (address) {
                  navigate("create-campaign");
                } else {
                  connect();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;


//search colour #9303B4