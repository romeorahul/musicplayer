import "./globals.css";
import { Inter } from "next/font/google";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Music Player",
  description: "Made By Rahul Singh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
