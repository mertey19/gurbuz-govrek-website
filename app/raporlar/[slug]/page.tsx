import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { CANONICAL_SITE_URL } from "@/config/site";
import { getManagedReport } from "@/lib/reports/service";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const report = await getManagedReport(slug);
  if (!report) return {};
  const url = `${CANONICAL_SITE_URL}/raporlar/${report.slug}`;
  return {
    title: report.title,
    description: report.description,
    alternates: { canonical: url },
    openGraph: { type: "article", locale: "tr_TR", url, title: report.title, description: report.description, images: [] },
    twitter: { title: report.title, description: report.description, images: [] },
  };
}

export default async function ManagedReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const report = await getManagedReport(slug);
  if (!report) notFound();
  return <ReportDetail report={report} />;
}
