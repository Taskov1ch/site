import React from 'react';
import { useInView } from 'react-intersection-observer';
import { teamMembers } from '../teamData';
import '../styles/TeamSection.css';

const TeamMemberCard = ({ member, isVisible, delay }) => {
  return (
    <div
      className={`team-member-card scroll-animate fade-in-up ${
        isVisible ? `is-visible ${delay}` : ''
      }`}
    >
      <div className="team-member-avatar-container">
        <img src={member.avatar} alt={`Аватар ${member.nickname}`} className="team-member-avatar" />
      </div>
      <h3 className="team-member-nickname">{member.nickname}</h3>
      <p className="team-member-role">{member.role}</p>
      <blockquote className="team-member-comment">"{member.comment}"</blockquote>
      <div className="team-member-socials">
        {member.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-link social-link-${link.platform.toLowerCase()}`}
            title={link.platform}
            aria-label={`Ссылка на ${link.platform} пользователя ${member.nickname}`}
          >
            {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          </a>
        ))}
      </div>
    </div>
  );
};

const TeamSection = () => {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="team" className="team-section" ref={sectionRef}>
      <div className="container team-container">
        <h2
          className={`section-title team-title scroll-animate fade-in-up ${
            sectionIsVisible ? 'is-visible' : ''
          }`}
        >
          Команда Разработчиков
        </h2>
        {teamMembers.length > 0 ? (
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                isVisible={sectionIsVisible}
                delay={`delay-${(index % 3) * 200 + 200}ms`}
              />
            ))}
          </div>
        ) : (
          <p className={`scroll-animate fade-in ${sectionIsVisible ? 'is-visible delay-200ms' : ''}`}>
            Информация о команде появится здесь в ближайшее время...
          </p>
        )}
      </div>
    </section>
  );
};

export default TeamSection;