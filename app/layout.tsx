import React from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata = {
  title: ".",
  description: "This is the . project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
