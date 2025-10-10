import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZappCash - The Future of Payments in Costa Rica",
  description: "Decentralized payments without limits. Send and receive money instantly with ultra-low fees of just 0.02%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
