import { type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import StatusIndicator from "@/components/ui/StatusIndicator";
import HeroSection from "@/components/sections/HeroSection";
import EngineSection from "@/components/sections/EngineSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClipperNetworkSection from "@/components/sections/ClipperNetworkSection";
import WorkflowSection from "@/components/sections/WorkflowSection";
import AboutSection from "@/components/sections/AboutSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <StatusIndicator dict={(dict as any).status || { statusLabel: "Live Status", trendingLabel: "Trending Now" }} />
      <HeroSection dict={dict.hero} locale={locale} />
      <EngineSection dict={(dict as any).engine} />
      <ServicesSection dict={dict.services} />
      <ClipperNetworkSection dict={(dict as any).clipperNetwork} />
      <WorkflowSection dict={(dict as any).workflow} />
      <AboutSection dict={dict.aboutMe} />
      <FAQSection dict={dict.faq} />
      <CTASection dict={(dict as any).cta} locale={locale} />
    </>
  );
}
