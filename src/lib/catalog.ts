import { categories, collections, customers, discounts, homepageSections, orders, products, storefrontFaqs } from "@/data/catalog";

export function getAllProducts() {
  return products;
}

export function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 4);
}

export function getBestSellerProducts() {
  return products.filter((product) => product.bestSeller).slice(0, 4);
}

export function getNewArrivalProducts() {
  return products.filter((product) => product.newArrival).slice(0, 4);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}

export function getProductsByCollection(slug: string) {
  return products.filter((product) => product.collectionSlugs.includes(slug));
}

export function getRelatedProducts(slug: string) {
  const product = getProductBySlug(slug);
  if (!product) return [];

  return products
    .filter(
      (candidate) =>
        candidate.slug !== slug &&
        (candidate.categorySlug === product.categorySlug ||
          candidate.collectionSlugs.some((collectionSlug) => product.collectionSlugs.includes(collectionSlug))),
    )
    .slice(0, 4);
}

export function searchProducts(query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return products;

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.shortDescription,
      product.description,
      product.categorySlug,
      ...product.collectionSlugs,
      ...product.variants.flatMap((variant) => Object.values(variant.attributes).filter(Boolean) as string[]),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export const adminSeed = {
  customers,
  discounts,
  homepageSections,
  orders,
  storefrontFaqs,
};


