// src/services/supabase/articleService.js
import { localDb } from "../localDatabase";

export const fetchAllArticles = async (limit = null) => {
  try {
    const { data, error } = limit
      ? await localDb.findWithLimit("articles", limit)
      : await localDb.query("articles");

    if (error) throw error;

    // Sort by date descending (newest first)
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return sortedData;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug) => {
  try {
    const { data, error } = await localDb.findBySlug("articles", slug);

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the error for no rows returned
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching article by slug:", error);
    throw error;
  }
};
