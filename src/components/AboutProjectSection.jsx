import React from "react";
import { useInView } from "react-intersection-observer";
import "../styles/AboutProjectSection.css";

const AboutProjectSection = () => {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.08, // Немного раньше для срабатывания анимаций
  });

  // Для задержек анимации элементов списка
  const listAnimationDelayBase = 500;
  const listAnimationDelayIncrement = 100;

  return (
    <section id="about-project" className="about-project-section" ref={sectionRef}>
      <div className="container about-project-container">
        <h2
          className={`section-title about-project-title scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible delay-200ms" : ""
          }`}
        >
          О Проекте "Aurion"
        </h2>
        <div
          className={`about-project-content scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible delay-350ms" : "" // Небольшая задержка после заголовка
          }`}
        >
          <p>

          </p>
          <p>
  "Aurion" — это PvP-сервер Minecraft Bedrock с уклоном в тёмное фэнтези, где каждый бой становится частью великой истории. Здесь нет привычного выживания или скучного фарма — игроки сражаются за славу, ранги и звания в опасном и таинственном мире, известном как Земли Забвения. От дуэлей 1v1 до хаотичных FFA-схваток, каждое сражение здесь — это проверка воли, реакции и мастерства.
</p>

          <h3
            className={`about-project-subtitle scroll-animate fade-in-up ${
              sectionIsVisible ? `is-visible delay-${listAnimationDelayBase - 100}ms` : ""
            }`}
          >
            Ключевые особенности нашего мира:
          </h3>
          <ul>
            {[
    { text: "PvP в центре внимания: дуэли, арены 2v2, FFA и уникальные режимы с рейтингами и сезонной системой." },
    { text: "Атмосферный лор: каждая локация, титул и ранг — часть мрачной легенды Земель Забвения." },
    { text: "Система рангов: от Заблудших до Сущности Конца — путь славы и проклятий отражается в облике и статусе игрока." },
    { text: "Коллекционные титулы и косметика: визуальное самовыражение без нарушения игрового баланса." },
    { text: "Без P2W: За реальные деньги вы не купите победу. В Aurion всё строится на честных боях." },
    { text: "Сайт с личным кабинетом, профилем, кастомным титулом и рейтингом игроков." },
  ].map((item, index) => (
              <li
                key={index}
                className={`scroll-animate fade-in-up ${
                  sectionIsVisible ? `is-visible delay-${listAnimationDelayBase + index * listAnimationDelayIncrement}ms` : ""
                }`}
              >
                {item.text}
              </li>
            ))}
          </ul>
          <p className={`scroll-animate fade-in-up ${sectionIsVisible ? `is-visible delay-${listAnimationDelayBase + 6 * listAnimationDelayIncrement}ms` : ""}`}>
            Мы верим, что "Aurion" станет местом, где каждый игрок сможет написать свою собственную главу в истории Земель Забвения.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutProjectSection;