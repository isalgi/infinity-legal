// src/pages/News/DetailArticlePage.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";
import HeaderArticle from "../../components/News/HeaderArticle";
import {
  fetchArticleBySlug,
  fetchAllArticles,
} from "../../services/supabase/articleService";
import ArticleCard from "../../components/News/ArticleCard";

function DetailArticlePage() {
  const { slug } = useParams();
  const queryClient = useQueryClient();

  // Prefetch additional articles for recommendations
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["articles", 1, 3],
      queryFn: () => fetchAllArticles(3, 1),
    });
  }, [queryClient]);

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", slug],
    queryFn: () => fetchArticleBySlug(slug),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // Query for recommended articles
  const { data: recommendedArticles = [] } = useQuery({
    queryKey: ["articles", 1, 3],
    queryFn: () => fetchAllArticles(3, 1),
    staleTime: 5 * 60 * 1000,
    enabled: !isLoading && !!article, // Only run after the main article is loaded
  });

  // Filter out the current article from recommendations
  const filteredRecommendations = recommendedArticles
    .filter((rec) => rec.slug !== slug)
    .slice(0, 3);

  if (isLoading) {
    return (
      <>
        <HeaderArticle />
        <div className="container mx-auto px-5 md:px-10 lg:px-20 py-16 flex justify-center items-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
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

      <div className="container mx-auto px-5 md:px-10 lg:px-20 py-8 pt-32">
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
            loading="lazy"
          />
        </div>

        <h2 className="text-2xl font-medium mb-1">{article.title}</h2>
        <p className="text-gray-600 text-sm mb-6">{article.date}</p>

        <div
          className="prose max-w-none [&>p]:mb-6 [&>p]:leading-relaxed [&>h1]:mt-8 [&>h1]:mb-4 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:mt-6 [&>h3]:mb-3 [&>h1]:font-semibold [&>h2]:font-semibold [&>h3]:font-semibold [&>h1]:text-gray-800 [&>h2]:text-gray-800 [&>h3]:text-gray-800"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>

      {/* Article Recommendation Section */}
      <section className="container mx-auto px-5 md:px-10 lg:px-20 py-12">
        <h2 className="text-2xl font-medium text-cyan-600 mb-8">
          Article Recommendation
        </h2>

        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredRecommendations.map((rec) => (
              <ArticleCard
                key={rec.id}
                image={rec.image}
                title={rec.title}
                date={rec.date}
                slug={rec.slug}
              />
            ))}
          </div>
        ) : (
          <p>No recommendations available at this time.</p>
        )}

        <div className="text-right mt-8">
          <Link
            to="/news"
            className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
          >
            View More &gt;&gt;
          </Link>
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
