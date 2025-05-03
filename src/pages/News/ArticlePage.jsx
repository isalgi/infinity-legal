// src/pages/News/ArticlePage.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReviewsSection from "../../components/Home/ReviewsSection";
import FaqSection from "../../components/Home/FaqSection";
import ContactSection from "../../components/Home/ContactSection";
import Footer from "../../components/Home/Footer";
import HeaderArticle from "../../components/News/HeaderArticle";
import ArticleCard from "../../components/News/ArticleCard";
import { fetchAllArticles } from "../../services/supabase/articleService";

function ArticlePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: () => fetchAllArticles(5), // Only fetch 5 articles
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  // Filter articles based on search term
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the newest article
  const newestArticle =
    filteredArticles.length > 0 ? filteredArticles[0] : null;

  // Articles excluding the newest one for the article cards section
  const remainingArticles =
    filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  return (
    <>
      <div className="relative min-h-screen">
        <HeaderArticle />

        {/* News Title and Search */}
        <section className="pt-12 pb-4 max-md:pt-8 max-sm:pt-6">
          <div className="container mx-auto px-5 md:px-10 lg:px-20">
            <h1 className="text-3xl font-medium text-gray-700 mb-6">
              Berita Hari ini
            </h1>
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-12 pl-5 pr-10 text-lg text-gray-500 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Newest Article Section */}
        {newestArticle && (
          <section className="container mx-auto px-5 md:px-10 lg:px-20 pb-12 mt-10">
            <h2 className="text-4xl font-semibold text-[#1196A9] mb-12">
              Newest Article
            </h2>
            <div className="w-full">
              <article className="flex flex-col">
                <div className="w-full overflow-hidden rounded-lg">
                  <Link to={`/news/${newestArticle.slug}`}>
                    <img
                      src={newestArticle.image}
                      alt={newestArticle.title}
                      className="w-full h-[500px] object-cover"
                      loading="lazy"
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-1 my-6">
                  <h3 className="text-2xl font-medium text-black">
                    {newestArticle.title}
                  </h3>
                  <time className="text-base text-gray-700">
                    {newestArticle.date}
                  </time>
                </div>
                <p className="text-base leading-7 text-gray-700">
                  {newestArticle.content
                    .substring(0, 800)
                    .replace(/<[^>]*>/g, "")}
                  ...
                </p>
              </article>
            </div>
          </section>
        )}

        {/* Article Cards Section */}
        <section className="container mx-auto px-5 md:px-10 lg:px-20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {remainingArticles.map((article) => (
              <ArticleCard
                key={article.id}
                image={article.image}
                title={article.title}
                date={article.date}
                slug={article.slug}
              />
            ))}
          </div>
        </section>

        <ReviewsSection />
        <FaqSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default ArticlePage;
