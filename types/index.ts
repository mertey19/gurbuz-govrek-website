export type ServiceId =
  | "tercih"
  | "universite"
  | "matematik"
  | "kocluk"
  | "kampus"
  | "seminer";

export type Service = {
  id: ServiceId;
  title: string;
  description: string;
  icon: "messages" | "university" | "calculator" | "compass" | "map" | "presentation";
  href: string;
};

export type GalleryItem = {
  src: string;
  title: string;
  category: string;
  description: string;
  alt: string;
  position?: string;
};

export type MediaArticle = {
  category: string;
  title: string;
  summary: string;
  content?: string;
  externalUrl?: string;
  videoUrl?: string;
};
