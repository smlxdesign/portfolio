import {
	type RemixiconComponentType,
	RiBlueskyLine,
	RiBox3Line,
	RiChat3Line,
	RiCodeSLine,
	RiContactsBookLine,
	RiCopyrightLine,
	RiEditLine,
	RiGithubLine,
	RiHomeLine,
	RiMailUnreadLine,
	RiMastodonLine,
	RiSurveyLine,
	RiTwitterLine,
} from "@remixicon/react";
import Image from "next/image";
import Link from "next/link";
import logo from "~/assets/logo.svg";
import { Subheading } from "~/components/typography/subheading";
import { products } from "~/data/products";

export function Footer() {
	function FooterList(props: {
		category: string;
		links: Array<{
			icon: RemixiconComponentType;
			title: string;
			href: string;
		}>;
	}) {
		return (
			<div className="flex flex-col gap-2">
				<Subheading>{props.category}</Subheading>
				<ul className="flex flex-col gap-2">
					{props.links.map((link) => (
						<li key={link.title}>
							<Link
								href={link.href}
								className="flex flex-row items-center gap-2 text-lg"
							>
								<link.icon className="size-5" />
								{link.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<section className="flex flex-col gap-16 px-responsive py-responsive md:flex-row md:justify-between lg:gap-20 xl:gap-32">
			<Image src={logo} alt="SMLX Design Logo" className="size-48" />
			<div className="flex flex-col gap-10 sm:flex-row sm:flex-wrap sm:gap-20">
				<FooterList
					category="Jump to..."
					links={[
						{
							icon: RiHomeLine,
							title: "Home",
							href: "/",
						},
						{
							icon: RiBox3Line,
							title: "Products",
							href: "/products/",
						},
						{
							icon: RiEditLine,
							title: "Blog",
							href: "/blog/",
						},
						{
							icon: RiContactsBookLine,
							title: "Contact",
							href: "/contact",
						},
					]}
				/>
				<FooterList
					category="Products"
					links={products
						.filter((_, index) => index < 3)
						.map((product) => {
							return {
								icon: product.icon ?? RiBox3Line,
								title: product.title,
								href: product.links[0]?.href ?? "/products/",
							};
						})}
				/>
				<FooterList
					category="Socials"
					links={[
						{
							icon: RiGithubLine,
							title: "Github",
							href: "https://github.com/smlxdesign",
						},
						{
							icon: RiTwitterLine,
							title: "Twitter/X",
							href: "https://x.com/realsmlxdesign",
						},
						{
							icon: RiBlueskyLine,
							title: "Bluesky",
							href: "https://bsky.app/profile/smlxdesign.bsky.social",
						},
						{
							icon: RiMastodonLine,
							title: "Mastodon",
							href: "https://mastodon.social/@smlxdesign",
						},
					]}
				/>
				<FooterList
					category="Contact"
					links={[
						{
							icon: RiMailUnreadLine,
							title: "Send an Email",
							href: "mailto:samuel.smlxdesign@gmail.com",
						},
						{
							icon: RiChat3Line,
							title: "DM on Twitter",
							href: "https://x.com/realsmlxdesign",
						},
						{
							icon: RiSurveyLine,
							title: "Contact Form",
							href: "/contact",
						},
					]}
				/>
				<FooterList
					category="This Site"
					links={[
						{
							icon: RiCodeSLine,
							title: "Source Code",
							href: "https://github.com/smlxdesign/portfolio",
						},
						{
							icon: RiCopyrightLine,
							title: "License",
							href: "https://github.com/smlxdesign/portfolio/blob/main/LICENSE",
						},
					]}
				/>
			</div>
		</section>
	);
}
