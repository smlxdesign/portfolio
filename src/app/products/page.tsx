import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Footer } from "~/components/sections/footer";
import { Hero } from "~/components/sections/hero";
import { Teaser } from "~/components/teaser";
import { products } from "~/data/products";

export default function Page() {
	return (
		<div className="flex flex-col">
			<Navbar />
			<main>
				<Hero>Products</Hero>
				<ul className="flex flex-col gap-24 px-responsive py-responsive">
					{products.map((product) => (
						<li key={product.id}>
							<Teaser {...product} />
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
