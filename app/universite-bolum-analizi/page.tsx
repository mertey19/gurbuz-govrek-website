import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { universityAnalysisService } from "@/data/seoServices";
import { createServiceMetadata } from "@/lib/serviceMetadata";

export const metadata = createServiceMetadata(universityAnalysisService);

export default function UniversiteBolumAnaliziPage() {
  return <ServiceLandingPage page={universityAnalysisService} />;
}
