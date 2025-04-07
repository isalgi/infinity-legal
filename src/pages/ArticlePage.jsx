import ReviewsSection from "../components/Home/ReviewsSection";
import FaqSection from "../components/Home/FaqSection";
import ContactSection from "../components/Home/ContactSection";
import Footer from "../components/Home/Footer";
import HeaderArticle from "../components/Article/HeaderArticle";
import ArticleCard from "../components/Article/ArticleCard";

function ArticlePage() {
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
                  className="w-full h-12 pl-5 pr-10 text-lg text-gray-500 bg-white rounded-2xl border border-gray-300 focus:outline-none focus:border-cyan-500"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newest Article Section */}
        <section className="container mx-auto px-5 md:px-10 lg:px-20 pb-12 mt-10">
          <h2 className="text-3xl font-medium text-cyan-600 mb-12">
            Newest Article
          </h2>
          <div className="w-full">
            <article className="flex flex-col gap-5 cursor-pointer">
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/121aec0d166b3b84d7a2b865128cea36ca0c9c1a"
                  alt="Japanese house with traditional roofing"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <h3 className="text-xl font-medium text-black">
                  Kepengurusan Visa Jepang 2025
                </h3>
                <time className="text-sm text-gray-700">8 Januari 2025</time>
              </div>
              <p className="text-base leading-7 text-gray-700 mt-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit involuptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est aborum..
                Duis aute irure dolo
              </p>
            </article>
          </div>
        </section>

        {/* Article Cards Section */}
        <section className="container mx-auto px-5 md:px-10 lg:px-20 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/b6ed540b2fe0d36894c13be0147cf04842d9edd5"
              title="Kepengurusan Visa Australia 2025"
              date="8 Januari 2025"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/8d18a512db57707785625aed26ffa41472b47842"
              title="Update terbaru biaya pembuatan PT 2025"
              date="8 Januari 2025"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/120b19709eed5b35dda75f3ce8a98d45307f21ed"
              title="Menangani permasalahan legal perusahaan anda"
              date="8 Desember 2024"
            />
          </div>
        </section>

        {/* More Articles Section */}
        <section className="container mx-auto px-5 md:px-10 lg:px-20 py-12">
          <h2 className="text-2xl font-medium text-cyan-600 mb-8">
            More Article
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/508f909727b3e01fdc3de88c5aaca8081faf8a6b"
              title="Article 1"
              date="8 Januari 2024"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/a6cdd1ae2d9f21fcc749f9c0c0718e3e8fe0f11a"
              title="Article 6"
              date="8 Januari 2024"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/2ff89cc55caedca6cf7f80e8999ffbdfd8c322d3"
              title="Article 5"
              date="8 Januari 2024"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/a67b204165b3e062dd650d0b5102ad742270ef4c"
              title="Article 2"
              date="8 Januari 2024"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/5abf52b08bb07ef38205f80f02ae316b006d8a06"
              title="Article 3"
              date="8 Januari 2024"
            />
            <ArticleCard
              image="https://cdn.builder.io/api/v1/image/assets/TEMP/ca6696135ca09f4a0ce8ef33849865323a32bb55"
              title="Article 4"
              date="8 Januari 2024"
            />
          </div>

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
      </div>
    </>
  );
}

export default ArticlePage;
