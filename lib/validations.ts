import { z } from "zod";

const phoneRegex = /^(?:\+90|0)?5\d{9}$/;

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalıdır."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => phoneRegex.test(value.replace(/[\s()-]/g, "")),
      "Geçerli bir cep telefonu numarası girin.",
    ),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  gradeLevel: z.string().min(1, "Sınıf düzeyini seçin."),
  service: z.string().min(1, "İlgilendiğiniz hizmeti seçin."),
  meetingType: z.string().min(1, "Görüşme şeklini seçin."),
  message: z.string().trim().min(10, "Mesajınız en az 10 karakter olmalıdır.").max(800, "Mesajınız en fazla 800 karakter olabilir."),
  consent: z
    .boolean()
    .refine((value) => value, "Devam etmek için aydınlatma metnini okuduğunuzu belirtmelisiniz."),
  website: z.string().max(0, "Form gönderilemedi.").optional(),
});
