"use client";

import {
  standardSchemaValidator,
  useForm,
  Validator,
} from "@tanstack/react-form";

import Link from "next/link";
import { z } from "zod";

import { Button } from "@/components/button";
import { Field } from "@/components/field";

import { selectUsersSchema } from "@/db/schema";

import { signIn } from "./actions";

export default function Page() {
  const form = useForm<
    z.infer<typeof selectUsersSchema>,
    Validator<z.infer<typeof selectUsersSchema>, unknown>
  >({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => await signIn(value),
    validatorAdapter: standardSchemaValidator(),
    validators: {
      onChange: selectUsersSchema,
    },
  });

  return (
    <form
      className="flex w-1/2 flex-col gap-8"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        form.handleSubmit();
      }}
    >
      <h1 className="text-2xl font-semibold">sign in</h1>
      <p className="lowercase">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat nisi
        tenetur necessitatibus voluptatum, voluptatibus dolorem nihil pariatur
        provident maiores beatae? Dolore, similique voluptates! Quidem dolores
        doloremque at nihil veritatis sequi?
      </p>
      <form.Field name="email">
        {(field) => (
          <Field
            autoComplete="email"
            field={field}
            placeholder="jondoe@example.com"
          />
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <Field
            autoComplete="current-password"
            field={field}
            type="password"
          />
        )}
      </form.Field>
      <form.Subscribe selector={(state) => state.canSubmit}>
        {(canSubmit) => (
          <Button bg="950" disabled={!canSubmit}>
            sign in
          </Button>
        )}
      </form.Subscribe>
      <div className="text-center">
        don't have an account?{" "}
        <Link className="underline" href="/sign-up">
          sign up
        </Link>
      </div>
    </form>
  );
}
