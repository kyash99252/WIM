import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import OrderHistory from "../components/OrderHistory";

const Dashboard = () => {
  useEffect(() => {
    document.title = "My Dashboard";
  }, []);

  return (
    <div>
      <Navbar />
      <OrderHistory />
    </div>
  );
};

export default Dashboard;