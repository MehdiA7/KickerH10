import type { Metadata } from "next";
import { Geist, Geist_Mono, Lexend_Deca } from "next/font/google";
import Headers from "../components/Headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexendDeca = Lexend_Deca({
    variable: "--font-lexend-deca",
    weight: "600",
    subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "KickerH10",
  description: "Score, track, improve, repeat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lexendDeca.variable} antialiased`}
      >
        <main className="mx-auto max-w-sm">
            <Headers/>
            {children}
        </main>
      </body>
    </html>
  );
}
