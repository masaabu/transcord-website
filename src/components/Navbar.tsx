"use server";

import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { House, Newspaper, Download, Menu } from 'lucide-react';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"

import { getLocale } from "@/lib/getLocale";
import { getTranslate } from "@/lib/locale";

export default async function Navbar() {
	const locale = await getLocale();
	const t = await getTranslate(locale);

	const links = [
		{ href: `/${locale}/`, label: t("navbar.home"), icon: House },
		{ href: `/${locale}/blog`, label: t("navbar.blog"), icon: Newspaper },
		{ href: `/invite`, label: t("home.hero.invite_button"), icon: Download }
	]

	return (
		<nav className="backdrop-blur-sm bg-gray-900/50 border-b border-white/10 fixed top-0 w-full z-50 p-3 flex items-center">
			<div className="w-full flex items-center md:justify-normal justify-between">
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
				<Sheet>
					<SheetTrigger>
						<div className="md:hidden flex p-2 items-center justify-center text-gray-300 hover:bg-gray-800 rounded-lg">
							<Menu />
						</div>
					</SheetTrigger>
					<SheetContent className="text-white backdrop-blur-sm bg-gray-900/75 border-white/10">
						<SheetHeader>
							<SheetTitle className="text-white">TransCord</SheetTitle>
						</SheetHeader>
						<div className="p-4 space-y-2">
							{links.map((link) => (
								<div key={link.href}>
									<Link href={link.href} className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg px-3 py-2 transition-colors duration-150 group-hover:bg-gray-700 group-hover:text-white group-hover:rounded-sm group-hover:shadow-lg text-sm">
										<link.icon className="mr-2" size={18} />
										{link.label}
									</Link>
								</div>
							))}
							<LanguageSwitcher />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	)
}