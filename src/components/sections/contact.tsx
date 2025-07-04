import Image from "next/image";
import { ContactForm } from "~/components/contact-form";
import { Heading } from "~/components/typography/heading";
import ArrowVector from "~/assets/contact-arrow.svg";

export function Contact() {
	return (
		<section className="flex flex-col items-center gap-8 px-responsive py-responsive">
			<Heading>Decided yet?</Heading>
			<ContactForm className="z-10" />
			<Image
				className="-rotate-12 absolute hidden translate-x-64 translate-y-28 scale-75 md:block"
				src={ArrowVector}
				alt=""
				aria-hidden
			/>
		</section>
	);
}
