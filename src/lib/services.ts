import { serviceCategories, services } from "@/data/catalog";

export function getAllServices() {
  return services;
}

export function getFeaturedServices() {
  return services.filter((service) => service.featured);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}

export function getServiceCategoryName(slug: string) {
  return serviceCategories.find((category) => category.slug === slug)?.name ?? slug;
}
