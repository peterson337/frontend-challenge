import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className={inter.className}>
        <Header />
        {children}
      <Footer />
      </div>
  );
}
