// src/services/supabase/serviceService.js
import { supabase } from "../supabase-config";

export const fetchAllServices = async (category = null) => {
  try {
    let query = supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const fetchServiceBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    throw error;
  }
};
