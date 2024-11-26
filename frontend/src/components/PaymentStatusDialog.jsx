import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function PaymentStatusDialog({
  isOpen,
  onClose,
  status,
  bookingDetails,
  serviceName,
  plan,
}) {
  // Determine icon and styling based on payment status
  const isSuccess = status === "success";
  const Icon = isSuccess ? CheckCircleIcon : ExclamationTriangleIcon;
  const iconColor = isSuccess ? "text-green-600" : "text-red-600";
  const title = isSuccess ? "Payment Successful" : "Payment Failed";

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${iconColor}`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  {isSuccess ? (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Your booking for <strong>{serviceName}</strong> (
                        {plan?.name}) has been confirmed.
                      </p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Details:</p>
                        <ul className="list-disc list-inside">
                          <li>Name: {bookingDetails.name}</li>
                          <li>Email: {bookingDetails.email}</li>
                          <li>Date: {bookingDetails.preferredDateTime}</li>
                          <li>Address: {bookingDetails.address}</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Unfortunately, your payment could not be processed.
                        Please check your payment details and try again.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto 
                  ${
                    isSuccess
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                onClick={onClose}
              >
                {isSuccess ? "Continue" : "Try Again"}
              </button>
              {!isSuccess && (
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={onClose}
                >
                  Cancel
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}