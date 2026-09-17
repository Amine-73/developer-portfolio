import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amine Channa | Full-Stack Developer",
  description: "Full-Stack Developer specializing in React, Next.js, Node.js, PHP, and modern web technologies.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
  lang="en"
  className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
>
  <body className="min-h-full flex flex-col">
    {children}

    {process.env.NEXT_PUBLIC_GA_ID && (
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    )}
  </body>
</html>
  );
}
