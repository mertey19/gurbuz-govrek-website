import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { studentCoachingService } from "@/data/seoServices";
import { createServiceMetadata } from "@/lib/serviceMetadata";

export const metadata = createServiceMetadata(studentCoachingService);

export default function DenizliOgrenciKocluguPage() {
  return <ServiceLandingPage page={studentCoachingService} />;
}
