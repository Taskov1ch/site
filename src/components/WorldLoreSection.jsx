import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/WorldLoreSection.css";
import ObfuscatedText from "./ObfuscatedText";

const WorldLoreSection = () => {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  let currentDelay = 0;
  const delayIncrement = 300; // мс

  return (
    <section id="world-lore" className="world-lore-section" ref={sectionRef}>
      <div className="container world-lore-container">
        <h2
          className="section-title world-lore-title"
        >
          <ObfuscatedText
            text={'Лор мира'}
            start={sectionIsVisible}
            delay={currentDelay}
            speed={80}
          />
        </h2>
        <div
          className={`world-lore-content scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible delay-400ms" : ""
          }`}
        >
          <p
            className={`scroll-animate fade-in-up ${
              sectionIsVisible ? "is-visible delay-600ms" : ""
            }`}
          >
            Когда-то мир сиял светом Эмбры — первородного пламени, дарующего
            разум, форму и надежду. Народы процветали, и время шло прямым, ясным
            путём. Но всё изменилось, когда Пламя угасло. Эмбра потухла — никто
            не знает почему. Некоторые шепчут о грехе древних богов, другие
            винят песнь Смерти, прозвучавшую из-за пределов Бездны. Мир начал
            гнить. Континенты рассыпались в пыль. Цивилизации рухнули. Осталась
            только пепельная скорлупа, забытая самим временем. Здесь, среди руин
            и теней, — родились Земли Забвения. Земли Забвения — не просто
            физическое место. Это ловушка между жизнью и смертью, застывшая в
            вечной агонии. Души павших не уходят — они перерождаются. Но с
            каждым новым витком теряют часть себя. Игроки — это Заблудшие. Те,
            чьи души отказались исчезнуть, но не нашли покоя. Они пробуждаются в
            забытых залах мира и вынуждены сражаться, чтобы не раствориться в
            Ничто.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WorldLoreSection;
