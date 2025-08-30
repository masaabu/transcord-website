import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostSection from "@/components/PostSection";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	return (
		<div className="bg-gray-900 text-white">
			<Navbar />
			<main className="pt-10">
				<PostSection locale={locale} postId="privacy-policy" home={false} />
			</main>
			<Footer />
		</div>
	)
}