import { useSelector } from "react-redux";
import { detailData, detailError, isLoadingDetail } from "../redux/selectors/detail";

const Detail = () => {
  const flightOffer = useSelector( detailData );
  const isLoading = useSelector( isLoadingDetail );
  const error = useSelector( detailError );
  console.log('flightOffer', flightOffer);

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
    <div>
      <h2>Mostrando el itinerario de :</h2>
      { flightOffer.source } <br/>
      { flightOffer.price.total } { flightOffer.price.currency }
    </div>
  )
}

export default Detail;