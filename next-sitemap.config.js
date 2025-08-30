const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const siteUrl = process.env.SITE_URL ?? 'https://transcord.vercel.app';
const locales = [
	'en', 'ja', 'bg', 'zh-CN', 'zh-TW', 'hr', 'cs', 'da', 'nl', 'en-GB', 'en-US',
	'fi', 'fr', 'de', 'el', 'hi', 'hu', 'id', 'it', 'ko', 'lt', 'no', 'pl',
	'pt-BR', 'ro', 'ru', 'es-ES', 'es-419', 'sv-SE', 'th', 'tr', 'uk', 'vi'
];

function getPostsForLocale(locale) {
	const postLocale = locale === 'ja' || locale === 'ko' ? locale : 'en';
	const postDirectory = path.join(process.cwd(), `src/content/posts/${postLocale}/`);
	if (!fs.existsSync(postDirectory)) return [];

	const list = fs
		.readdirSync(postDirectory)
		.filter((file) => file.endsWith('.md'))
		.map((file) => {
			const raw = fs.readFileSync(path.join(postDirectory, file), 'utf-8');
			const { data } = matter(raw);
			const dateIso = new Date(data.date).toISOString();
			return {
				filename: file.replace(/\.md$/, ''),
				updatedAt: dateIso,
				search: data.search,
			};
		})
		.filter((post) => post.search !== false);

	return list;
}

async function collectPostRecords() {
	const base = getPostsForLocale('en');
	const localized = new Map();
	for (const l of locales) {
		localized.set(l, getPostsForLocale(l));
	}

	const records = base.map((b) => {
		const slugs = {};
		let latest = b.updatedAt;

		for (const l of locales) {
			const list = localized.get(l) || [];
			const hit = list.find((p) => p.filename === b.filename);
			if (hit) {
				slugs[l] = hit.filename;
				if (new Date(hit.updatedAt).getTime() > new Date(latest).getTime()) {
					latest = hit.updatedAt;
				}
			}
		}
		return { id: b.filename, slugs, updatedAt: latest };
	});

	return records;
}

function postUrl(locale, slug) {
	return `/${locale}/blog/${slug}`;
}

function buildAlternateRefs(record) {
	return Object.entries(record.slugs)
		.filter(([, slug]) => !!slug)
		.map(([lang, slug]) => ({
			href: `${siteUrl}${postUrl(lang, slug)}`,
			hreflang: lang,
		}));
}

function buildAlternateRefsForStatic(base, includeXDefault = false) {
	const refs = locales.map((lang) => ({
		href: `${siteUrl}${base === '/' ? `/${lang}` : `/${lang}${base}`}`,
		hreflang: lang,
	}));
	if (includeXDefault) {
		refs.push({ href: `${siteUrl}${base === '/' ? '' : base}`, hreflang: 'x-default' });
	}
	return refs;
}

const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl,
	generateRobotsTxt: true,
	sitemapSize: 7000,
	trailingSlash: false,

	transform: async (cfg, path) => ({
		loc: path,
		changefreq: cfg.changefreq ?? 'daily',
		priority: path === '/' ? 1.0 : 0.7,
		lastmod: cfg.autoLastmod === false ? undefined : new Date().toISOString(),
	}),

	additionalPaths: async (cfg) => {
		const out = [];

		const staticRoutes = ['/', '/blog', '/terms-of-service', '/privacy-policy'];
		for (const base of staticRoutes) {
			for (const l of locales) {
				const loc = base === '/' ? `/${l}` : `/${l}${base}`;
				const alternateRefs = buildAlternateRefsForStatic(base, /* includeXDefault */ base === '/');
				out.push({
					...(await cfg.transform(cfg, loc)),
					alternateRefs,
				});
			}
		}

		const records = await collectPostRecords();
		for (const record of records) {
			const alternateRefs = buildAlternateRefs(record);
			for (const l of locales) {
				const slug = record.slugs[l];
				if (!slug) continue;
				out.push({
					...(await cfg.transform(cfg, postUrl(l, slug))),
					lastmod: record.updatedAt ?? new Date().toISOString(),
					alternateRefs,
				});
			}
		}

		return out;
	},

	robotsTxtOptions: {
		policies: isProd ? [{ userAgent: '*', allow: '/' }] : [{ userAgent: '*', disallow: '/' }],
		additionalSitemaps: [],
	},
};

module.exports = config;
