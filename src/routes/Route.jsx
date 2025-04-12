// Route.jsx
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ArticlePage from "../pages/ArticlePage";
import DetailArticlePage from "../pages/DetailArticlePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/news" element={<ArticlePage />} />
      <Route path="/news/:slug" element={<DetailArticlePage />} />
    </Routes>
  );
};

export default AppRoutes;
