"use server";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

import { getLocale } from "@/lib/getLocale";
import { getTranslate } from "@/lib/locale";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslate(locale);

  const links = [
    { href: `/${locale}/terms-of-service`, label: t("footer.terms") },
    { href: `/${locale}/privacy-policy`, label: t("footer.privacy") },
    { href: `/${locale}/blog`, label: t("footer.blog") },
    { href: "https://discord.gg/HxSEF3u3aY", label: t("footer.support_server") },
  ]

  return (
    <footer className="border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <p className="text-sm text-gray-400">{t("footer.copyright").replace('{year}', new Date().getFullYear().toString())}</p>
        <div className="flex md:flex-row flex-col md:items-center gap-x-6 text-sm">
          {links.map((link, index) => (
            <Link key={index} href={link.href} className="text-gray-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </footer>
  );
}