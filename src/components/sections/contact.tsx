import Image from "next/image";
import ArrowVector from "~/assets/contact-arrow.svg";
import { ContactForm } from "~/components/contact-form";
import { Heading } from "~/components/typography/heading";

export function Contact() {
	return (
		<section className="flex flex-col items-center gap-8 px-responsive py-responsive">
			<Heading>Decided yet?</Heading>
			<ContactForm className="z-10 w-full sm:w-90" />
			<Image
				className="-rotate-12 absolute hidden translate-x-64 translate-y-28 scale-60 md:block lg:scale-75"
				src={ArrowVector}
				alt=""
				aria-hidden
			/>
		</section>
	);
}
