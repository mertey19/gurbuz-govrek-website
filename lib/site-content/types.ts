export type ManagedAnnouncement = {
  isActive: boolean;
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type ManagedFaqItem = {
  question: string;
  answer: string;
};

export type ManagedEventsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
};

export type ManagedSiteContent = {
  announcement: ManagedAnnouncement;
  faq: ManagedFaqItem[];
  events: ManagedEventsContent;
};

export type ManagedSiteContentKey = keyof ManagedSiteContent;
