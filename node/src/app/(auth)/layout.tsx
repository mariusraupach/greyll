import React from "react";

import { redirect } from "next/navigation";

import { getCurrentSession } from "@/lib/sessions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid h-screen grid-cols-2 gap-4 p-4">
      <div className="rounded-lg bg-black"></div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
