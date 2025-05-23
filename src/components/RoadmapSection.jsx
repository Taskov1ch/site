import React from "react";
import { useInView } from "react-intersection-observer";
import { roadmapItems, STATUS_TYPES } from "../roadMap";
import "../styles/RoadmapSection.css";

const StatusIcon = ({ status }) => {
  switch (status) {
    case STATUS_TYPES.READY:
      return <span className="roadmap-icon status-ready">✓</span>;
    case STATUS_TYPES.PAUSED:
      return <span className="roadmap-icon status-paused">⏸</span>;
    case STATUS_TYPES.IN_PROGRESS:
      return <div className="roadmap-icon status-in-progress spinner"></div>;
    case STATUS_TYPES.PLANNED:
      return <span className="roadmap-icon status-planned">📅</span>;
    default:
      return <span className="roadmap-icon">?</span>;
  }
};

const RoadmapSection = () => {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  });

  return (
    <section id="roadmap" className="roadmap-section" ref={sectionRef}>
      <div className="container roadmap-container">
        <h2
          className={`section-title roadmap-title scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible" : ""
          }`}
        >
          Дорожная Карта
        </h2>
        <ul className="roadmap-list">
          {roadmapItems.map((item, index) => {
            const statusSlug = item.status.replace(/\s+/g, "-").toLowerCase();

            return (
              <li
                key={item.id}
                className={
                  `roadmap-item status-border-${statusSlug}` +
                  ` scroll-animate fade-in-up ${
                    sectionIsVisible
                      ? `is-visible delay-200ms`
                      : ""
                  }`
                }
              >
                <StatusIcon status={item.status} />
                <span className="roadmap-item-title">{item.title}</span>
                <span
                  className={`roadmap-item-status-text status-text-${statusSlug}`}
                >
                  ({item.status})
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default RoadmapSection;
