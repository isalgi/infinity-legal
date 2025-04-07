import { Route, Routes } from "react-router-dom";
import InfinityLegal from "../pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<InfinityLegal />} />
    </Routes>
  );
};

export default AppRoutes;
