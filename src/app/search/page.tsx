import { PageHero } from "@/components/shared/page-hero";
import { SearchExperience } from "@/components/storefront/search-experience";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;

  return (
    <div className="pb-16">
      <PageHero eyebrow="Search" title="Search by texture, category, or product name." description="Type directly, get results immediately, and fall back to similar products if the exact phrase is not found." />
      <SearchExperience initialQuery={q} />
    </div>
  );
}




