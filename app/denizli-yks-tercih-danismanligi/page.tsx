import { ServiceLandingPage } from "@/components/services/ServiceLandingPage";
import { yksPreferenceService } from "@/data/seoServices";
import { createServiceMetadata } from "@/lib/serviceMetadata";

export const metadata = createServiceMetadata(yksPreferenceService);

export default function DenizliYksTercihDanismanligiPage() {
  return <ServiceLandingPage page={yksPreferenceService} />;
}
