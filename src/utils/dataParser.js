// src/utils/dataParser.js
export const parseJsonField = (field) => {
  if (!field) return [];
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch {
      return [];
    }
  }
  return Array.isArray(field) ? field : [];
};

export const parseRequiredDocuments = (documents) => {
  const parsed = parseJsonField(documents);
  return parsed.map((doc) => ({
    name: doc.name || "",
    description: doc.description || "",
  }));
};

export const parseAdditionalImages = (images) => {
  const parsed = parseJsonField(images);
  return parsed.additionalImages || [];
};
