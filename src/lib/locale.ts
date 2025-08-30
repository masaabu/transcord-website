// src/lib/locale.ts
import "server-only";

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
  const normalized = locale === "en" ? "en-US" : locale;
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
