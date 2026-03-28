import type { Metadata } from "next";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import Container from "@/components/ui/Container";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  return {
    title: `${dict.privacy.title} — Audience Labs`,
    description: dict.privacy.sections[0].content.slice(0, 160),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { title, lastUpdated, sections } = dict.privacy;

  return (
    <section className="py-24 md:py-32 px-8">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-headline text-3xl md:text-4xl font-black uppercase tracking-tighter text-white mb-2">
            {title}
          </h1>
          <p className="text-sm text-zinc-500 mb-12">{lastUpdated}</p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl font-headline font-bold text-white mb-3">
                  {section.heading}
                </h2>
                <p className="text-on-surface-variant leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
