// Route.jsx
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ArticlePage from "../pages/ArticlePage";
import DetailArticlePage from "../pages/DetailArticlePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/article" element={<ArticlePage />} />
      <Route path="/article/:slug" element={<DetailArticlePage />} />
    </Routes>
  );
};

export default AppRoutes;
