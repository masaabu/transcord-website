import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getTranslate } from "@/lib/locale";

export default async function PostSection({ locale, postId, home }: { locale: string; postId: string, home?: boolean }) {
	const t = await getTranslate(locale)
	const postLocale = locale === "ja" || locale === "ko" ? locale : "en";
	const filePath = path.join(process.cwd(), `src/content/posts/${postLocale}/${postId}.md`);
	if (fs.existsSync(filePath)) {
		const file = fs.readFileSync(filePath, "utf-8");
		const { data, content } = matter(file);
		return (
			<div className="md:flex block mx-auto my-16 max-w-5xl md:pr-10 px-2">
				{home !== false ?
					<Link href={`/${locale}/blog`} className="md:block flex min-w-10 h-9 mt-1">
						<div className="flex p-1 items-center rounded-sm hover:bg-white/10 text-gray-300 hover:text-white">
							<ArrowLeft className="w-9 h-9 justify-center" />
							<p className="md:hidden text-lg">{t("blog.back_to_blog")}</p>
						</div>
					</Link> :
					<div className="min-w-10"></div>
				}
				<div className="w-full">
					<div className="items-center mb-6 pb-4 space-y-2 border-b border-white/10">
						<h1 className="text-4xl font-bold">{data.title}</h1>
						<div className="text-gray-400 space-x-2">
							{data.author && <span>@{data.author}</span>}
							{data.author && data.date && <span>•</span>}
							{data.date && <span>{data.date.toISOString().split("T")[0]}</span>}
						</div>
					</div>
					{data.image && (
						<img
							src={`/images/${data.image}`}
							alt={data.image}
							className="max-h-108 w-full object-cover rounded-lg shadow-lg mb-6"
						/>
					)}
					<div className="markdown">
						<ReactMarkdown>{content}</ReactMarkdown>
					</div>
				</div>
			</div>
		)
	} else {
		return (
			<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
				<h1 className="text-4xl font-bold text-white mb-4">{t("blog.not_found")}</h1>
				<p className="text-gray-400 mb-8">{t("blog.not_found_message")}</p>
				<Link href={`/${locale}/blog`} className="text-blue-500 hover:underline">
					{t("blog.back_to_blog")}
				</Link>
			</div>
		)
	}
}