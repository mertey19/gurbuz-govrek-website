import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { denizliPreferenceConsultingService } from "@/data/seoServices";
import { createServiceMetadata } from "@/lib/serviceMetadata";

export const metadata = createServiceMetadata(denizliPreferenceConsultingService);

export default function DenizliTercihDanismanligiPage() {
  return <ServiceLandingPage page={denizliPreferenceConsultingService} />;
}
