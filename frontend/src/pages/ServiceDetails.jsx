import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ServiceDetailed from "../components/ServiceDetailed";

const servicesPricing = [
  {
    name: "AC Repair",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$19",
        description: "Essential AC repair services for minor issues.",
        features: ["Inspection", "Filter Cleaning", "Basic Repairs"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$39",
        description: "Comprehensive AC repair for common problems.",
        features: ["Basic Plan Features", "Gas Refilling", "Thermostat Check"],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$59",
        description: "Complete repair and maintenance for your AC.",
        features: [
          "Standard Plan Features",
          "Full Unit Overhaul",
          "Priority Support",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Pest Control",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$25",
        description: "Initial treatment for basic pest issues.",
        features: ["Ants & Cockroaches", "Single Treatment", "Basic Guarantee"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$50",
        description: "Full protection for common household pests.",
        features: [
          "Basic Plan Features",
          "Monthly Treatments",
          "Rodent Control",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$75",
        description: "Comprehensive pest control for home and garden.",
        features: [
          "Standard Plan Features",
          "Outdoor Treatment",
          "Termite Protection",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Electrician",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$30",
        description: "Quick fixes and minor installations.",
        features: ["Fault Finding", "Switch Repairs", "Minor Installations"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$60",
        description: "Popular plan for common electrical needs.",
        features: [
          "Basic Plan Features",
          "Fan & Light Installation",
          "Wiring Repairs",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$100",
        description: "Advanced support for home electrical systems.",
        features: [
          "Standard Plan Features",
          "Panel Upgrades",
          "Emergency Support",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Cleaning",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$15",
        description: "Basic cleaning services for small spaces.",
        features: ["Living Room Cleaning", "Dusting", "Vacuuming"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$40",
        description: "Standard cleaning package for medium spaces.",
        features: [
          "Basic Plan Features",
          "Kitchen Cleaning",
          "Bathroom Cleaning",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$70",
        description: "Deep cleaning and customized services.",
        features: [
          "Standard Plan Features",
          "Carpet & Upholstery",
          "Outdoor Cleaning",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Carpenter",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$25",
        description: "Minor repairs and installations.",
        features: [
          "Furniture Repair",
          "Door & Window Fitting",
          "Basic Woodwork",
        ],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$50",
        description: "Comprehensive carpentry services for home improvement.",
        features: ["Basic Plan Features", "Cabinet Making", "Custom Furniture"],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$80",
        description: "Advanced carpentry solutions for complex projects.",
        features: [
          "Standard Plan Features",
          "Restoration & Renovation",
          "Outdoor Structures",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Plumbing",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$30",
        description: "Quick fixes for common plumbing issues.",
        features: [
          "Leak Detection & Repair",
          "Tap & Faucet Replacement",
          "Drain Cleaning",
        ],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$60",
        description: "Comprehensive plumbing services for home maintenance.",
        features: [
          "Basic Plan Features",
          "Toilet Repair & Installation",
          "Pipe Fitting & Repair",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$90",
        description: "Advanced plumbing solutions for complex problems.",
        features: [
          "Standard Plan Features",
          "Water Heater Installation & Repair",
          "Sewer Line Cleaning",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Home Security",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$20",
        description: "Essential security features for basic protection.",
        features: ["Alarm System", "Motion Sensors", "24/7 Monitoring"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$40",
        description: "Enhanced security for added peace of mind.",
        features: [
          "Basic Plan Features",
          "Video Surveillance",
          "Smart Home Integration",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$60",
        description: "Complete home security solution with advanced features.",
        features: [
          "Standard Plan Features",
          "Fire & Smoke Detection",
          "Emergency Response",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Landscaping",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$25",
        description: "Basic lawn care and maintenance.",
        features: ["Lawn Mowing", "Trimming & Edging", "Fertilization"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$50",
        description: "Comprehensive landscaping services for a beautiful yard.",
        features: [
          "Basic Plan Features",
          "Planting & Gardening",
          "Mulching & Weeding",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$80",
        description:
          "Advanced landscaping solutions for outdoor living spaces.",
        features: [
          "Standard Plan Features",
          "Hardscaping & Patios",
          "Water Features & Lighting",
        ],
        featured: false,
      },
    ],
  },
  {
    name: "Painting",
    plans: [
      {
        name: "Basic",
        priceMonthly: "$20",
        description: "Basic interior painting for small spaces.",
        features: ["Wall Painting", "Ceiling Painting", "Touch-ups"],
        featured: false,
      },
      {
        name: "Standard",
        priceMonthly: "$40",
        description: "Comprehensive interior and exterior painting.",
        features: [
          "Basic Plan Features",
          "Exterior Painting",
          "Wallpaper Removal & Installation",
        ],
        featured: true,
      },
      {
        name: "Premium",
        priceMonthly: "$60",
        description: "Advanced painting solutions for specialized needs.",
        features: [
          "Standard Plan Features",
          "Specialty Finishes",
          "Cabinet Painting",
        ],
        featured: false,
      },
    ],
  },
];

const ServiceDetails = () => {
  const { serviceName } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = () => {
      const decodedServiceName = decodeURIComponent(serviceName);

      const serviceData = servicesPricing.find(
        (service) => service.name === decodedServiceName
      );

      if (serviceData) {
        setService(serviceData);
      } else {
        setError("Service not found.");
      }
      setLoading(false);
    };

    if (serviceName) {
      fetchServiceDetails();
    }
  }, [serviceName]);

  useEffect(() => {
    if (service) {
      document.title = `Best & Affordable ${service.name} in Mumbai`;
    }
  }, [service]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Navbar />
      {service ? (
        <ServiceDetailed service={service} />
      ) : (
        <div>No service data available</div>
      )}
    </div>
  );
};

export default ServiceDetails;