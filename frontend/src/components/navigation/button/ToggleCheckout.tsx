import { useState } from "react";

function Checkout() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`checkout-container ${expanded ? "expanded" : "collapsed"}`}>
      <button
        className="checkout-toggle"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "▼" : "▲"}
      </button>

      <div className="checkout-content">
        {/* Din varukorg och totalsumma */}
      </div>
    </div>
  );
}

export default Checkout();