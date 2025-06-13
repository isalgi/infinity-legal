// src/services/supabase/serviceService.js
import { localDb } from "../localDatabase";

export const fetchAllServices = async (
  category = null,
  page = 1,
  limit = 8
) => {
  try {
    const { data, error } = await localDb.findByCategory(
      "services",
      category,
      page,
      limit
    );

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
    const { data, error } = await localDb.findBySlug("services", slug);

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    throw error;
  }
};
