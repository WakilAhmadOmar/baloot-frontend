
import { ReactNode } from "react";
import { QueryClientProvider } from "@/provider/query-client";


export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <QueryClientProvider>{children}</QueryClientProvider>;
}
