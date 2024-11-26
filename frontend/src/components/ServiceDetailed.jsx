import React from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom"; 

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ServiceDetailed = ({ service }) => {
  const navigate = useNavigate();

  if (!service) {
    return <div>No service data available.</div>;
  }

  const pricing = service.plans || [];

  const handleBooking = (plan) => {
    navigate("/booking", { state: { plan, serviceName: service.name } });
  };

  return (
    <div className="mt-5 pt-5 mx-10 px-6">
      <h1 className="font-bold text-3xl text-center">{service.name} Plans</h1>
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pricing.map((tier, tierIdx) => (
          <div
            key={tier.name}
            className={classNames(
              tier.featured
                ? "bg-indigo-700 text-white"
                : "bg-white text-gray-900",
              "rounded-lg shadow-md p-6 ring-1 ring-gray-200"
            )}
          >
            <h3 className="text-lg font-semibold">{tier.name}</h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span className="text-4xl font-bold">{tier.priceMonthly}</span>
            </p>
            <p className="mt-4">{tier.description}</p>
            <ul className="mt-6 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center gap-x-2">
                  <CheckIcon className="h-5 w-5 text-indigo-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleBooking(tier)}
              className="mt-6 block w-full rounded-md bg-indigo-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Book Now!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceDetailed;