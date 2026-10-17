import type { Metadata } from "next";

// The admin panel must never appear in search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/[locale]/admin">) {
  return children;
}
