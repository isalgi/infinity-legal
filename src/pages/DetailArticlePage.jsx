// DetailArticlePage.jsx
import { useParams, Link } from "react-router-dom";
import { getArticleBySlug } from "../data/articles";
import HeaderArticle from "../components/Article/HeaderArticle";

import ReviewsSection from "../components/Home/ReviewsSection";
import FaqSection from "../components/Home/FaqSection";
import ContactSection from "../components/Home/ContactSection";
import Footer from "../components/Home/Footer";

function DetailArticlePage() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <>
        <HeaderArticle />
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 text-center">
          <h1 className="text-2xl font-medium text-gray-700">
            Article not found
          </h1>
          <Link to="/article" className="text-cyan-600 mt-4 inline-block">
            Return to articles
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <HeaderArticle />

      <div className="container mx-auto px-5 md:px-10 lg:px-20 py-8">
        <Link
          to="/article"
          className="text-cyan-600 flex items-center gap-2 mb-4"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          Back
        </Link>

        <h1 className="text-3xl text-cyan-600 mb-6 font-semibold">Article</h1>

        <div className="w-full overflow-hidden rounded-lg mb-6">
          <img
            src={article.image}
            alt={article.title}
            className="w-full max-h-[400px] object-cover"
          />
        </div>

        <h2 className="text-2xl font-medium mb-1">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-6">{article.date}</p>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default DetailArticlePage;
