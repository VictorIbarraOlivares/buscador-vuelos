import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import FlightOffers from "../pages/FlightOffers";
import Detail from "../pages/Detail";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/flight-offers" element={<FlightOffers />} />
    <Route path="/flight-offers/detail" element={<Detail />} />
  </Routes>
)

export default AppRouter;