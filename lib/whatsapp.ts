import { blogWhatsappUrl, whatsappUrl } from "@/config/site";
import { blogPosts } from "@/data/blogPosts";

/**
 * Açık sayfaya göre WhatsApp bağlantısı.
 *
 * Yüzen buton ve üst menü kök yerleşimden geliyor; hangi yazının okunduğunu
 * bilmiyorlar, bu yüzden yazı adresten çözülür. Blog dışındaki sayfalar ve
 * panelden yayımlanan yazılar (`blogPosts` içinde olmadıkları için) genel
 * mesajda kalır.
 */
export function whatsappUrlForPath(pathname: string | null | undefined) {
  const slug = pathname?.match(/^\/blog\/([^/]+)\/?$/)?.[1];
  const post = slug ? blogPosts.find((item) => item.slug === slug) : undefined;

  return post ? blogWhatsappUrl(post.title) : whatsappUrl;
}
