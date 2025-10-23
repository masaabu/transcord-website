// src/lib/locale.ts
import "server-only";
import fs from "fs";
import path from "path";

type JSONLike = string | number | boolean | null | undefined | JSONTree;
type JSONTree = { [key: string]: JSONLike };

function flattenDictionary(dictionary: JSONTree, parentKey = ""): Record<string, string> {
  let result: Record<string, string> = {};
  for (const key in dictionary) {
    if (!Object.prototype.hasOwnProperty.call(dictionary, key)) continue;
    const newKey = parentKey ? `${parentKey}.${key}` : key;
    const value = dictionary[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result = { ...result, ...flattenDictionary(value as JSONTree, newKey) };
    } else if (value != null) {
      result[newKey] = String(value);
    }
  }
  return result;
}

export const getFlatDictionary = async (locale: string): Promise<Record<string, string>> => {
  // Normalize shorthand 'en' to 'en-US'
  let normalized = locale === "en" ? "en-US" : locale;

  // Basic sanitation: reject any locale containing path separators or dots
  // which indicates it's not a locale (eg. 'service-worker.js'). Also limit length.
  if (typeof normalized !== "string" || /[\/\\\.]/.test(normalized) || normalized.length > 30) {
    normalized = "en-US";
  }

  // Ensure the locale JSON actually exists in src/locale. If not, fallback to en-US.
  const filePath = path.join(process.cwd(), "src", "locale", `${normalized}.json`);
  if (!fs.existsSync(filePath)) {
    normalized = "en-US";
  }

  const dictionary = (await import(`../locale/${normalized}.json`)).default as JSONTree;
  return flattenDictionary(dictionary);
};

export const getTranslate = async (
  locale: string
): Promise<(key: string) => string> => {
  const dict = await getFlatDictionary(locale);
  const dictDefault = await getFlatDictionary("en-US");
  return (key: string) => dict[key] ?? dictDefault[key] ?? key;
};
