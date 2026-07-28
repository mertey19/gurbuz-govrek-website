import type { Metadata } from "next";
import { ReportDetail } from "@/components/reports/ReportDetail";
import { CANONICAL_SITE_URL } from "@/config/site";
import { getReport } from "@/data/reports";

const report = getReport("tip-fakulteleri");

const pageUrl = `${CANONICAL_SITE_URL}/raporlar/tip-fakulteleri`;

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

export default function TipFakulteleriPage() {
  return <ReportDetail report={report} />;
}
