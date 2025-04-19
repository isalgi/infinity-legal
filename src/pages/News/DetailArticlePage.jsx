// src/pages/News/DetailArticlePage.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";
import HeaderArticle from "../../components/News/HeaderArticle";
import { fetchArticleBySlug } from "../../services/firebase/articleService";

function DetailArticlePage() {
  const { slug } = useParams();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  if (isLoading) {
    return (
      <>
        <HeaderArticle />
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 text-center">
          <div className="text-cyan-600 text-xl">Loading article...</div>
        </div>
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <HeaderArticle />
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 text-center">
          <h1 className="text-2xl font-medium text-gray-700">
            {error ? "Failed to load article" : "Article not found"}
          </h1>
          <Link to="/news" className="text-cyan-600 mt-4 inline-block">
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
        <Link to="/news" className="text-cyan-600 flex items-center gap-2 mb-4">
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

      {/* Article Recommendation Section */}
      <section className="container mx-auto px-5 md:px-10 lg:px-20 py-12">
        <h2 className="text-2xl font-medium text-cyan-600 mb-8">
          Article Recommendation
        </h2>

        <div className="text-right">
          <a
            href="#"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            View More &gt;&gt;
          </a>
        </div>
      </section>

      <ReviewsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </>
  );
}

export default DetailArticlePage;
