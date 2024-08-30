"use client";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export default function WithRouterDevtools({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <TanStackRouterDevtools initialIsOpen={false} />
    </div>
  );
}
