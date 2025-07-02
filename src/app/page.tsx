import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { products } from "~/data/products";
import { tags } from "~/data/tags";

export default function HomePage() {
	return (
		<div className="flex flex-col bg-slate-100 text-slate-800">
			<main>
				<section className="px-6 pt-32 pb-16 md:pt-48 lg:px-24 xl:px-48">
					<h1 className="h1">
						Fullstack engineer
						<br /> + designer
					</h1>
				</section>
				<section className="flex flex-col gap-8 px-6 py-16 md:py-48 lg:px-24 xl:px-48">
					<h2 className="h2 w-full text-center">My Latest Projects</h2>
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
												<h3 className="h3">{product.title}</h3>
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
				</section>
			</main>
		</div>
	);
}
