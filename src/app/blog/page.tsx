import { Navbar } from "~/components/navbar";
import { Contact } from "~/components/sections/contact";
import { Hero } from "~/components/sections/hero";
import { Footer } from "~/components/sections/footer";

export default function Page() {
	return (
		<div className="flex flex-col">
			<Navbar />
			<main>
				<Hero>Blog</Hero>
			</main>
			<footer>
				<Contact />
				<Footer />
			</footer>
		</div>
	);
}
