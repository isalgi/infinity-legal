// src/services/supabase/serviceService.js
import { localDb } from "../localDatabase";
import { cacheService } from "../cache";

export const fetchAllServices = async (
  category = null,
  page = 1,
  limit = 8
) => {
  try {
    const cacheKey = `services-${category || 'all'}-${page}-${limit}`;
    
    // Try to get from cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`Using cached services for page ${page}`);
      return cached;
    }

    const { data, error } = await localDb.findByCategory(
      "services",
      category,
      page,
      limit
    );

    if (error) throw error;

    // Cache the result for 10 minutes
    await cacheService.set(cacheKey, data, 10 * 60 * 1000);

    console.log(`Fetched page ${page}, got ${data.length} items`);
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const fetchServiceBySlug = async (slug) => {
  try {
    const cacheKey = `service-${slug}`;
    
    // Try to get from cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      console.log(`Using cached service for slug: ${slug}`);
      return cached;
    }

    const { data, error } = await localDb.findBySlug("services", slug);

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    // Cache the result for 15 minutes (single service can be cached longer)
    if (data) {
      await cacheService.set(cacheKey, data, 15 * 60 * 1000);
    }

    return data;
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    throw error;
  }
};
