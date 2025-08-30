import type { Metadata } from "next";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { products } from "~/data/products";

export const metadata: Metadata = {
	title: "Products",
	openGraph: {
		title: "Products",
		description: "A list of the stuff I have made",
	},
};

export default function Page() {
	return (
		<>
			<Hero>Products</Hero>
			<ul className="flex flex-col gap-24 px-responsive py-responsive">
				{products.map((product) => (
					<li key={product.id}>
						<Teaser {...product} />
					</li>
				))}
			</ul>
		</>
	);
}
