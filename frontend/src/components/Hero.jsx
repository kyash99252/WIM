import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "/landing_hero.png";
import { TbAirConditioning } from "react-icons/tb";
import { FaBugSlash } from "react-icons/fa6";
import {
  MdElectricBolt,
  MdCleaningServices,
  MdCarpenter,
} from "react-icons/md";
import { GiTeePipe, GiGardeningShears } from "react-icons/gi";
import { PiSecurityCameraFill } from "react-icons/pi";
import { FaPaintRoller } from "react-icons/fa6";

const Hero = () => {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    const encodedServiceName = encodeURIComponent(serviceName);
    navigate(`/services/${encodedServiceName}`);
  };


  return (
    <div className="flex mx-20">
      <div className="mt-14 w-full md:w-1/2 pl-5">
        <div className="flex mb-8">
          <span className="text-3xl font-semibold pl-5">
            Home services at your <br /> doorstep
          </span>
        </div>
        <div className="border border-gray-300 rounded-lg text-neutral-600 w-3/4 p-5">
          <span className="m-5">What are you looking for?</span>
          <div className="flex space-x-3 m-5">
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("AC Repair")}
            >
              <TbAirConditioning className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:hidden">
                AC Repair
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Pest Control")}
            >
              <FaBugSlash className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:hidden">
                Pest Control
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Electrician")}
            >
              <MdElectricBolt className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:hidden">
                Electrician
              </span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-3 m-5">
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Cleaning")}
            >
              <MdCleaningServices className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Cleaning
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Carpenter")}
            >
              <MdCarpenter className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Carpenter
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Plumbing")}
            >
              <GiTeePipe className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Plumbing
              </span>
            </div>
          </div>
          <div className="flex flex-wrap space-x-3 m-5">
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Home Security")}
            >
              <PiSecurityCameraFill className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Home Security
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Landscaping")}
            >
              <GiGardeningShears className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Landscaping
              </span>
            </div>
            <div
              className="services group flex-1 min-w-[120px] h-24 bg-slate-100 text-center rounded-lg p-4 hover:bg-black hover:text-white transition-all relative cursor-pointer"
              onClick={() => handleServiceClick("Painting")}
            >
              <FaPaintRoller className="absolute inset-0 m-auto text-5xl opacity-0 group-hover:opacity-100" />
              <span className="absolute inset-0 opacity-100 group-hover:opacity-0">
                Painting
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="scale-75 m-0 p-0 w-full md:w-1/2">
        <img
          src={Image}
          alt="Our Services"
          className="max-w-full h-full object-contain object-top"
        />
      </div>
    </div>
  );
};

export default Hero;