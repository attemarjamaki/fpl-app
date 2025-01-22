import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FPL24.com",
  description: "FPL Live Data Tool",
};

export const viewport = {
  width: "device-width",
  initialScale: 0.6,
  maximumScale: 1,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow max-w-10xl mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
