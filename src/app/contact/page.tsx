import { ContactForm } from "~/components/contact-form";
import { Heading } from "~/components/typography/heading";

export default function Page() {
	return (
		<section className="grid min-h-lvh grid-cols-2 gap-16 bg-[url(/contact-background.webp))] px-responsive py-responsive">
			<div className="flex flex-col items-center justify-center gap-8">
				<div className="flex flex-col gap-2">
					<Heading>Email</Heading>
					<p>
						Send an email to samuel.smlxdesign@gmail.com using you preferred
						mailing client and wait for a response.
					</p>
				</div>
				<div className="flex flex-col gap-2">
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
