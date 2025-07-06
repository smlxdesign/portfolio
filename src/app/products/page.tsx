import Image from "next/image";
import Link from "next/link";
import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";
import { Hero } from "~/components/sections/hero";
import { Heading } from "~/components/typography/heading";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { products } from "~/data/products";
import { tags } from "~/data/tags";

export default function Page() {
	return (
		<div className="flex flex-col">
			<Navbar />
			<main>
				<Hero>Products</Hero>
				<ul className="flex flex-col gap-24 px-responsive py-responsive">
					{products.map((product) => (
						<li key={product.id} className="flex flex-col gap-16 md:flex-row">
							<Image
								src={product.image.href}
								alt={product.image.alt ?? ""}
								width={1920}
								height={1080}
								className="w-full rounded-xl"
							/>
							<div className="flex w-full flex-col justify-between">
								<div className="flex flex-col gap-3">
									<Heading>{product.title}</Heading>
									<div className="flex flex-wrap gap-2">
										{product.tags.map((tagId) => {
											const tag = tags[tagId];
											console.log(tag);

											if (tag === undefined) {
												return null;
											}

											return (
												<Badge variant="secondary" key={tag.title}>
													<tag.icon />
													{tag.title}
												</Badge>
											);
										})}
									</div>
									<p className="max-w-[65ch]">{product.description}</p>
								</div>
								<div className="flex gap-2">
									{product.links.map((link, index) => (
										<Button
											key={link.href}
											asChild
											variant={index === 0 ? "default" : "secondary"}
										>
											<Link href={link.href}>
												{link.icon}
												{link.title}
											</Link>
										</Button>
									))}
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
			<footer>
				<Contact />
				<Footer />
			</footer>
		</div>
	);
}
