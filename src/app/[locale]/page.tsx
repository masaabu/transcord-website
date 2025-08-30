import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Bot, Languages, MessageSquare, Rocket, Settings, ShieldCheck } from 'lucide-react';

import { getTranslate } from '@/lib/locale';

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslate(locale)

  const HeroSection = () => (
    <section className="pt-30 pb-20 md:pt-[25vh] md:pb-[10vh]">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 inline-block rounded-full bg-blue-900/50 px-4 py-2 text-sm font-semibold text-blue-300">
          {t("home.hero.tagline")}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          {t("home.hero.title")}<br />
          <span className="text-blue-400">{t("home.hero.highlight")}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
          {t("home.hero.description")}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/invite"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {t("home.hero.invite_button")}
          </Link>
          <Link
            href="#features"
            className="group flex items-center gap-x-2 text-lg font-semibold leading-6 text-white transition-colors hover:text-gray-300"
          >
            {t("home.hero.features_link")} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );

  const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="rounded-xl bg-gray-800/50 p-6 ring-1 ring-white/10 backdrop-blur-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-gray-300">{children}</p>
    </div>
  );

  const FeaturesSection = () => (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("home.features.title")}</h2>
          <p className="mt-4 text-lg text-gray-400">
            {t("home.features.description")}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <FeatureCard icon={<Languages className="h-6 w-6" />} title={t("home.features.multilingual_support.title")}>
            {t("home.features.multilingual_support.description")}
          </FeatureCard>
          <FeatureCard icon={<Bot className="h-6 w-6" />} title={t("home.features.translation.title")}>
            {t("home.features.translation.description")}
          </FeatureCard>
          <FeatureCard icon={<Settings className="h-6 w-6" />} title={t("home.features.easy_setup.title")}>
            {t("home.features.easy_setup.description")}
          </FeatureCard>
          <FeatureCard icon={<MessageSquare className="h-6 w-6" />} title={t("home.features.slash_commands.title")}>
            {t("home.features.slash_commands.description")}
          </FeatureCard>
          <FeatureCard icon={<Rocket className="h-6 w-6" />} title={t("home.features.fast_stable.title")}>
            {t("home.features.fast_stable.description")}
          </FeatureCard>
          <FeatureCard icon={<ShieldCheck className="h-6 w-6" />} title={t("home.features.high_customization.title")}>
            {t("home.features.high_customization.description")}
          </FeatureCard>
        </div>
      </div>
    </section>
  );

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}
