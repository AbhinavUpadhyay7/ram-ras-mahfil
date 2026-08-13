import "./Navbar.css";


export default function Navbar() {

  return (

    <header className="navbar">

      {/* BRAND */}

      <div className="nav-brand">

        <div className="nav-emblem">
          🪔
        </div>


        <div className="brand-content">

          <div className="brand-name">
            रामजी के
          </div>

          <div className="brand-tagline">
            हम रामजी के हैं • रामजी हमारे हैं
          </div>

        </div>

      </div>


      {/* CENTER */}

      <div className="nav-center">

        <span className="nav-symbol">
          ॥
        </span>

        <span className="nav-title">
          श्री राम जय राम
        </span>

        <span className="nav-symbol">
          ॥
        </span>

      </div>


      {/* RIGHT */}

      <div className="nav-right">

        <div className="nav-status">

          <span className="status-dot"></span>

          भक्ति संगीत

        </div>


        <div className="om-symbol">
          ॐ
        </div>

      </div>

    </header>

  );

}