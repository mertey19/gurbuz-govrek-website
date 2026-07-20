"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CircleAlert, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { submitAppointment, type AppointmentResult } from "@/lib/appointment";
import { appointmentSchema } from "@/lib/validations";
import type { AppointmentFormData } from "@/types";

const gradeOptions = ["8. sınıf", "9. sınıf", "10. sınıf", "11. sınıf", "12. sınıf", "Mezun", "Veli / Diğer"];
const serviceOptions = ["Tercih Danışmanlığı", "Matematik Eğitimi", "Öğrenci Koçluğu", "Seminer Talebi", "Diğer"];
const meetingOptions = ["Yüz yüze", "Online", "Telefon görüşmesi"];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-xs font-medium text-[#9f2f2f]" role="alert">{message}</p>;
}

export function Appointment() {
  const [result, setResult] = useState<AppointmentResult | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: { fullName: "", phone: "", email: "", gradeLevel: "", service: "", meetingType: "", message: "", consent: false, website: "" },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    setResult(null);
    const submissionResult = await submitAppointment(data);
    setResult(submissionResult);
    if (submissionResult.ok) reset();
  };

  const inputClass = "mt-2 min-h-12 w-full rounded-sm border border-navy/14 bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink/30 focus:border-gold focus:ring-2 focus:ring-gold/18";

  return (
    <section id="randevu" className="section-space bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionTitle eyebrow="Randevu Formu" title="İlk Görüşmenizi Planlayın" description="İhtiyacınızı kısaca paylaşın; talebiniz güvenli biçimde kaydedilsin ve uygun görüşme modeli ile zamanı için sizinle iletişime geçilsin." />
            <div className="mt-8 border-l-2 border-gold bg-cream p-5 text-sm leading-7 text-ink/64">
              Formda paylaştığınız bilgiler yalnızca randevu talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla kaydedilir.
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative rounded-sm border border-navy/9 bg-cream/65 p-5 shadow-[0_20px_60px_rgba(7,26,51,.08)] sm:p-8 lg:p-10">
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label>Web sitesi<input {...register("website")} type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-navy">Ad Soyad <span aria-hidden="true" className="text-gold">*</span>
                <input {...register("fullName")} autoComplete="name" className={inputClass} aria-invalid={Boolean(errors.fullName)} />
                <FieldError message={errors.fullName?.message} />
              </label>
              <label className="text-sm font-semibold text-navy">Telefon <span aria-hidden="true" className="text-gold">*</span>
                <input {...register("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" className={inputClass} aria-invalid={Boolean(errors.phone)} />
                <FieldError message={errors.phone?.message} />
              </label>
              <label className="text-sm font-semibold text-navy">E-posta <span aria-hidden="true" className="text-gold">*</span>
                <input {...register("email")} type="email" inputMode="email" autoComplete="email" className={inputClass} aria-invalid={Boolean(errors.email)} />
                <FieldError message={errors.email?.message} />
              </label>
              <label className="text-sm font-semibold text-navy">Öğrenci sınıf düzeyi <span aria-hidden="true" className="text-gold">*</span>
                <select {...register("gradeLevel")} className={inputClass} aria-invalid={Boolean(errors.gradeLevel)}><option value="">Seçin</option>{gradeOptions.map((option) => <option key={option}>{option}</option>)}</select>
                <FieldError message={errors.gradeLevel?.message} />
              </label>
              <label className="text-sm font-semibold text-navy">İlgilenilen hizmet <span aria-hidden="true" className="text-gold">*</span>
                <select {...register("service")} className={inputClass} aria-invalid={Boolean(errors.service)}><option value="">Seçin</option>{serviceOptions.map((option) => <option key={option}>{option}</option>)}</select>
                <FieldError message={errors.service?.message} />
              </label>
              <label className="text-sm font-semibold text-navy">Tercih edilen görüşme şekli <span aria-hidden="true" className="text-gold">*</span>
                <select {...register("meetingType")} className={inputClass} aria-invalid={Boolean(errors.meetingType)}><option value="">Seçin</option>{meetingOptions.map((option) => <option key={option}>{option}</option>)}</select>
                <FieldError message={errors.meetingType?.message} />
              </label>
            </div>
            <label className="mt-5 block text-sm font-semibold text-navy">Mesaj <span aria-hidden="true" className="text-gold">*</span>
              <textarea {...register("message")} rows={5} placeholder="Kısaca hedefinizi ve destek almak istediğiniz konuyu paylaşın." className={`${inputClass} py-3`} aria-invalid={Boolean(errors.message)} />
              <FieldError message={errors.message?.message} />
            </label>
            <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-ink/65">
              <input {...register("consent")} type="checkbox" className="mt-1 size-4.5 shrink-0 accent-[#0B2C54]" aria-invalid={Boolean(errors.consent)} />
              <span>KVKK Aydınlatma Metni&apos;ni okudum ve randevu talebim için gerekli bilgilerin kaydedileceğini biliyorum.</span>
            </label>
            <FieldError message={errors.consent?.message} />
            <button type="submit" disabled={isSubmitting} className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm bg-navy px-6 text-sm font-bold text-white transition hover:bg-blue-deep disabled:cursor-wait disabled:opacity-65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:w-auto">
              {isSubmitting ? <><LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Gönderiliyor...</> : <><Send className="size-4" aria-hidden="true" /> Randevu Talebi Oluştur</>}
            </button>
            {result && (
              <div className={`mt-6 flex gap-3 rounded-sm border p-4 text-sm leading-6 ${result.ok ? "border-[#2c7654]/22 bg-[#edf7f1] text-[#245c43]" : "border-[#9f2f2f]/20 bg-[#fff1f1] text-[#842626]"}`} role={result.ok ? "status" : "alert"}>
                {result.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> : <CircleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />}
                <div><p>{result.message}</p>{result.ok && result.referenceId && <p className="mt-1 text-xs opacity-70">Başvuru kodu: {result.referenceId}</p>}</div>
              </div>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}
