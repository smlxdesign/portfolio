"use client";

import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState } from "react";
import { submitForm } from "~/app/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { formOptions, formSchema } from "~/data/form";
import { Subheading } from "./typography/subheading";
import { Card, CardContent, CardHeader } from "./ui/card";
import { InlineError } from "./ui/inline-error";

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
	const [, action] = useActionState(submitForm, initialFormState);

	const form = useAppForm({
		...formOptions,

		validators: {
			onSubmit: formSchema,
		},
	});

	return (
		<Card>
			<CardHeader>
				<Subheading>Contact me</Subheading>
			</CardHeader>
			<CardContent>
				<form
					action={action}
					onSubmit={() => {
						form.handleSubmit();
						form.reset();
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
								{!field.state.meta.isValid && (
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
								{!field.state.meta.isValid && (
									<InlineError>
										{field.state.meta.errors.map(
											(error) => error?.message,
										)[0] ?? null}
									</InlineError>
								)}
							</div>
						)}
					</form.AppField>
					<form.AppField name="subject">
						{(field) => (
							<div className="flex flex-col gap-1">
								<field.Input
									placeholder="Subject"
									type="text"
									onChange={(event) => field.handleChange(event.target.value)}
									id={field.name}
									name={field.name}
									value={field.state.value}
								/>
								{!field.state.meta.isValid && (
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
								{!field.state.meta.isValid && (
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
						{form.state.isSubmitting ? (
							<form.Button type="submit" disabled>
								Sending...
							</form.Button>
						) : (
							<form.Button type="submit">Send</form.Button>
						)}
					</form.AppForm>
				</form>
			</CardContent>
		</Card>
	);
}
