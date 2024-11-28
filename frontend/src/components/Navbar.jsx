import React, { useState, useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const [locationQuery, setLocationQuery] = useState("");
  const [serviceQuery, setServiceQuery] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleSearch = (query) => {
    if (query) {
      console.log(`Searching for: ${query}`);
      const mockData = [
        "Plumbing",
        "Cleaning",
        "Electrician",
        "Tutoring",
        "House Painting",
      ];
      const results = mockData.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      console.log("Search results:", results);
    }
  };

  return (
    <div className="p-6 flex justify-between items-center border border-slate-200">
      <div className="text-2xl font-bold">Local Services Marketplace</div>
      <div className="flex space-x-5">
        <div className="flex border border-slate-500 rounded-lg h-10 w-60 align-middle px-2 items-center space-x-3">
          <div>
            <FaLocationArrow />
          </div>
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Mumbai"
            className="w-full outline-none bg-transparent border-0 hover:border-0"
          />
          <button
            onClick={() => handleSearch(locationQuery)}
            className="hidden"
          >
            Search
          </button>
        </div>

        <div className="flex border border-slate-500 rounded-lg h-10 w-60 align-middle px-2 items-center space-x-3">
          <div>
            <FaMagnifyingGlass />
          </div>
          <input
            type="text"
            value={serviceQuery}
            onChange={(e) => setServiceQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full outline-none bg-transparent border-0 hover:border-0"
          />
          <button onClick={() => handleSearch(serviceQuery)} className="hidden">
            Search
          </button>
        </div>

        {user ? (
          <button
            className="border border-slate-500 rounded-lg px-4 hover:bg-black hover:text-white relative overflow-hidden"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </button>
        ) : (
          <button
            className="border border-slate-500 rounded-lg px-4 hover:bg-black hover:text-white relative overflow-hidden"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;