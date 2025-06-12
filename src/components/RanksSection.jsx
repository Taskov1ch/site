import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import RankSlide from "./RankSlide";
import { ranks } from "../ranksData";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/RanksSection.css";
import ObfuscatedText from "./ObfuscatedText";

const SWIPER_ANIMATION_SPEED = 300;
const BACKGROUND_FADE_DURATION = 500;

const getDarkenedBackgroundImage = (imageUrl) => {
  if (!imageUrl) return "none";
  return `linear-gradient(rgba(24, 18, 18, 0.8), rgba(0, 0, 0, 0.8)), url(${imageUrl})`;
};

function RanksSection() {
  const { ref: sectionRef, inView: sectionIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [bgLayer1, setBgLayer1] = useState({ url: "", opacity: 0, zIndex: 1 });
  const [bgLayer2, setBgLayer2] = useState({ url: "", opacity: 0, zIndex: 1 });
  const [isLayer1Active, setIsLayer1Active] = useState(true);
  const [isSlidingCooldown, setIsSlidingCooldown] = useState(false);
  const cooldownTimerRef = useRef(null);
  const SLIDE_COOLDOWN_DURATION =
    Math.max(SWIPER_ANIMATION_SPEED, BACKGROUND_FADE_DURATION) + 200;

  useEffect(() => {
    if (ranks.length > 0 && ranks[0].backgroundImage) {
      setBgLayer1({ url: ranks[0].backgroundImage, opacity: 1, zIndex: 2 });
      setBgLayer2({ url: "", opacity: 0, zIndex: 1 });
      setIsLayer1Active(true);
    }
  }, []);

  const handleSlideChange = (swiper) => {
    const currentRankIndex = swiper.realIndex;
    const newBgUrl = ranks[currentRankIndex]?.backgroundImage;
    if (!newBgUrl) return;
    if (isLayer1Active) {
      if (newBgUrl !== bgLayer1.url) {
        setBgLayer2({ url: newBgUrl, opacity: 1, zIndex: 2 });
        setBgLayer1((prev) => ({ ...prev, opacity: 0, zIndex: 1 }));
        setIsLayer1Active(false);
      }
    } else {
      if (newBgUrl !== bgLayer2.url) {
        setBgLayer1({ url: newBgUrl, opacity: 1, zIndex: 2 });
        setBgLayer2((prev) => ({ ...prev, opacity: 0, zIndex: 1 }));
        setIsLayer1Active(true);
      }
    }
  };

  if (!ranks || ranks.length === 0) {
    return (
      <section id="ranks" className="ranks-section">
        <p>Ранги скоро появятся!</p>
      </section>
    );
  }

  let currentDelay = 0;
  const delayIncrement = 300; // мс

  return (
    <section id="ranks" className="ranks-section" ref={sectionRef}>
      <div className="ranks-background-fader">
        {/* <div
          className="ranks-background-image"
          style={{
            backgroundImage: getDarkenedBackgroundImage(bgLayer1.url),
            opacity: bgLayer1.opacity,
            zIndex: bgLayer1.zIndex,
            transitionDuration: `${BACKGROUND_FADE_DURATION}ms`,
          }}
        />
        <div
          className="ranks-background-image"
          style={{
            backgroundImage: getDarkenedBackgroundImage(bgLayer2.url),
            opacity: bgLayer2.opacity,
            zIndex: bgLayer2.zIndex,
            transitionDuration: `${BACKGROUND_FADE_DURATION}ms`,
          }}
        /> */}
      </div>

      <div className="container ranks-section-container">
        <h2
          className="section-title">
          <ObfuscatedText
            text={'Ранги сервера'}
            start={sectionIsVisible}
            delay={currentDelay}
            speed={60}
          />
        </h2>
        <Swiper
          modules={[Pagination]}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          speed={SWIPER_ANIMATION_SPEED}
          grabCursor={!isSlidingCooldown}
          allowTouchMove={!isSlidingCooldown}
          pagination={{ clickable: true }}
          className={`ranks-swiper ${
            isSlidingCooldown ? "swiper-cooldown" : ""
          } scroll-animate fade-in-up ${
            sectionIsVisible ? "is-visible delay-400ms" : ""
          }`}
          style={{ "--swiper-speed": `${SWIPER_ANIMATION_SPEED}ms` }}
          onSlideChangeTransitionStart={handleSlideChange}
          watchSlidesProgress
        >
          {ranks.map((rank) => (
            <SwiperSlide key={rank.id} className="rank-swiper-slide">
              <RankSlide rank={rank} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default RanksSection;
