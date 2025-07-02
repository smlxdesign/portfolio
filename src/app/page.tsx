import Image from "next/image";
import Link from "next/link";
import { Hero } from "~/components/sections/hero";
import { Heading } from "~/components/typography/heading";
import { Subheading } from "~/components/typography/subheading";
import { Button } from "~/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import { products } from "~/data/products";
import { tags } from "~/data/tags";

export default function HomePage() {
	return (
		<div className="flex flex-col">
			<main>
				<Hero>
					Fullstack engineer
					<br /> + designer
				</Hero>
				<section className="flex flex-col items-center gap-8 px-6 py-16 md:py-48 lg:px-24 xl:px-48">
					<Heading>My Latest Projects</Heading>
					<div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
						{products.map((product, index) => {
							if (index >= 3) {
								return null;
							}

							return (
								<Link href={product.links[0]?.href ?? "/"} key={product.id}>
									<Card className="h-full justify-between">
										<CardContent className="flex flex-col gap-4">
											<Image
												src={product.image.href}
												alt={product.image.alt ?? ""}
												className="rounded-lg"
												width={1920}
												height={1080}
											/>
										</CardContent>
										<CardFooter>
											<div className="flex flex-col">
												<Subheading>{product.title}</Subheading>
												{product.tags.length > 0 && (
													<p className="text-sm">
														{tags[product.tags[0] ?? ""]?.title} ·{" "}
														{tags[product.tags[1] ?? ""]?.title}
													</p>
												)}
											</div>
										</CardFooter>
									</Card>
								</Link>
							);
						})}
					</div>
					<Button asChild variant="secondary">
						<Link href="/products/">Show all</Link>
					</Button>
				</section>
			</main>
		</div>
	);
}
