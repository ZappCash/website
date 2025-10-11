import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar/index";
import { SmoothScroll } from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "ZappCash - The Future of Payments in Costa Rica",
  description: "Decentralized payments without limits. Send and receive money instantly with ultra-low fees of just 0.02%.",
  keywords: "ZappCash, Costa Rica, payments, fintech, stablecoins, SINPE, cryptocurrency, blockchain, decentralized finance",
  authors: [{ name: "ZappCash" }],
  openGraph: {
    title: "ZappCash - The Future of Payments in Costa Rica",
    description: "Decentralized payments without limits. Send and receive money instantly with ultra-low fees of just 0.02%.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <SmoothScroll />
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
