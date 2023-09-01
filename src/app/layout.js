"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils/apolloClient";
import { MyContextProvider } from "@/components/context/MyContext";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Music Player",
  description: "Made By Rahul Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <MyContextProvider>{children} </MyContextProvider>
          <Footer />
        </ApolloProvider>
      </body>
    </html>
  );
}
