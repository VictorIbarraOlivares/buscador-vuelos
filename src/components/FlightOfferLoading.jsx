import { PaperAirplaneIcon, CalendarIcon, UsersIcon } from "@heroicons/react/solid";
const FlightOfferLoading = () => {
  return (
    <li className="bg-white shadow overflow-hidden rounded-md px-4 py-2 animate-pulse ">
      <a className="block">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm font-medium text-indigo-500 truncate">
              <PaperAirplaneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 rotate-45 " aria-hidden="true" />
              <div className="h-2.5 bg-indigo-300 rounded-full w-40" ></div>
            </div>
            <div className="ml-2 flex-shrink-0 flex">
              <div className="h-4 bg-green-200 rounded-full w-28" ></div>
            </div>
          </div>
          <div className="mt-2 flex justify-between">
            <div className="flex">
              <div className="flex items-center text-sm text-gray-500">
                <UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <div className="h-2 bg-gray-300 rounded-full w-28"></div>
              </div>

              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                <div className="h-2 bg-gray-300 rounded-full w-28"></div>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm sm:mt-0">
              <button
                type="button"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 h-8 w-28 cursor-default"
              >
              </button>
            </div>
          </div>
        </div>
      </a>
    </li>
  )
};

export default FlightOfferLoading;