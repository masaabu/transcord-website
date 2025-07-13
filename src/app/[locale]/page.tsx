import { ArrowRight, Bot, Languages, MessageSquare, Rocket, Settings, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { getDictionary, Dictionary } from '../dictionaries';
import LanguageSwitcher from '../components/LanguageSwitcher';

const HeroSection = ({ dict }: { dict: Dictionary }) => (
  <section className="py-20 md:py-32">
    <div className="container mx-auto px-4 text-center">
      <div className="mb-4 inline-block rounded-full bg-blue-900/50 px-4 py-2 text-sm font-semibold text-blue-300">
        {dict.hero.tagline}
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
        {dict.hero.title}<br />
        <span className="text-blue-400">{dict.hero.highlight}</span>
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
        {dict.hero.description}
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="https://discord.com/oauth2/authorize?client_id=1389988170082553988"
          className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          {dict.hero.invite_button}
        </Link>
        <Link
          href="#features"
          className="group flex items-center gap-x-2 text-lg font-semibold leading-6 text-white transition-colors hover:text-gray-300"
        >
          {dict.hero.features_link} <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
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

const FeaturesSection = ({ dict }: { dict: Dictionary }) => (
  <section id="features" className="py-24 sm:py-32">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{dict.features.title}</h2>
        <p className="mt-4 text-lg text-gray-400">
          {dict.features.description}
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <FeatureCard icon={<Languages className="h-6 w-6" />} title={dict.features.multilingual_support.title}>
          {dict.features.multilingual_support.description}
        </FeatureCard>
        <FeatureCard icon={<Bot className="h-6 w-6" />} title={dict.features.translation.title}>
          {dict.features.translation.description}
        </FeatureCard>
        <FeatureCard icon={<Settings className="h-6 w-6" />} title={dict.features.easy_setup.title}>
          {dict.features.easy_setup.description}
        </FeatureCard>
        <FeatureCard icon={<MessageSquare className="h-6 w-6" />} title={dict.features.slash_commands.title}>
          {dict.features.slash_commands.description}
        </FeatureCard>
        <FeatureCard icon={<Rocket className="h-6 w-6" />} title={dict.features.fast_stable.title}>
          {dict.features.fast_stable.description}
        </FeatureCard>
        <FeatureCard icon={<ShieldCheck className="h-6 w-6" />} title={dict.features.high_customization.title}>
          {dict.features.high_customization.description}
        </FeatureCard>
      </div>
    </div>
  </section>
);

/*const HowToUseSection = ({ dict }: { dict: any }) => (
  <section className="py-24 sm:py-32">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{dict.how_to_use.title}</h2>
        <p className="mt-4 text-lg text-gray-400">
          {dict.how_to_use.description}
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl font-bold text-white ring-2 ring-blue-500">1</div>
          <h3 className="mt-6 text-xl font-semibold text-white">{dict.how_to_use.step1.title}</h3>
          <p className="mt-2 text-gray-400">{dict.how_to_use.step1.description}</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl font-bold text-white ring-2 ring-blue-500">2</div>
          <h3 className="mt-6 text-xl font-semibold text-white">{dict.how_to_use.step2.title}</h3>
          <p className="mt-2 text-gray-400">{dict.how_to_use.step2.description}</p>
          <code className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-sm font-mono text-gray-300">/settings</code>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-2xl font-bold text-white ring-2 ring-blue-500">3</div>
          <h3 className="mt-6 text-xl font-semibold text-white">{dict.how_to_use.step3.title}</h3>
          <p className="mt-2 text-gray-400">{dict.how_to_use.step3.description}</p>
        </div>
      </div>
    </div>
  </section>
);*/

const Footer = ({ dict }: { dict: Dictionary }) => (
  <footer className="border-t border-white/10">
    <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
      <p className="text-sm text-gray-400">{dict.footer.copyright.replace('{year}', new Date().getFullYear().toString())}</p>
      <div className="flex gap-x-6 text-sm">
        <LanguageSwitcher />
        <Link href="https://discord.gg/HxSEF3u3aY" className="text-gray-400 transition-colors hover:text-white">{dict.footer.support_server}</Link>
      </div>
    </div>
  </footer>
);

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="bg-[#111827] text-white">
      <main>
        <HeroSection dict={dict} />
        <FeaturesSection dict={dict} />
      </main>
      <Footer dict={dict} />
    </div>
  );
}
