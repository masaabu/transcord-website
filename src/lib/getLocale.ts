"use server";

import { headers } from "next/headers";

export async function getLocale() {
	const headerList = await headers();
	const urlPath = headerList.get("x-pathname");

	if (urlPath) {
		const segments = urlPath.split("/").filter(Boolean);
		const locale = segments[0];
		return locale;
	} else return "en";
}

export async function serverLocalizeLink(link: string) {
	const locale = await getLocale();
	if (link.startsWith("http://") || link.startsWith("https://")) return link;
	if (locale) return `/${locale}${link}`;
	return link;
}