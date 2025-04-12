import japanHouse from "../assets/japan-house.jpeg";
import manTablet from "../assets/man-tablet.jpeg";
import sakuratosoju from "../assets/sakuratosoju.jpeg";

// articles.js
export const articles = [
  {
    id: 1,
    slug: "kepengurusan-visa-jepang-2025",
    title: "Kepengurusan Visa Jepang 2025",
    date: "8 Januari 2025",
    image: japanHouse, // Path to your image
    content: `
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est aborum.</p>
     
     <p>Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est aborum. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
     
     <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est aborum. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est aborum.</p>
   `,
  },
  {
    id: 2,
    slug: "kepengurusan-visa-australia-2025",
    title: "Kepengurusan Visa Australia 2025",
    date: "8 Januari 2025",
    image: manTablet,
    content: `
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
     
     <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
     
     <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
   `,
  },
  {
    id: 3,
    slug: "update-terbaru-biaya-pembuatan-pt-2025",
    title: "Update terbaru biaya pembuatan PT 2025",
    date: "8 Januari 2025",
    image: sakuratosoju,
    content: `
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
     
     <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
     
     <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
   `,
  },
  // Add more articles as needed
];

// Helper function to get article by slug
export const getArticleBySlug = (slug) => {
  return articles.find((article) => article.slug === slug);
};

// Helper function to get article by ID
export const getArticleById = (id) => {
  return articles.find((article) => article.id === id);
};
