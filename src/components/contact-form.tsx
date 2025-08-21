"use client";

import { Label } from "@radix-ui/react-label";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import posthog from "posthog-js";
import type React from "react";
import { useActionState } from "react";
import { submitForm } from "~/app/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { formOptions, formSchema } from "~/data/form";
import { cn } from "~/lib/utils";
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

export function ContactForm({
	className,
	formId,
	...props
}: React.ComponentProps<"div"> & { formId: string }) {
	const [, action] = useActionState(submitForm, initialFormState);

	const form = useAppForm({
		...formOptions,

		validators: {
			onBlur: formSchema,
		},
	});

	return (
		<Card className={cn(className)} {...props}>
			<CardHeader>
				<Subheading>Contact me</Subheading>
			</CardHeader>
			<CardContent>
				<form
					action={action}
					onSubmit={() => {
						form.handleSubmit();
						posthog.capture("form_submitted");
						form.reset();
					}}
					className="flex w-full flex-col gap-4"
				>
					<form.AppField name="name">
						{(field) => (
							<div className="flex flex-col gap-1">
								<Label htmlFor={field.name + formId} className="sr-only">
									Nickname
								</Label>
								<field.Input
									placeholder="Nickname"
									type="text"
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={() => field.handleBlur()}
									id={field.name + formId}
									name={field.name + formId}
									value={field.state.value}
									required
								/>
								{!field.state.meta.isValid &&
									field.state.meta.isTouched &&
									field.state.meta.isBlurred && (
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
								<Label htmlFor={field.name + formId} className="sr-only">
									Email Address
								</Label>
								<field.Input
									placeholder="Email Address"
									type="email"
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={() => field.handleBlur()}
									id={field.name + formId}
									name={field.name + formId}
									value={field.state.value}
									required
								/>
								{!field.state.meta.isValid &&
									field.state.meta.isTouched &&
									field.state.meta.isBlurred && (
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
								<Label htmlFor={field.name + formId} className="sr-only">
									Subject
								</Label>
								<field.Input
									placeholder="Subject"
									type="text"
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={() => field.handleBlur()}
									id={field.name + formId}
									name={field.name + formId}
									value={field.state.value}
									required
								/>
								{!field.state.meta.isValid &&
									field.state.meta.isTouched &&
									field.state.meta.isBlurred && (
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
							<div className="flex max-h-50 flex-col gap-1">
								<Label htmlFor={field.name + formId} className="sr-only">
									Message
								</Label>
								<field.Textarea
									placeholder="Message"
									onChange={(event) => field.handleChange(event.target.value)}
									onBlur={() => field.handleBlur()}
									id={field.name + formId}
									name={field.name + formId}
									value={field.state.value}
									required
								/>
								{!field.state.meta.isValid &&
									field.state.meta.isTouched &&
									field.state.meta.isBlurred && (
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
