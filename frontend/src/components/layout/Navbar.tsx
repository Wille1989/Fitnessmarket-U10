import { Link } from "react-router-dom";
import '../../css/layout/Navbar.css';
import { getDecodedToken } from "../../middleware/JwtDecode";

function Navbar() {
  const decoded = getDecodedToken();

  const role = decoded?.role || "guest";

  return (
    <nav className="navbar">
      <div className="navbar-logo">FitnessMarket</div>
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
            <li><Link to="/order">Ordrar</Link></li>
            <li><Link to="/admin/users">Användare</Link></li>
            <li><Link to="/product/create">Skapa Produkt</Link></li>
            <li><Link to="/logout">Logga ut</Link></li>
          </>
        )}

        {role === "sales" && (
          <>
            <li><Link to="/order">Skapa Produkt</Link></li>
            <li><Link to="/logout">Logga ut</Link></li>
          </>
        )}
   
      </ul>
    </nav>
  );
}

export default Navbar;