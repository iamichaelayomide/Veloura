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

export function getAllStylists() {
  return Array.from(
    new Map(
      services.flatMap((service) =>
        service.stylists.map((stylist) => [
          stylist.id,
          {
            ...stylist,
            services: services.filter((candidate) => candidate.stylists.some((member) => member.id === stylist.id)),
          },
        ]),
      ),
    ).values(),
  );
}

export function getStylistById(id: string) {
  return getAllStylists().find((stylist) => stylist.id === id) ?? null;
}
