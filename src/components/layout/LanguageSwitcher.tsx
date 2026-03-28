"use client";

import { usePathname, useRouter } from "next/navigation";

const flags: Record<string, { flag: string; label: string }> = {
  en: { flag: "🇬🇧", label: "EN" },
  tr: { flag: "🇹🇷", label: "TR" },
};

export default function LanguageSwitcher({ locale }: { locale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "en" ? "tr" : "en";
  const other = flags[otherLocale];

  function switchLocale() {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 bg-surface-container border border-outline-variant/15 px-3 py-1.5 text-sm text-zinc-300 hover:text-white hover:bg-surface-container-high transition-colors cursor-pointer font-headline font-bold uppercase tracking-tighter"
      aria-label={`Switch to ${otherLocale === "en" ? "English" : "Türkçe"}`}
    >
      <span>{other.flag}</span>
      <span>{other.label}</span>
    </button>
  );
}
