import { Inter } from "next/font/google";
import { TaskProvider } from "../context/TaskContext";
import { NavBar } from "../components/NavBar";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import Providers from "../components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <TaskProvider>
            <NavBar />
            <Layout> {children}</Layout>
            <Toaster />
          </TaskProvider>
        </Providers>
      </body>
    </html>
  );
}
