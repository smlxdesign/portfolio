"use server";

import {
	ServerValidateError,
	createServerValidate,
} from "@tanstack/react-form/nextjs";
import { formOptions, formSchema } from "~/data/form";

const serverValidate = createServerValidate({
	...formOptions,
	onServerValidate: formSchema,
});

export async function submitForm(prev: unknown, formData: FormData) {
	try {
		const validatedData = await serverValidate(formData);
		console.log(validatedData);
	} catch (error) {
		if (error instanceof ServerValidateError) {
			return error.formState;
		}

		throw error;
	}
}
