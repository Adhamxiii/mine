import SessionWrapper from "@/providers/SessionWrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://adhamz.vercel.app/"),
  title: {
    default: "Adham Z - Software Engineer Portfolio",
    template: "Adham Z - %s",
  },
  description:
    "Welcome to Adham Z's portfolio! Discover web development projects, creative designs, and professional experiences that highlight my skills and expertise in building modern, responsive websites.",
  openGraph: {
    title: "Adham Nasser",
    description:
      "Welcome to Adham Z's portfolio! Discover web development projects, creative designs, and professional experiences that highlight my skills and expertise in building modern, responsive websites.",
    type: "profile",
    locale: "en_US",
    url: "https://adhamz.vercel.app/",
    siteName: "AdhamZ",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className} h-full bg-white text-black selection:bg-gray-200 dark:bg-[#090908] dark:text-white dark:selection:bg-gray-800`}
        >
          <AntdRegistry>
            <Provider>
              <Navbar />
              <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {children}
              </main>
            </Provider>
          </AntdRegistry>
        </body>
      </html>
    </SessionWrapper>
  );
}
