// src/services/supabase/serviceService.js
import { supabase } from "../supabase-config";

// In your serviceService.js
export const fetchAllServices = async (
  category = null,
  page = 1,
  limit = 8
) => {
  try {
    // Calculate range start and end
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    let query = supabase.from("services").select("*").range(start, end);

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) throw error;
    console.log(`Fetched page ${page}, got ${data.length} items`);
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
