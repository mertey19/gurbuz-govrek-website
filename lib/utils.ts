export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toWhatsAppUrl(number: string, message: string) {
  const cleanNumber = number.replace(/\D/g, "");
  return cleanNumber
    ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
    : null;
}
