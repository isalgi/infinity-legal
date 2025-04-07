import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ArticlePage from "../pages/ArticlePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article" element={<ArticlePage />} />
    </Routes>
  );
};

export default AppRoutes;
