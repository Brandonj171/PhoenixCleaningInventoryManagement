import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { ReactNode } from "react";  // Fixed import for ReactNode

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Phoenix Cleaning Solutions",  // Fixed the typo ("Pheonix" to "Phoenix")
  description: "A simple inventory management system for Phoenix Cleaning Solutions.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;  // Corrected type definition for children prop
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
