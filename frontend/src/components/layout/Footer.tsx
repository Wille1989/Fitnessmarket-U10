import '../../css/layout/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} FitnessMarket. Alla rättigheter förbehållna.</p>
    </footer>
  );
}

export default Footer;