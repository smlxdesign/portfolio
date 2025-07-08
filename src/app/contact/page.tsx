import { ContactForm } from "~/components/contact-form";
import { Heading } from "~/components/typography/heading";

export default function Page() {
	return (
		<section className="flex min-h-lvh flex-col gap-16 bg-[url(/contact-background.webp))] px-responsive py-responsive lg:grid lg:grid-cols-2">
			<div className="z-10 mt-20 flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col gap-2 max-w-100">
					<Heading>Email</Heading>
					<p>
						Send an email to samuel.smlxdesign@gmail.com using you preferred
						mailing client and wait for a response.
					</p>
				</div>
				<div className="flex flex-col gap-2 max-w-100">
					<Heading>Other Platforms</Heading>
					<p>
						I have an account on multiple platforms. On Twitter/X you can find
						me under the name @realsmlxdesign, and @smlxdesign on Bluesky and
						Mastodon.
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<ContactForm className="h-fit w-full max-w-100" />
			</div>
		</section>
	);
}
