import 'server-only';

export type Dictionary = typeof import("./dictionaries/en.json");

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  bg: () => import('./dictionaries/bg.json').then((module) => module.default),
  'zh-CN': () => import('./dictionaries/zh-CN.json').then((module) => module.default),
  'zh-TW': () => import('./dictionaries/zh-TW.json').then((module) => module.default),
  hr: () => import('./dictionaries/hr.json').then((module) => module.default),
  cs: () => import('./dictionaries/cs.json').then((module) => module.default),
  da: () => import('./dictionaries/da.json').then((module) => module.default),
  nl: () => import('./dictionaries/nl.json').then((module) => module.default),
  'en-GB': () => import('./dictionaries/en-GB.json').then((module) => module.default),
  'en-US': () => import('./dictionaries/en.json').then((module) => module.default),
  fi: () => import('./dictionaries/fi.json').then((module) => module.default),
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  de: () => import('./dictionaries/de.json').then((module) => module.default),
  el: () => import('./dictionaries/el.json').then((module) => module.default),
  hi: () => import('./dictionaries/hi.json').then((module) => module.default),
  hu: () => import('./dictionaries/hu.json').then((module) => module.default),
  id: () => import('./dictionaries/id.json').then((module) => module.default),
  it: () => import('./dictionaries/it.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  lt: () => import('./dictionaries/lt.json').then((module) => module.default),
  no: () => import('./dictionaries/no.json').then((module) => module.default),
  pl: () => import('./dictionaries/pl.json').then((module) => module.default),
  'pt-BR': () => import('./dictionaries/pt-BR.json').then((module) => module.default),
  ro: () => import('./dictionaries/ro.json').then((module) => module.default),
  ru: () => import('./dictionaries/ru.json').then((module) => module.default),
  'es-ES': () => import('./dictionaries/es-ES.json').then((module) => module.default),
  'es-419': () => import('./dictionaries/es-419.json').then((module) => module.default),
  'sv-SE': () => import('./dictionaries/sv-SE.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
  uk: () => import('./dictionaries/uk.json').then((module) => module.default),
  vi: () => import('./dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) =>
  dictionaries[locale as keyof typeof dictionaries]();