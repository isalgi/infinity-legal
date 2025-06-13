// src/services/localDatabase.js
import servicesData from "../database/services.json";
import articlesData from "../database/articles.json";

class LocalDatabase {
  constructor() {
    this.services = servicesData.services || [];
    this.articles = articlesData.articles || [];
  }

  // Simulate async behavior like Supabase
  async query(table) {
    return new Promise((resolve) => {
      setTimeout(() => {
        switch (table) {
          case "services":
            resolve({ data: [...this.services], error: null });
            break;
          case "articles":
            resolve({ data: [...this.articles], error: null });
            break;
          default:
            resolve({ data: [], error: { message: "Table not found" } });
        }
      }, 100); // Simulate network delay
    });
  }

  async findBySlug(table, slug) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = null;
        let error = null;

        switch (table) {
          case "services":
            data =
              this.services.find((service) => service.slug === slug) || null;
            break;
          case "articles":
            data =
              this.articles.find((article) => article.slug === slug) || null;
            break;
          default:
            error = { message: "Table not found" };
        }

        if (!data && !error) {
          error = { code: "PGRST116", message: "No rows returned" };
        }

        resolve({ data, error });
      }, 100);
    });
  }

  async findByCategory(table, category, page = 1, limit = 8) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (table !== "services") {
          resolve({
            data: [],
            error: { message: "Invalid table for category filter" },
          });
          return;
        }

        let filteredServices = [...this.services];

        if (category && category !== "all") {
          filteredServices = filteredServices.filter(
            (service) => service.category === category
          );
        }

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = filteredServices.slice(start, end);

        resolve({ data: paginatedData, error: null });
      }, 100);
    });
  }

  async findWithPagination(table, page = 1, limit = 8) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = [];

        switch (table) {
          case "services":
            data = [...this.services];
            break;
          case "articles":
            data = [...this.articles].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
          default:
            resolve({ data: [], error: { message: "Table not found" } });
            return;
        }

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedData = data.slice(start, end);

        resolve({ data: paginatedData, error: null });
      }, 100);
    });
  }

  async findWithLimit(table, limit) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = [];

        switch (table) {
          case "services":
            data = [...this.services];
            break;
          case "articles":
            data = [...this.articles].sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            break;
          default:
            resolve({ data: [], error: { message: "Table not found" } });
            return;
        }

        const limitedData = data.slice(0, limit);
        resolve({ data: limitedData, error: null });
      }, 100);
    });
  }
}

export const localDb = new LocalDatabase();
