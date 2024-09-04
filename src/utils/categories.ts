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

// const findLargeCategory = (code: number) => {
//   const codeAsString = String(code);
//   const largeCategoryCode = codeAsString.substring(0, 1) + "0000";
//   const largeCategory = categories.find(
//     (category) => category.code === largeCategoryCode
//   );

//   if (largeCategory) {
//     const categoryData = {
//       name: largeCategory.name,
//       subcategories: largeCategory.subcategories,
//     };
//     return categoryData;
//   }
// };

// const findMediumCategory = (code: number) => {
//   const codeAsString = String(code);
//   const mediumCategoryCode = codeAsString.substring(1, 2);

//   const largeCategory = findLargeCategory(code);
//   if (!largeCategory) return null;

//   const mediumCategory = largeCategory.subcategories.find(
//     (medium) => medium.code.substring(1, 2) === mediumCategoryCode
//   );

//   if (mediumCategory) {
//     const categoryData = {
//       name: mediumCategory.name,
//       subcategories: mediumCategory.subcategories,
//     };
//     return categoryData;
//   } else {
//     return null;
//   }
// };

// const findSmallCategoryName = (code: number) => {
//   const codeAsString = String(code);
//   const smallCategoryCode = codeAsString.substring(2, 3);

//   const mediumCategory = findMediumCategory(code);

//   if (!mediumCategory) return null;

//   const smallCategory = mediumCategory.subcategories.find(
//     (small) => small.code.substring(2, 3) === smallCategoryCode
//   );
//   if (smallCategory) return smallCategory.name;
//   return null;
// };

// export const findFullCategoryNames = (code: number) => {
//   const largeCategory = findLargeCategory(code);
//   const mediumCategory = findMediumCategory(code);
//   const smallCategoryName = findSmallCategoryName(code);

//   const categoryNames = {
//     large: largeCategory?.name || null,
//     medium: mediumCategory?.name || null,
//     small: smallCategoryName,
//   };
//   return categoryNames;
// };
