import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Index />} />
  </Routes>
)

export default AppRouter;