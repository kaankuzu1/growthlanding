export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface CTAStat {
  value: string;
  label: string;
}

export interface ClipperProfile {
  name: string;
  description: string;
  level: string;
  views: string;
  progress: number;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
}

// Dictionary types derived from en.json structure
export type Dictionary = typeof import("@/lib/i18n/dictionaries/en.json");

export type NavDict = Dictionary["nav"];
export type HeroDict = Dictionary["hero"];
export type ServicesDict = Dictionary["services"];
export type AboutMeDict = Dictionary["aboutMe"];
export type FounderEntry = AboutMeDict["founders"][number];
export type FAQDict = Dictionary["faq"];
export type CTADict = Omit<Dictionary["cta"], "stats"> & {
  stats: CTAStat[];
};
export type FooterDict = Dictionary["footer"];

export interface StatusDict {
  statusLabel: string;
  trendingLabel: string;
}

export interface EngineDict {
  heading: string;
  description: string;
  inputLabel: string;
  outputLabel: string;
  watermarkText: string;
}

export interface ClipperNetworkDict {
  heading: string;
  clippers: ClipperProfile[];
}

export interface WorkflowDict {
  heading: string;
  steps: WorkflowStep[];
}

export interface LegalSection {
  heading: string;
  content: string;
}

export interface LegalPageDict {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export type PrivacyDict = LegalPageDict;
export type TermsDict = LegalPageDict;
export type CookiesDict = LegalPageDict;
