"use server";

import {
	createServerValidate,
	ServerValidateError,
} from "@tanstack/react-form/nextjs";
import { Resend } from "resend";
import { formOptions, formSchema } from "~/data/form";
import { env } from "~/env";

const serverValidate = createServerValidate({
	...formOptions,
	onServerValidate: formSchema,
});

export async function submitForm(_: unknown, formData: FormData) {
	try {
		const validatedData = await serverValidate(formData);

		const resend = new Resend(env.RESEND_API_KEY);

		await resend.emails.send({
			from: env.RESEND_FROM_ADDRESS,
			replyTo: validatedData.email,
			to: env.RESEND_TO_ADDRESS,
			subject: validatedData.subject,
			text: validatedData.message,
		});
	} catch (error) {
		if (error instanceof ServerValidateError) {
			return error.formState;
		}

		throw `Error sending email: ${error}`;
	}
}
