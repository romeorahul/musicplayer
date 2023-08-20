"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apolloClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Music Player",
  description: "Made By Rahul Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
