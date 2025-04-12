// Route.jsx
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import ArticlePage from "../pages/News/ArticlePage";
import DetailArticlePage from "../pages/News/DetailArticlePage";

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
