import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

// next/font downloads the font at build time and serves it ourselves,
// so visitors' browsers never contact Google (better for privacy/GDPR).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Kledingreparatie Mustan",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
