"use server";

import Link from "next/link";
import { House, Newspaper, Download } from 'lucide-react';

import { getLocale } from "@/lib/getLocale";
import { getTranslate } from "@/lib/locale";

export default async function Navbar() {
	const locale = await getLocale();
	const t = await getTranslate(locale);

	const links = [
		{ href: `/${locale}/`, label: t("navbar.home"), icon: House },
		{ href: `/${locale}/blog`, label: t("navbar.blog"), icon: Newspaper },
		{ href: `/invite`, label: t("home.hero.invite_button"), icon: Download}
	]

	return (
		<nav className="backdrop-blur-sm bg-gray-900/50 border-b border-white/10 fixed top-0 w-full z-50 p-3 flex justify-between items-center">
			<div className="flex items-center">
				<div className="mx-2">
					<Link href={`/${locale}/`} className="text-xl font-bold text-white hover:text-gray-300">TransCord</Link>
				</div>
				<div className="md:block hidden mx-4 h-6 border-l border-gray-700"></div>
				<ul className="md:flex hidden">
					{links.map((link) => (
						<li key={link.href} className="mr-2">
							<Link href={link.href} className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition-colors duration-150 group-hover:bg-gray-700 group-hover:text-white group-hover:rounded-sm group-hover:shadow-lg text-sm">
								<link.icon className="mr-2" size={18} />
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}