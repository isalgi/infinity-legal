// src/services/supabase/articleService.js
import { supabase } from "../supabase-config";

export const fetchAllArticles = async () => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("date", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};

export const fetchArticleBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .single();

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
