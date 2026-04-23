import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "UnizConnect — Is Your 2026 Study Abroad Plan Good Enough?",
  description: "British Council Certified study abroad consultancy. 99% Visa Success Rate. Professional guidance for UK, Canada, Germany, and Australia.",
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className={`${plusJakarta.variable} ${fraunces.variable} font-sans min-h-full flex flex-col text-dark`}>
        {children}
      </body>
    </html>
  );
}
