import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import {
  getFlightDetail,
  isLoadingFlightDetail,
  flightDetailData,
  flightDetailError
} from "../redux/slices/detail";
import { PaperAirplaneIcon, CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid'
import { resultsFlightsDictionaries } from "../redux/slices/results";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Detail = () => {
  const flightOffer = useSelector(flightDetailData);
  const dictionaries = useSelector(resultsFlightsDictionaries);
  const isLoading = useSelector(isLoadingFlightDetail);
  const error = useSelector(flightDetailError);

  const eventTypes = {
    applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
    advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
    completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
  }
  const timeline = [
    {
      id: 1,
      type: eventTypes.applied,
      content: 'Applied to',
      target: 'Front End Developer',
      date: 'Sep 20',
      datetime: '2020-09-20',
    },
    {
      id: 2,
      type: eventTypes.advanced,
      content: 'Advanced to phone screening by',
      target: 'Bethany Blake',
      date: 'Sep 22',
      datetime: '2020-09-22',
    },
    {
      id: 3,
      type: eventTypes.completed,
      content: 'Completed phone screening with',
      target: 'Martha Gardner',
      date: 'Sep 28',
      datetime: '2020-09-28',
    },
    {
      id: 4,
      type: eventTypes.advanced,
      content: 'Advanced to interview by',
      target: 'Bethany Blake',
      date: 'Sep 30',
      datetime: '2020-09-30',
    },
    {
      id: 5,
      type: eventTypes.completed,
      content: 'Completed interview with',
      target: 'Katherine Snyder',
      date: 'Oct 4',
      datetime: '2020-10-04',
    },
  ]

  if (isLoading) {
    return (
      <div>
        <h3>Cargando itinerario...</h3>
      </div>
    )
  }
  if (!error) {
    return (
      <span className="text-red-500 my-auto mr-4 font-medium">Ha ocurrido un error en itinerario</span>
    )
  }

  return (
    <Sidebar>
      <>
        <div className="min-h-full">

          <main>

            <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

              <section aria-labelledby="itinerarios-title" className="lg:col-start-1 lg:col-span-2">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <h2 id="itinerarios-title" className="text-lg font-medium text-gray-900">
                    Itinerarios
                  </h2>
                  <div className="mt-2 flow-root">
                    <ul role="list" className="-mb-8">
                      {flightOffer.itineraries.map((item, itemIdx) => (
                        <li key={'item' + itemIdx}>
                          <ul role="list" className="-mb-8 ">
                            {item.segments.map((segment, segmentIdx) => (
                              <li key={segmentIdx} className="py-4">
                                <div className="relative pb-8">
                                  <span
                                    className="absolute top-10 left-4 -ml-px h-full w-0.5 bg-gray-200"
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
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Partida {segment.departure.iataCode}
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={segment.departure.at}>{segment.departure.at}</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="relative pb-8">
                                  <span
                                    className="absolute top-10 left-4 -ml-px h-full w-0.5 bg-gray-200"
                                    aria-hidden="true"
                                  />
                                  {/* {segmentIdx !== item.segments.length - 1 ? (
                                    
                                  ) : null} */}
                                  <div className="relative flex space-x-3 ml-10">
                                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Nun vuelo {segment.number}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          duracion {segment.duration}
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <p className="text-sm text-gray-500">
                                          Aerolínea {segment.carrierCode}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                          Avión  {segment.aircraft.code}
                                        </p>
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
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          Llegada {segment.arrival.iataCode}
                                        </p>
                                      </div>
                                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={segment.arrival.at}>{segment.arrival.at}</time>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section aria-labelledby="total-title" className=" lg:col-span-1">
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2 id="total-title" className="text-lg font-medium text-gray-900">
                    Total {flightOffer.price.total} {flightOffer.price.currency}
                  </h2>
                  <h3>
                  Duracion {flightOffer.itineraries[0].duration}
                  </h3>
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