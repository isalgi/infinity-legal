// src/services/firebase/articleService.js
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config"; // Adjust path as needed to your Firebase config

// Get all articles
export const fetchAllArticles = async () => {
  try {
    const articlesRef = collection(db, "articles");
    const articlesQuery = query(articlesRef, orderBy("date", "desc")); // Most recent first
    const querySnapshot = await getDocs(articlesQuery);

    const articles = [];
    querySnapshot.forEach((doc) => {
      articles.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

// Get article by slug
export const fetchArticleBySlug = async (slug) => {
  try {
    const articlesRef = collection(db, "articles");
    const q = query(articlesRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    // Return the first matching document
    const articleDoc = querySnapshot.docs[0];
    return {
      id: articleDoc.id,
      ...articleDoc.data(),
    };
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
};

// Get article by ID
export const fetchArticleById = async (id) => {
  try {
    const articleRef = doc(db, "articles", id);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      return null;
    }

    return {
      id: articleSnap.id,
      ...articleSnap.data(),
    };
  } catch (error) {
    console.error("Error fetching article by ID:", error);
    throw error;
  }
};
