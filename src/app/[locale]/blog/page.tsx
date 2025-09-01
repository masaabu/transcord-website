import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import Footer from "@/components/Footer";

import { Metadata } from "next";

import { getTranslate } from "@/lib/locale";

export const metadata: Metadata = {
	title: "Transcord Blog",
	openGraph: {
		title: "Transcord Blog",
		url: "https://transcord.vercel.app/blog"
	}
};

type PostSummary = {
	filename: string;
	date: string;
	title: string;
	image?: string;
	author?: string;
	search?: boolean;
	content: string;
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getTranslate(locale)

	let posts: PostSummary[] = [];

	const postLocale = locale === "ja" || locale === "ko" ? locale : "en";
	const postDirectory = path.join(process.cwd(), `src/content/posts/${postLocale}/`);

	if (fs.existsSync(postDirectory)) posts = fs.readdirSync(postDirectory)
		.filter((file) => file.endsWith(".md"))
		.map((file) => {
			const { data, content } = matter(fs.readFileSync(path.join(postDirectory, file), "utf-8"));
			return { file, date: data.date, title: data.title, image: data.image, author: data.author, search: data.search, content: `${content.split(/\r\n|\r|\n/)[1]}` };
		})
		.filter((post) => post.search !== false)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((post) => ({
			filename: post.file.replace(/\.md$/, ""),
			date: post.date.toISOString().split("T")[0],
			title: post.title,
			image: post.image,
			author: post.author,
			content: post.content,
		}))

	return (
		<main className="bg-gray-900 text-white">
			{posts.length > 0 ? (
				<>
					<div className="relative place-items-center h-[55vh] min-h-144 w-full">
						<div className="absolute h-full w-full bg-cover bg-center mask-linear-[to_bottom,black_0%,transparent_100%]" style={{ backgroundImage: `url(/images/${posts[0].image})` }}></div>
						<div className="relative flex h-full max-w-5xl items-center p-8">
							<div className="flex md:flex-row flex-col items-start justify-between space-x-8">
								<div className="md:max-w-1/2 space-y-5">
									<h2 className="text-4xl font-bold space-x-4">
										<span>{posts[0].title}</span>
										<span className="inline-block align-middle px-3 py-1 bg-gray-500/30 text-gray-300 text-sm rounded-full">{posts[0].date}</span>
									</h2>
									<p className="text-lg text-gray-300 line-clamp-4">{posts[0].content}</p>
									<Link href={`/${locale}/blog/${posts[0].filename}`}>
										<div className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">{t("blog.read_more")}</div>
									</Link>
								</div>
								<div className="md:block hidden max-w-1/2">
									<Link href={`/${locale}/blog/${posts[0].filename}`}>
										<img
											src={`/images/${posts[0].image}`}
											alt={posts[0].title}
											className="h-full w-full object-cover rounded-lg shadow-lg"
										/>
									</Link>
								</div>
							</div>
						</div>
					</div>

					{posts.length > 1 && (
						<div className="w-full max-w-5xl mx-auto px-4 pb-24 space-y-8">
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
								{posts.slice(1).map((post) => (
									<Link key={post.filename} href={`/${locale}/blog/${post.filename}`} className="block">
										<div className="overflow-hidden rounded-lg shadow-md transition-all hover:shadow-lg">
											<img
												src={`/images/${post.image}`}
												alt={post.title}
												className="h-40 w-full object-cover bg-gray-600"
											/>
											<div className="bg-gray-800 p-6 pb-4">
												<div className="h-38 space-y-1">
													<h2 className="text-2xl font-semibold">{post.title}</h2>
													<p className="text-gray-400 line-clamp-3">{post.content}</p>
												</div>
												<div className="flex items-center justify-between text-sm text-gray-500">
													<span>{post.author}</span>
													<span>{post.date}</span>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					)}
				</>
			) : (
				<div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
					<h1 className="text-4xl font-bold text-white mb-4">{t("blog.not_found")}</h1>
					<p className="text-gray-400 mb-8">{t("blog.not_found_message")}</p>
				</div>
			)}
			<Footer />
		</main>
	);
}
