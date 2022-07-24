import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, UsersIcon, PaperAirplaneIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from "react-redux";
import { isLoadingResultsFlights, resultsFlightsData, resultsFlightsDictionaries, resultsFlightsError } from "../redux/slices/results";

import { getFlightDetail } from "../redux/slices/detail";
import Sidebar from "../components/Sidebar";

const formatMoney = (currency, amount) => {
  return new Intl.NumberFormat("es-CL",
    {
      style: 'currency',
      currency: currency
    }).format(amount);
}

const formatDate = (param) => {
  const date = new Date(param);
  return date.toLocaleDateString("es-CL", { day: 'numeric' }) + " " + date.toLocaleDateString("es-CL", { month: 'long' }).toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase()) + " " + date.toLocaleDateString("es-CL", { year: 'numeric' });
}

const FlightOffers = () => {
  const flightOffers = useSelector(resultsFlightsData);
  const dictionaries = useSelector(resultsFlightsDictionaries);
  const isLoading = useSelector(isLoadingResultsFlights);
  const error = useSelector(resultsFlightsError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { origen, destino, ida, regreso, adultos, boys } = state;

  if (isLoading) {
    return (
      <div>
        <h3>Cargando...</h3>
      </div>
    )
  }
  if (Object.keys(error).length !== 0) {
    return (
      <span className="text-red-500 my-auto mr-4 font-medium">Ha ocurrido un error</span>
    )
  }
  if (flightOffers.length === 0) {
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
          {flightOffers.map((flightOffer) => (
            <li key={flightOffer.id} className="bg-white shadow overflow-hidden rounded-md px-4 py-2">
              <a onClick={() => detail(flightOffer)} className="block cursor-pointer">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center text-sm font-medium text-indigo-500 truncate">
                      <PaperAirplaneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 rotate-45  " aria-hidden="true" />
                      <span className="text-indigo-700 font-semibold">Aerolínea: <span className="capitalize">{dictionaries.carriers[flightOffer.validatingAirlineCodes].toLowerCase()}</span></span>
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-s leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {formatMoney(flightOffer.price.currency, flightOffer.price.total)}
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
                          Último día para reservar: { formatDate(flightOffer.lastTicketingDate)}
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
          ))}
        </ul>
      </div>
    </Sidebar>
  )
}

export default FlightOffers;