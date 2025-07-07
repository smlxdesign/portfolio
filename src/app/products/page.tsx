import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { products } from "~/data/products";

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
