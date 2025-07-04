import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Contact } from "~/components/sections/contact";
import { Hero } from "~/components/sections/hero";
import { Heading } from "~/components/typography/heading";
import { Subheading } from "~/components/typography/subheading";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import { products } from "~/data/products";
import { tags } from "~/data/tags";

function SkillsList(props: { category: string; skills: string[] }) {
	return (
		<div className="flex flex-col gap-2">
			<Subheading>{props.category}</Subheading>
			<ul className="ml-4 flex list-disc flex-col gap-1">
				{props.skills.map((skill) => (
					<li key={skill}>{skill}</li>
				))}
			</ul>
		</div>
	);
}

export default function HomePage() {
	return (
		<div className="flex flex-col">
			<main>
				<Hero>
					Fullstack engineer
					<br /> + designer
				</Hero>
				<section className="flex flex-col items-center gap-8 px-responsive py-responsive">
					<Heading>My Latest Projects</Heading>
					<div className="flex flex-col gap-4 sm:grid sm:grid-cols-3">
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
				<section className="flex flex-col items-center gap-8 px-8 py-16 sm:px-12 md:py-32 lg:px-24 xl:px-48">
					<Heading>A little about me</Heading>
					<div className="flex w-full flex-col gap-12 lg:flex-row">
						<p className="w-full max-w-[60ch]">
							Hey! I am Samuel, a passionate Software Engineer that loves to
							build websites and user interfaces. During the summer of 2024, I
							finished the SuperSimpleDev’s Javascript course. After building
							some simple apps, I realized there was something missing;
							autocomplete in my IDE. I found out about Typescript and instantly
							got in love with the language.
						</p>
						<div className="flex flex-wrap gap-6 lg:flex-nowrap">
							<SkillsList
								category="Languages & Tools"
								skills={[
									"Javascript",
									"Typescript",
									"SQL",
									"Docker",
									"Git",
									"Linux",
								]}
							/>
							<SkillsList
								category="Frameworks & Libraries"
								skills={[
									"React",
									"Node.js",
									"Express.js",
									"Tailwindcss",
									"Next.js",
								]}
							/>
							<SkillsList
								category="CS Concepts"
								skills={[
									"Object Oriented Programming",
									"Functional Programming",
									"Procedural Programming",
								]}
							/>
						</div>
					</div>
				</section>
				<Contact />
			</main>
		</div>
	);
}
