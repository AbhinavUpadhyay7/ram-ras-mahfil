import { useEffect, useState } from "react";
import RamVisual from "./RamVisual";
import { devotionalQuotes } from "../data/bhajans";
import "./Hero.css";

export default function Hero() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex(
        (current) => (current + 1) % devotionalQuotes.length
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="home">

      {/* =====================================
          BACKGROUND GLOW
      ===================================== */}

      <div className="hero-circle circle-one"></div>
      <div className="hero-circle circle-two"></div>
      <div className="hero-glow"></div>


      {/* =====================================
          LEFT MAIN MESSAGE
      ===================================== */}

      <div className="hero-message">

        <div className="hero-overline">
          ॥ श्री राम जय राम जय जय राम ॥
        </div>

        <h1>
          हम रामजी के हैं,
          <span>रामजी हमारे हैं।</span>
        </h1>

        <div className="message-divider">
          <span></span>
          <span className="divider-diya">🪔</span>
          <span></span>
        </div>

      </div>


      {/* =====================================
          RIGHT RAM VISUAL
      ===================================== */}

      <div className="hero-visual">

        <RamVisual />

      </div>


      {/* =====================================
          CENTER WEBSITE TITLE
          IMPORTANT:
          This is independent from Ram image
      ===================================== */}

      <div className="ram-mahfil-title">

        <div className="mahfil-small">
          ॥ श्रीराम भक्ति ॥
        </div>

        <h2>
          राम रस
        </h2>

        <h3>
          महफिल
        </h3>

        <div className="mahfil-subtitle">
          भक्ति • भजन • प्रेम • श्रद्धा
        </div>

        <div className="mahfil-divider">

          <span></span>

          <span className="mahfil-diya">
            🪔
          </span>

          <span></span>

        </div>

      </div>


      {/* =====================================
          TOP RIGHT OM
      ===================================== */}

      <div className="visual-label">

        <span>ॐ</span>

        <small>
          श्रीराम
        </small>

      </div>


      {/* =====================================
          RIGHT SIDE VERTICAL MANTRA
      ===================================== */}

      <div className="side-mantra">

        <div className="side-line"></div>

        <div className="side-word">
          राम
        </div>

        <div className="side-items">
          <span>भक्ति</span>
          <span>प्रेम</span>
          <span>श्रद्धा</span>
        </div>

      </div>


      {/* =====================================
          BOTTOM MANTRA
      ===================================== */}

      <div className="bottom-mantra">

        <span>॥</span>

        श्री राम जय राम जय जय राम

        <span>॥</span>

      </div>


      {/* =====================================
          DIYA
      ===================================== */}

      <div className="corner-diya">

        <div className="flame"></div>

      </div>


      {/* =====================================
          HIDDEN ROTATING MESSAGE
          Kept for existing functionality
      ===================================== */}

      <div
        className="devotional-message"
        key={quoteIndex}
      >
        <strong>
          {devotionalQuotes[quoteIndex]?.main}
        </strong>

        <small>
          {devotionalQuotes[quoteIndex]?.sub}
        </small>
      </div>

    </section>
  );
}