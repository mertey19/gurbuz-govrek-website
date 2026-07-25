import type { Metadata } from "next";
import { CareerCategoryPage } from "@/components/services/CareerCategoryPage";
import { CANONICAL_SITE_URL } from "@/config/site";
import { getCareerCategory } from "@/data/careerCategories";

const category = getCareerCategory("tyt");
const pageUrl = `${CANONICAL_SITE_URL}/meslekler/tyt`;

export const metadata: Metadata = {
  title: category.title,
  description: category.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    url: pageUrl,
    title: category.title,
    description: category.description,
    images: ["/og.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: category.title,
    description: category.description,
    images: ["/og.jpg"],
  },
};

export default function Page() {
  return <CareerCategoryPage category={category} />;
}
