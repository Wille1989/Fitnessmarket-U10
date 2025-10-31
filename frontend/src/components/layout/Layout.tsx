import Navbar from "./Navbar";
import Footer from "./Footer";
import '../../css/layout/Layout.css';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper">
      <Navbar />
          <main className="main-content">
            {children}
          </main>
      <Footer />
    </div>
  );
}

export default Layout;
