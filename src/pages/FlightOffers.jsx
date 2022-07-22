import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, UsersIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from "react-redux";
import { isLoadingResultsFlights, resultsFlightsData, resultsFlightsError } from "../redux/slices/results";

import { getFlightDetail } from "../redux/slices/detail";
import Sidebar from "../components/Sidebar";

const FlightOffers = () => {
  const flightOffers = useSelector(resultsFlightsData);
  const isLoading = useSelector(isLoadingResultsFlights);
  const error = useSelector(resultsFlightsError);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { state } = useLocation();
  const { origen, destino, ida, regreso, adultos, boys } = state;
  console.log('mostrando lo que viene por state', origen, destino, ida, regreso, adultos, boys);
  console.log('flightOffers', flightOffers);

  if (isLoading) {
    return (
      <div>
        <h3>Cargando...</h3>
      </div>
    )
  }
  if (!error) {
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
    console.log('flightOffer llamado detail', flightOffer);
    // dispatch(getFlightDetail (flightOffer, token));
    dispatch(getFlightDetail(flightOffer));
    navigate('/flight-offers/detail', {
      state: {

      }
    });
  }
  return (
    <Sidebar {...state}>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {flightOffers.map((flightOffer) => (
            <li key={flightOffer.id}>
              <a onClick={() => detail(flightOffer)} className="block hover:bg-gray-50 cursor-pointer">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">ID: {flightOffer.id}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-s leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {flightOffer.price.total} {flightOffer.price.currency}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        Asientos disponibles: {flightOffer.numberOfBookableSeats}
                      </p>

                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                        <p>
                          Ultimo dia para reservar: <time dateTime={flightOffer.lastTicketingDate}>{flightOffer.lastTicketingDate}</time>
                        </p>
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