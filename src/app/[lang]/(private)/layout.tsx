import { ReactNode } from "react";
import MiniDrawerResponsive from "./_components/layout/responsive-layout";
import { QueryClientProvider } from "@/provider/query-client";

export default async function MiniDrawer({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: "en" | "fa" }>;
}) {
  const lang = (await params).lang;

  return (
    <MiniDrawerResponsive lang={lang}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </MiniDrawerResponsive>
  );
}
