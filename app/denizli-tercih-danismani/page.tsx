import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { denizliPreferenceConsultantService } from "@/data/seoServices";
import { createServiceMetadata } from "@/lib/serviceMetadata";

export const metadata = createServiceMetadata(denizliPreferenceConsultantService);

export default function DenizliTercihDanismaniPage() {
  return <ServiceLandingPage page={denizliPreferenceConsultantService} />;
}
