import { categories } from "@/data/categories";

interface Category {
  name: string;
  code: string;
  subcategories?: Category[];
}

const findCategory = (
  code: number,
  category: "large" | "medium" | "small"
): Category | null => {
  const codeAsString = String(code);

  if (category === "large") {
    const largeCategoryCode = codeAsString.substring(0, 1) + "0000";
    const largeCategory = categories.find(
      (category) => category.code === largeCategoryCode
    );
    if (largeCategory) {
      const largeData = {
        name: largeCategory.name,
        code: largeCategory.code,
        subcategories: largeCategory.subcategories,
      };
      return largeData;
    }
    return null;
  }

  //medium
  if (category === "medium") {
    const largeCategory = findCategory(code, "large");
    if (!largeCategory || !largeCategory.subcategories) return null;
    const mediumCategoryCode = codeAsString.substring(1, 2);

    const mediumCategory = largeCategory.subcategories.find(
      (medium) => medium.code.substring(1, 2) === mediumCategoryCode
    );

    if (mediumCategory) {
      const mediumData = {
        name: mediumCategory.name,
        code: mediumCategory.code,
        subcategories: mediumCategory.subcategories,
      };
      return mediumData;
    }
    return null;
  }

  // small
  if (category === "small") {
    const mediumCategory = findCategory(code, "medium");
    if (!mediumCategory || !mediumCategory.subcategories) return null;
    const smallCategoryCode = codeAsString.substring(2, 3);

    const smallCategory = mediumCategory.subcategories.find(
      (small) => small.code.substring(2, 3) === smallCategoryCode
    );

    if (smallCategory) {
      const smallData = {
        name: smallCategory.name,
        code: smallCategory.code,
        subcategories: smallCategory.subcategories,
      };
      return smallData;
    }
    return null;
  }
  return null;
};

// TODO:code string으로 변경

export const findFullCategoryNames = (code: number) => {
  const largeCategory = findCategory(code, "large");
  const mediumCategory = findCategory(code, "medium");
  const smallCategory = findCategory(code, "small");

  const categoryNames = {
    large: largeCategory?.name || null,
    medium: mediumCategory?.name || null,
    small: smallCategory?.name || null,
  };
  return categoryNames;
};

export function findParentCategories(code: string) {
  let result = {
    largeCategory: null as string | null,
    mediumCategory: null as string | null,
    smallCategory: null as string | null,
  };

  for (const largeCategory of categories) {
    if (largeCategory.code === code) {
      result.largeCategory = largeCategory.code;
      return result;
    }

    for (const mediumCategory of largeCategory.subcategories) {
      if (mediumCategory.code === code) {
        result.largeCategory = largeCategory.code;
        result.mediumCategory = mediumCategory.code;
        return result;
      }
      for (const smallCategory of mediumCategory.subcategories) {
        if (smallCategory.code === code) {
          result.largeCategory = largeCategory.code;
          result.mediumCategory = mediumCategory.code;
          result.smallCategory = smallCategory.code;
          return result;
        }
      }
    }
  }

  return result;
}
