import React from "react";
import { Metadata } from "next";
import localFont from "next/font/local";
import { SuperHeroProvider } from "../context/superherocontext";
import "./globals.css";

const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "League of Heroes",
  description: "Liga dos herois",
};

export default function RootLayout({
  children,
  header,
  footer,
}: any) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SuperHeroProvider>
          <div>
            {header ? header : null}
            <main>{children}</main>
            {footer ? footer : null}
          </div>
        </SuperHeroProvider>
      </body>
    </html>
  );
}
