import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isLoadingResultsFlights, resultsFlightsData, resultsFlightsDictionaries, resultsFlightsError } from "../redux/slices/results";
import FlightOfferItem from '../components/FlightOfferItem';
import { getFlightDetail } from "../redux/slices/detail";
import Sidebar from "../components/Sidebar";
import FlightOfferLoading from "../components/FlightOfferLoading";
import { useCallback } from "react";

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
          {!isLoading && (flightOffers?.length === 0 || Object.keys(error).length !== 0) &&
            <li className="bg-white shadow overflow-hidden rounded-md px-4 py-2">
              <a onClick={() => navigate('/')} className="block cursor-pointer">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className={'flex items-center font-medium ' +
                      (Object.keys(error).length !== 0 ? 'text-red-500' : 'text-indigo-500')}>
                      {Object.keys(error).length !== 0 ? 'Lo sentimos, ha ocurrido un error' : 'No hay resultados para la búsqueda'}
                    </p>
                    <button
                      type="button"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm 
                      text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                    >
                      Vuelva a intentarlo con otros parametros
                    </button>
                  </div>
                </div>
              </a>
            </li>
          }
          {isLoading && <FlightOfferLoading />}
          {!isLoading && flightOffers?.map((flightOffer) =>
            <FlightOfferItem
              key={flightOffer.id}
              flightOffer={flightOffer}
              onClick={detail}
              getCarrier={getCarrier}
            />
          )}
        </ul>
      </div>
    </Sidebar>
  )
}

export default FlightOffers;