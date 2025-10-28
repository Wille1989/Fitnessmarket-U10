import Navbar from "./Navbar";
import Footer from "./Footer";
import '../../css/layout/Layout.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
