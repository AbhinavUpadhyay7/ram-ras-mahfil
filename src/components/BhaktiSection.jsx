import "./BhaktiSection.css";

const cards = [
  {
    icon: "🪔",
    title: "भक्ति",
    text: "मन को कुछ पल संसार से हटाकर प्रभु के चरणों में रख दीजिए।",
  },
  {
    icon: "❤️",
    title: "प्रेम",
    text: "राम नाम केवल शब्द नहीं, हृदय से जुड़ा हुआ एक भाव है।",
  },
  {
    icon: "🙏",
    title: "विश्वास",
    text: "जहाँ विश्वास है, वहाँ रास्ता स्वयं प्रभु दिखाते हैं।",
  },
];

export default function BhaktiSection() {
  return (
    <section
      className="bhakti-section"
      id="bhakti"
    >

      <div className="section-heading">

        <div className="section-eyebrow">
          ॥ भक्ति का भाव ॥
        </div>

        <h2>
          कुछ पल
          <span>रामजी के नाम</span>
        </h2>

        <p>
          दुनिया की भागदौड़ से थोड़ा दूर,
          अपने मन के पास और प्रभु के करीब।
        </p>

      </div>


      <div className="bhakti-grid">

        {cards.map((card, index) => (

          <article
            className="bhakti-card"
            key={card.title}
          >

            <div className="card-number">
              0{index + 1}
            </div>

            <div className="card-icon">
              {card.icon}
            </div>

            <h3>
              {card.title}
            </h3>

            <p>
              {card.text}
            </p>

            <div className="card-line"></div>

          </article>

        ))}

      </div>

    </section>
  );
}