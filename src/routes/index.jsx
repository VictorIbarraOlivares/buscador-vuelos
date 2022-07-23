import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import FlightOffers from "../pages/FlightOffers";
import Detail from "../pages/Detail";
import NoMatch from "../pages/NoMatch";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/flight-offers" element={<FlightOffers />} />
    <Route path="/flight-offers/detail" element={<Detail />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
)

export default AppRouter;