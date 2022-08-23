import { memo, useCallback } from "react";
import { PaperAirplaneIcon, CalendarIcon, UsersIcon } from "@heroicons/react/solid";
// import {  formatDate } from "../utils/helpers";


const FlightOfferItem = ({ flightOffer, onClick, getCarrier }) => {
  const formatMoney = useCallback(() => {
    return new Intl.NumberFormat("es-CL",
    {
      style: 'currency',
      currency: flightOffer.price.currency,
    }).format(flightOffer.price.total);
  }, [flightOffer.price.currency, flightOffer.price.total,])

  const formatDate = useCallback(() => {
    const date = new Date(flightOffer.lastTicketingDate);
    return date.toLocaleDateString("es-CL", { day: 'numeric' }) + " " + date.toLocaleDateString("es-CL", { month: 'long' }).toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase()) + " " + date.toLocaleDateString("es-CL", { year: 'numeric' });
  }, [flightOffer.lastTicketingDate])
  
  return (
    <>
      <li className="bg-white hover:bg-gray-100 hover:opacity-90 shadow-md shadow-indigo-600 overflow-hidden rounded-md px-4 py-2">
        <a onClick={() => onClick(flightOffer)} className="block cursor-pointer">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <p className="flex items-center text-sm font-medium text-indigo-500 truncate">
                <PaperAirplaneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 rotate-45  " aria-hidden="true" />
                <span className="text-indigo-700 font-semibold">Aerolínea
                  <span className="capitalize"> {getCarrier(flightOffer.validatingAirlineCodes)}</span>
                </span>
              </p>
              <div className="ml-2 flex-shrink-0 flex">
                <p className="px-2 inline-flex text-s leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {/* {formatMoney(flightOffer.price.currency, flightOffer.price.total)} */}
                  {formatMoney()}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p className="flex items-center text-sm text-gray-500">
                  <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-gray-700 font-semibold">Asientos disponibles: {flightOffer.numberOfBookableSeats}</span>
                </p>

                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                  <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  <span className="text-gray-700 font-semibold">
                    Último día para reservar {formatDate()}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center text-sm sm:mt-0">
                <button
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                >
                  Ver itinerarios
                </button>
              </div>
            </div>
          </div>
        </a>
      </li>
    </>
  );
};

export default memo(FlightOfferItem);