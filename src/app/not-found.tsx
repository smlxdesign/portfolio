import { RiHomeLine } from "@remixicon/react";
import Link from "next/link";
import { Title } from "~/components/typography/title";
import { Button } from "~/components/ui/button";

export default function Page() {
	return (
		<section className="mt-20 flex flex-col gap-8 px-responsive py-responsive">
			<Title className="max-w-lg">This site does not exist :/</Title>
			<p className="max-w-lg">
				Error 404: Not found. You may have mistyped the url, or this page may
				have been removed. If you want to go back to the home page, you can
				press the button below.
			</p>
			<div className="flex gap-4">
				<Button asChild>
					<Link href="/">
						<RiHomeLine /> Home Page
					</Link>
				</Button>
			</div>
		</section>
	);
}
