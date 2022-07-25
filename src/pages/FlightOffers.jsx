import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, UsersIcon, PaperAirplaneIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from "react-redux";
import { isLoadingResultsFlights, resultsFlightsData, resultsFlightsDictionaries, resultsFlightsError } from "../redux/slices/results";
import FlightOfferItem from '../components/FlightOfferItem';

import { getFlightDetail } from "../redux/slices/detail";
import Sidebar from "../components/Sidebar";

const FlightOffers = () => {
  const flightOffers = useSelector(resultsFlightsData);
  const dictionaries = useSelector(resultsFlightsDictionaries);
  const isLoading = useSelector(isLoadingResultsFlights);
  const error = useSelector(resultsFlightsError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { origen, destino, ida, regreso, adultos, boys } = state;

  const getCarrier = (code) => {
    return dictionaries.carriers[code] ? dictionaries.carriers[code].toLowerCase() : code;
  }

  if (Object.keys(error).length !== 0) {
    return (
      <span className="text-red-500 my-auto mr-4 font-medium">Ha ocurrido un error</span>
    )
  }
  if (!isLoading && flightOffers.length === 0) {
    return (
      <div>
        <h3>No hay resultados para la busqueda.</h3>
        <p>Vuelva a intentarlo con otros parametros</p>
      </div>
    )
  }
  const detail = (flightOffer) => {
    // dispatch(getFlightDetail (flightOffer, token));
    dispatch(getFlightDetail(flightOffer));
    navigate('/flight-offers/detail', {
      state: {
        origen: origen,
        destino: destino,
        ida: ida,
        regreso: regreso,
        adultos: adultos,
        boys: boys
      }
    });
  }

  return (
    <Sidebar>
      <div className="overflow-hidden sm:rounded-md">
        <ul role="list" className="space-y-3">
          {!isLoading && 
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-2 animate-pulse ">
              <a className="block">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center text-sm font-medium text-indigo-500 truncate">
                      <PaperAirplaneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 rotate-45 " aria-hidden="true" />
                      <div className="h-2.5 bg-indigo-300 rounded-full w-40" ></div>
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <div className="h-4 bg-green-200 rounded-full w-28" ></div>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <div className="flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <div className="h-2 bg-gray-300 rounded-full w-28"></div>
                      </p>
      
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <div className="h-2 bg-gray-300 rounded-full w-28"></div>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm sm:mt-0">
                      <button
                        type="button"
                        className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-8 w-28"
                      >
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          }
          {!isLoading && flightOffers?.map((flightOffer) => <FlightOfferItem key={flightOffer.id} flightOffer={flightOffer} onClick={detail} getCarrier={getCarrier} />)}
        </ul>
      </div>
    </Sidebar>
  )
}

export default FlightOffers;