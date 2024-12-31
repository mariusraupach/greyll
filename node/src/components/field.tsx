import React from "react";

import { FieldApi } from "@tanstack/react-form";

import { Input } from "./input";

interface InputFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  field: FieldApi<any, any, any, any, any>;
}

export const Field = ({ field, ...props }: InputFieldProps) => (
  <div className="flex flex-col gap-4">
    <label htmlFor={field.name}>
      {field.name
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toLowerCase()}
    </label>
    <Input
      id={field.name}
      name={field.name}
      onChange={(event) => field.handleChange(event.target.value)}
      value={field.state.value}
      {...props}
    />
    {field.state.meta.errors.length > 0 && field.state.meta.isTouched && (
      <div className="text-red-500">{field.state.meta.errors.join(", ")}</div>
    )}
  </div>
);
