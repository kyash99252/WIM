import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

const ServiceDetails = () => {
  const { serviceName } = useParams();

  React.useEffect(() => {
    document.title = `Best & Affordable ${serviceName} in Mumbai`;
  }, [serviceName]);

  return (
    <Navbar/>
  );
};

export default ServiceDetails;