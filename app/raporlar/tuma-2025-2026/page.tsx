import type { Metadata } from "next";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { CANONICAL_SITE_URL } from "@/config/site";
import { getReport } from "@/data/reports";

const report = getReport("tuma-2025-2026");

const pageUrl = `${CANONICAL_SITE_URL}/raporlar/tuma-2025-2026`;

export const metadata: Metadata = {
  title: report.title,
  description: report.description,
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "article",
    locale: "tr_TR",
    url: pageUrl,
    title: report.title,
    description: report.description,
  },
};

export default function Tuma20252026Page() {
  return <ReportDetail report={report} />;
}
