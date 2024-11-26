import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentStatusDialog from "../components/PaymentStatusDialog";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY);

function BookingFormContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const { plan, serviceName } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    preferredDateTime: "",
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      const amount = plan?.priceMonthly ? plan.priceMonthly * 100 : 0;
      if (amount <= 0) {
        throw new Error("Invalid plan price.");
      }

      const response = await fetch(
        "http://localhost:5000/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(
              parseFloat(plan?.priceMonthly.replace("$", "")) * 100
            ),
            currency: "usd",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { clientSecret } = await response.json();
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: formData.name, email: formData.email },
        },
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        setPaymentStatus("failure");
        setDialogOpen(true);
        return;
      }

      setProcessing(false);
      setPaymentStatus("success");
      setDialogOpen(true);
    } catch (err) {
      setError(err.message || "Payment failed.");
      setProcessing(false);
      setPaymentStatus("failure");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (paymentStatus === "success") {
      navigate("/");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full space-y-8 bg-white shadow-xl rounded-xl p-10">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Book Your Service
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              {serviceName} - {plan?.name || "Selected Plan"}
            </p>
            <p className="mt-2 text-center text-sm text-gray-600">
              Total Price: {plan?.priceMonthly || "$0"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="preferredDateTime"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred Date and Time
                </label>
                <input
                  type="datetime-local"
                  name="preferredDateTime"
                  id="preferredDateTime"
                  value={formData.preferredDateTime}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Payment Details
                </label>
                <div className="mt-1">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                  />
                </div>
                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processing}
                className="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {processing ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PaymentStatusDialog
        isOpen={dialogOpen}
        onClose={handleCloseDialog}
        status={paymentStatus}
        bookingDetails={formData}
        serviceName={serviceName}
        plan={plan}
      />
    </>
  );
}

export default function BookingForm() {
  const location = useLocation();

  return (
    <Elements stripe={stripePromise}>
      <BookingFormContent />
    </Elements>
  );
}