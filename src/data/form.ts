import { formOptions as tanstackFormOptions } from "@tanstack/react-form/nextjs";
import z from "zod/v4";

export const formSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be longer than 3 characters")
		.max(100, "Name must not be longer than 100 characters"),
	email: z
		.email()
		.min(3, "Email must be longer than 3 characters")
		.max(100, "Name must not be longer than 100 characters"),
	subject: z
		.string()
		.min(3, "Subject must be longer than 3 characters")
		.max(100, "Subject must not be longer than 100 characters"),
	message: z.string().min(3, "Message must be longer than 3 characters"),
});
export type formSchema = z.infer<typeof formSchema>;

export const formOptions = tanstackFormOptions({
	defaultValues: {
		name: "",
		email: "",
		subject: "",
		message: "",
	},
});
