import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
      <Footer />
    </div>
  );
};

export default Layout;
