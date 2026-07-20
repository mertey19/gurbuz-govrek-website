import type { AppointmentFormData } from "@/types";

export type AppointmentResult = {
  ok: true;
  message: string;
};

// Backend bağlantısı eklendiğinde yalnızca bu fonksiyon gerçek API çağrısıyla değiştirilmelidir.
export async function submitAppointment(
  data: AppointmentFormData,
): Promise<AppointmentResult> {
  void data;
  await new Promise((resolve) => setTimeout(resolve, 550));

  return {
    ok: true,
    message:
      "Form doğrulandı. Randevu altyapısı henüz etkin olmadığı için talebiniz iletilmedi; iletişim bilgileri tanımlandığında bu alan doğrudan başvuru alacaktır.",
  };
}
