import { useEffect, useState } from "react";

import {
  devotionalQuotes,
} from "../data/bhajans";

import "./QuoteSection.css";

export default function QuoteSection() {

  const [index, setIndex] =
    useState(0);

  useEffect(() => {

    const timer =
      setInterval(() => {

        setIndex(
          current =>
            (current + 1) %
            devotionalQuotes.length
        );

      }, 4500);

    return () =>
      clearInterval(timer);

  }, []);

  return (

    <section className="quote-section">

      <div className="quote-background">
        राम
      </div>

      <div className="quote-content-large">

        <div className="quote-small">
          ॥ राम नाम ॥
        </div>

        <div
          className="large-quote"
          key={index}
        >
          “
          {devotionalQuotes[index].text}
        </div>

        <p>
          {devotionalQuotes[index].sub}
        </p>

        <div className="quote-divider">
          <span></span>
          🪔
          <span></span>
        </div>

        <div className="jai-ram">
          जय श्री राम
        </div>

      </div>

    </section>
  );
}