import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { getFlightDetail, isLoadingFlightDetail, flightDetailData, flightDetailError } from "../redux/slices/detail";

const Detail = () => {
  const dispatch = useDispatch();
  const flightOffer = useSelector( flightDetailData );
  const isLoading = useSelector( isLoadingFlightDetail );
  const error = useSelector( flightDetailError );
  console.log('flightOffer detail', flightOffer);

  // useEffect(() => {
  //   dispatch(getFlightDetail(flightOffer));
  // }, []);

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
      <div>
        <h2>Mostrando el itinerario de :</h2>
        { flightOffer.source } <br/>
        { flightOffer.price.total } { flightOffer.price.currency }
      </div>
    </Sidebar>
  )
}

export default Detail;