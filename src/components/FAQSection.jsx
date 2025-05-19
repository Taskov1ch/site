import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import { faqData } from "../faqData";
import "../styles/FAQSection.css";

const FAQItem = ({ item, index, sectionIsVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const delayClass = `delay-${(index % 4) * 150 + 200}ms`;

  return (
    <li
      className={`faq-item scroll-animate fade-in-up ${
        sectionIsVisible ? `is-visible ${delayClass}` : ""
      }`}
    >
      <button
        className="faq-question"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
      >
        <span className="faq-question-text">{item.question}</span>
        <span className={`faq-icon ${isOpen ? "open" : ""}`}>{isOpen ? "−" : "+"}</span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="faq-answer-content">
          <p dangerouslySetInnerHTML={{ __html: item.answer }} />
        </div>
      </div>
    </li>
  );
};

const FAQSection = () => {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="faq" className="faq-section" ref={sectionRef}>
      <div className="container faq-container">
        <h2
          className={`section-title faq-title scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible" : ""
          }`}
        >
          Часто Задаваемые Вопросы
        </h2>
        <ul className="faq-list">
          {faqData.map((item, index) => (
            <FAQItem
              key={item.id}
              item={item}
              index={index}
              sectionIsVisible={sectionIsVisible}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQSection;
