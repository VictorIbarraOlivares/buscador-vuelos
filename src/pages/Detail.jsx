import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import {
  getFlightDetail,
  isLoadingFlightDetail,
  flightDetailData,
  flightDetailError
} from "../redux/slices/detail";
import { PaperAirplaneIcon, UserIcon } from '@heroicons/react/solid'
import { resultsFlightsDictionaries } from "../redux/slices/results";
import {
  locationsOptions,
  formatDate,
  getLocation,
  formatTime,
  formatDuration,
  getTypeTraveler,
  formatMoney
} from "../utils/helpers";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = () => {
  const flightOffer = useSelector(flightDetailData);
  const dictionaries = useSelector(resultsFlightsDictionaries);
  const isLoading = useSelector(isLoadingFlightDetail);
  const error = useSelector(flightDetailError);

  const navigate = useNavigate();
  const { state } = useLocation();
  const { origen, destino, ida, regreso, adultos, boys } = state ? state : {};

  const getCarrier = (code) => {
    return dictionaries.carriers[code] ? dictionaries.carriers[code].toLowerCase() : code;
  }

  useEffect(() => {
    if (Object.keys(flightOffer).length === 0) {
      navigate('/flight-offers', {
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
  }, [])

  if (isLoading) {
    return (
      <div>
        <h3>Cargando itinerario...</h3>
      </div>
    )
  }
  if (Object.keys(error).length !== 0) {
    return (
      <span className="text-red-500 my-auto mr-4 font-medium">Ha ocurrido un error en el itinerario</span>
    )
  }

  return (
    <Sidebar>
      <>
        <div className="min-h-full">
          <main>
            <div className="max-w-3xl mx-auto grid grid-rows-1 gap-1 grid-flow-row lg:gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              {flightOffer?.itineraries?.map((item, itemIdx) => (
                <section key={'item' + itemIdx} aria-labelledby="itinerarios-title" className="lg:col-start-1 lg:col-span-2 lg:mb-3">
                  <div className="bg-white px-4 py-5 shadow shadow-indigo-400 sm:rounded-lg sm:px-6">
                    <h2 id="itinerarios-title" className="text-lg font-medium text-gray-900">
                      Viaje de {itemIdx == 0 ? 'ida' : 'regreso'} duración total {formatDuration(item.duration)}
                    </h2>
                    <div className="mt-2 flow-root">
                      <ul role="list" className="-mb-8">
                        <li>
                          <ul role="list" className="-mb-8 ">
                            {item.segments.map((segment, segmentIdx) => (
                              <li key={'segment' + segmentIdx + 'item' + itemIdx} className="py-4">
                                <div className="relative pb-8">
                                  <span
                                    className="absolute top-10 left-4 -ml-px h-full w-0.5 bg-indigo-300"
                                    aria-hidden="true"
                                  />
                                  {/* {segmentIdx !== item.segments.length - 1 ? (
                                    
                                  ) : null} */}
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span
                                        className="bg-white
                                          h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white rotate-45"
                                      >
                                        <PaperAirplaneIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div className="text-sm text-gray-500">
                                        <p >Partida</p>
                                        <p className="font-semibold">{getLocation(locationsOptions, segment.departure.iataCode)}</p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500 font-semibold">
                                        <time dateTime={segment.departure.at}>{formatDate(segment.departure.at)}</time>
                                        <p >{formatTime(segment.departure.at)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="relative pb-8">
                                  <span
                                    className="absolute top-10 left-4 -ml-px h-full w-0.5 bg-indigo-300"
                                    aria-hidden="true"
                                  />
                                  {/* {segmentIdx !== item.segments.length - 1 ? (
                                    
                                  ) : null} */}
                                  <div className="relative flex space-x-3 ml-10">
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div className="whitespace-nowrap text-gray-500">
                                        <div className="text-sm text-left text-gray-500">
                                          <p >Vuelo</p>
                                          <p className="font-semibold">{segment.number}</p>
                                        </div>
                                        <div className="text-sm text-left text-gray- mt-1">
                                          <p >Duración</p>
                                          <p className="font-semibold">{formatDuration(segment.duration)}</p>
                                        </div>
                                      </div>

                                      <div className="whitespace-nowrap text-gray-500">
                                        <div className="text-sm text-left text-gray-500">
                                          <p>Aerolínea</p>
                                          <p className="font-semibold capitalize">{getCarrier(segment.carrierCode)}</p>
                                        </div>
                                        <div className="text-sm text-gray-500 mt-1">
                                          <p>Avión</p>
                                          <p className="font-semibold">{dictionaries.aircraft[segment.aircraft.code]}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="relative pb-8">
                                  {segmentIdx !== item.segments.length - 1 ? (
                                    <span
                                      className="absolute top-10 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                      aria-hidden="true"
                                    />
                                  ) : null}
                                  <div className="relative flex space-x-3">
                                    <div>
                                      <span
                                        className="bg-white
                                          h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white rotate-145"
                                      >
                                        <PaperAirplaneIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
                                      </span>
                                    </div>
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div className="text-sm text-gray-500">
                                        <p >Llegada</p>
                                        <p className="font-semibold">{getLocation(locationsOptions, segment.arrival.iataCode)}</p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500 font-semibold">
                                        <time dateTime={segment.arrival.at}>{formatDate(segment.arrival.at)}</time>
                                        <p >{formatTime(segment.arrival.at)}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              ))}
              <section aria-labelledby="total-title" className=" lg:col-span-1 sm:mb-5 order-first">
                <div className="bg-white px-4 py-5 shadow shadow-indigo-400 sm:rounded-lg sm:px-6">
                  <h2 id="total-title" className="text-lg font-medium text-gray-900">
                    Total <span className="float-right"> {formatMoney(flightOffer?.price?.currency, flightOffer?.price?.total)}</span>
                  </h2>
                  <ul role="list" className="mt-2">
                    {flightOffer?.travelerPricings?.map((travelerPricing, travelerPricingIdx) => (
                      <li key={'travelerPricing' + travelerPricingIdx} className="py-3">
                        <div className="relative pb-3">
                          <div className="relative flex space-x-3">
                            <div className="flex items-center justify-center ">
                              <UserIcon className="w-5 h-5 text-indigo-500" aria-hidden="true" />
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div className="text-sm text-gray-500">
                                <p >Tipo</p>
                                <p className="font-semibold">{getTypeTraveler(travelerPricing.travelerType)}</p>
                              </div>
                              <div className="text-left text-sm whitespace-nowrap text-gray-500">
                                <p >Precio</p>
                                <p className="font-semibold">{formatMoney(travelerPricing.price.currency, travelerPricing.price.total)}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </main>
        </div>
      </>
    </Sidebar>
  )
}

export default Detail;