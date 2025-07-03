"use client";

import { z } from "zod/v4";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Subheading } from "./typography/subheading";
import { useEffect } from "react";
import { InlineError } from "./ui/inline-error";

export const formSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be longer than 3 characters")
		.max(100, "Name must not be longer than 100 characters"),
	email: z
		.email()
		.min(3, "Email must be longer than 3 characters")
		.max(100, "Name must not be longer than 100 characters"),
	message: z.string().min(3, "Message must be longer than 3 characters"),
});
export type formSchema = z.infer<typeof formSchema>;

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {
		Input,
		Textarea,
	},
	formComponents: {
		Button,
	},
	fieldContext,
	formContext,
});

export function ContactForm() {
	const form = useAppForm({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},

		validators: {
			onChange: formSchema,
		},

		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	return (
		<Card>
			<CardHeader>
				<Subheading>Contact me</Subheading>
			</CardHeader>
			<CardContent>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						form.handleSubmit();
					}}
					className="flex w-80 flex-col gap-4"
				>
					<form.AppField name="name">
						{(field) => (
							<div className="flex flex-col gap-1">
								<field.Input
									placeholder="Nickname"
									type="text"
									onChange={(event) => field.handleChange(event.target.value)}
									id={field.name}
									name={field.name}
									value={field.state.value}
								/>
								{!field.state.meta.isValid && field.state.meta.isTouched && (
									<InlineError>
										{field.state.meta.errors.map(
											(error) => error?.message,
										)[0] ?? null}
									</InlineError>
								)}
							</div>
						)}
					</form.AppField>
					<form.AppField name="email">
						{(field) => (
							<div className="flex flex-col gap-1">
								<field.Input
									placeholder="Email Address"
									type="email"
									onChange={(event) => field.handleChange(event.target.value)}
									id={field.name}
									name={field.name}
									value={field.state.value}
								/>
								{!field.state.meta.isValid && field.state.meta.isTouched && (
									<InlineError>
										{field.state.meta.errors.map(
											(error) => error?.message,
										)[0] ?? null}
									</InlineError>
								)}
							</div>
						)}
					</form.AppField>
					<form.AppField name="message">
						{(field) => (
							<div className="flex flex-col gap-1">
								<field.Textarea
									placeholder="Message"
									onChange={(event) => field.handleChange(event.target.value)}
									id={field.name}
									name={field.name}
									value={field.state.value}
								/>
								{!field.state.meta.isValid && field.state.meta.isTouched && (
									<InlineError>
										{field.state.meta.errors.map(
											(error) => error?.message,
										)[0] ?? null}
									</InlineError>
								)}
							</div>
						)}
					</form.AppField>
					<form.AppForm>
						<form.Button type="submit">Send</form.Button>
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	);
}
