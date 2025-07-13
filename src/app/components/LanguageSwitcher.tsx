'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const locales = ['en', 'ja', 'bg', 'zh-CN', 'zh-TW', 'hr', 'cs', 'da', 'nl', 'en-GB', 'en-US', 'fi', 'fr', 'de', 'el', 'hi', 'hu', 'id', 'it', 'ko', 'lt', 'no', 'pl', 'pt-BR', 'ro', 'ru', 'es-ES', 'es-419', 'sv-SE', 'th', 'tr', 'uk', 'vi']; // Make sure this matches the locales in middleware.ts

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState('');

  useEffect(() => {
    // Extract current locale from pathname
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && locales.includes(pathSegments[0])) {
      setCurrentLocale(pathSegments[0]);
    } else {
      setCurrentLocale('en'); // Default if no locale in path
    }
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    setCurrentLocale(newLocale);

    // Update the cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // Redirect to the new locale path
    const newPath = `/${newLocale}${pathname.substring(currentLocale.length + 1)}`;
    router.push(newPath);
  };

  if (!currentLocale) {
    return null; // Don't render until locale is determined
  }

  return (
    <select onChange={handleChange} value={currentLocale}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
