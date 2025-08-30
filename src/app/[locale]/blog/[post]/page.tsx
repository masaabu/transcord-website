import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostSection from "@/components/PostSection";

import type { Metadata } from "next";

export async function generateMetadata(
	{ params }: { params: Promise<{ locale: string, post: string }> },
): Promise<Metadata> {
	const { locale, post } = await params;
	const postLocale = locale === "ja" || locale === "ko" ? locale : "en";
	const filePath = path.join(process.cwd(), `src/content/posts/${postLocale}/${post}.md`);
	if (!fs.existsSync(filePath)) return {};
	const file = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(file);

	return {
		title: `Transcord Blog - ${data.title}`,
		description: content.split(/\r\n|\r|\n/)[1],
		openGraph: {
			type: "article",
			url: `/${locale}/blog/${post}`,
			title: data.title,
			description: content.split(/\r\n|\r|\n/)[1],
			siteName: "Transcord",
			images: [{ url: `/images/${data.image}` }]
		},
		twitter: {
			card: "summary_large_image",
			images: `/images/${data.image}`
		}
	};
}

export default async function Page({ params }: { params: Promise<{ locale: string, post: string }> }) {
	const { locale, post } = await params;
	return (
		<div className="bg-gray-900 text-white">
			<Navbar />
			<main className="pt-10">
				<PostSection locale={locale} postId={post} />
			</main>
			<Footer />
		</div>
	)
}