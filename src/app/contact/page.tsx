import Image from "next/image";
import desktopPaperplane from "~/assets/contact-page/desktop-paperplane.svg";
import desktopQuestionmark from "~/assets/contact-page/desktop-questionmark.svg";
import desktopHeart from "~/assets/contact-page/destop-heart.svg";
import mobileArrow from "~/assets/contact-page/mobile-arrow.svg";
import mobileHeart from "~/assets/contact-page/mobile-heart.svg";
import { ContactForm } from "~/components/contact-form";
import { Heading } from "~/components/typography/heading";
import { Title } from "~/components/typography/title";

export default function Page() {
	return (
		<section className="relative flex min-h-lvh flex-col items-center gap-16 bg-[url(/contact-background.webp))] bg-blue-100 px-responsive py-responsive lg:grid lg:grid-cols-2">
			<Title className="sr-only">Contact</Title>
			<div className="z-10 mt-20 flex flex-col items-center justify-center gap-8">
				<div className="flex max-w-100 flex-col gap-2">
					<Heading>Email</Heading>
					<p>
						Send an email to samuel.smlxdesign@gmail.com using you preferred
						mailing client and wait for a response.
					</p>
				</div>
				<div className="flex max-w-100 flex-col gap-2">
					<Heading>Other Platforms</Heading>
					<p>
						I have an account on multiple platforms. On Twitter/X you can find
						me under the name @realsmlxdesign, and @smlxdesign on Bluesky and
						Mastodon.
					</p>
				</div>
			</div>
			<div className="z-10 flex flex-col items-center justify-center">
				<Image
					loading="eager"
					aria-hidden
					alt=""
					src={mobileArrow}
					className="scale-70 lg:hidden"
				/>
				<ContactForm className="h-fit w-full max-w-100" formId="contact-page" />
			</div>
			<Image
				loading="lazy"
				aria-hidden
				alt=""
				src={mobileHeart}
				className="scale-70 lg:hidden"
			/>
			<Image
				loading="lazy"
				aria-hidden
				alt=""
				src={desktopQuestionmark}
				className="absolute top-15 right-30 hidden scale-60 fill-white lg:block xl:right-110"
			/>
			<Image
				loading="lazy"
				aria-hidden
				alt=""
				src={desktopPaperplane}
				className="absolute right-40 bottom-30 hidden scale-70 fill-white lg:block xl:right-90 xl:bottom-45 xl:scale-80"
			/>
			<Image
				loading="lazy"
				aria-hidden
				alt=""
				src={desktopHeart}
				className="absolute bottom-15 left-20 hidden scale-70 fill-white lg:block xl:bottom-20 xl:left-30"
			/>

			<div className="absolute right-0 bottom-0 left-0 h-1/4 bg-linear-to-t from-background to-transparent" />
		</section>
	);
}
