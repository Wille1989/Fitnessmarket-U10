import { Link } from "react-router-dom";
import { getDecodedToken } from "../../middleware/JwtDecode";
import GoTopButton from "../navigation/button/GoTopButton";
import { useState, useEffect } from "react";
import '../../css/layout/Navbar.css';

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);
  const decoded = getDecodedToken();
  const role = decoded?.role || "guest";

  useEffect(() => {
    const handleScroll = () => {
      if (open) setOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <h1><i>Food</i>Market</h1>
        
          <div className="mobile-view">
          <div className="meny">
            <button 
              type="button" 
              className="hamburger"
              onClick={() => setOpen(!open)}
              aria-label="Meny"> 
                {open ? 'X' : '☰'}
            </button>
          
          <ul className={`navbar-links ${open ? 'open' : ''}`}>

            <li><Link to="/" onClick={() => setOpen(false)}>Startsida</Link></li>
            <li><Link to="/product/compare" onClick={() => setOpen(false)}>Jämför produkter</Link></li>
            <li><Link to="/about" onClick={() => setOpen(false)}>Om oss</Link></li>

            {role === "guest" && (
              <>
                <li><Link to="/register" onClick={() => setOpen(false)}>Skapa Konto</Link></li>
                <li><Link to="/login" onClick={() => setOpen(false)}>Logga in</Link></li>
              </>
            )}

            {role === "admin" && (
              <>
                <li><Link to="/admin/users" onClick={() => setOpen(false)}>Användare</Link></li>
                <li><Link to="/product/create" onClick={() => setOpen(false)}>Skapa Produkt</Link></li>
                <li><Link to="/logout" onClick={() => setOpen(false)}>Logga ut</Link></li>
              </>
            )}

            {role === "sales" && (
              <>
                <li><Link to="/product/create" onClick={() => setOpen(false)}>Skapa Produkt</Link></li>
                <li><Link to="/logout" onClick={() => setOpen(false)}>Logga ut</Link></li>
              </>
            )}

            {role === "customer" && (
              <>
                <li><Link to="/myOrders" onClick={() => setOpen(false)}>Mina ordrar</Link></li>
                <li><Link to="/logout" onClick={() => setOpen(false)}>Logga ut</Link></li>
              </>
            )}
      
          </ul>

            < GoTopButton />
            </div>
          </div>

        <div className="desktop-view">
          <ul className="navbar-links">
            <li><Link to="/">Startsida</Link></li>
            <li><Link to="/product/compare">Jämför produkter</Link></li>
            <li><Link to="/about">Om oss</Link></li>

            {role === "guest" && (
              <>
                <li><Link to="/register">Skapa Konto</Link></li>
                <li><Link to="/login">Logga in</Link></li>
              </>
            )}

            {role === "admin" && (
              <>
                <li><Link to="/admin/users">Användare</Link></li>
                <li><Link to="/product/create">Skapa Produkt</Link></li>
                <li><Link to="/logout">Logga ut</Link></li>
              </>
            )}

            {role === "sales" && (
              <>
                <li><Link to="/product/create">Skapa Produkt</Link></li>
                <li><Link to="/logout">Logga ut</Link></li>
              </>
            )}

            {role === "customer" && (
              <>
                <li><Link to="/myOrders">Mina ordrar</Link></li>
                <li><Link to="/logout">Logga ut</Link></li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;