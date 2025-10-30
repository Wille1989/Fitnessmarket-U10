import '../../css/layout/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} <i>Food</i>Market. Alla rättigheter förbehållna.</p>
    </footer>
  );
}

export default Footer;