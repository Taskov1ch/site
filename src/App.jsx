import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import RanksSection from "./components/RanksSection";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import WorldLoreSection from "./components/WorldLoreSection";
import RoadmapSection from "./components/RoadmapSection";
import FAQSection from "./components/FAQSection";
import TeamSection from "./components/TeamSection";

function App() {
  const [appIsLoading, setAppIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      console.log("All initial resources loaded!");
      setTimeout(() => {
        setAppIsLoading(false);
      }, 500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <>
      {/* <Navbar serverName={serverInfo.projectName} /> */}
      <main>
        <Preloader appIsLoading={appIsLoading} />
        <HeroSection />
        <WorldLoreSection /> {/* Новый блок Лор мира */}
        <RanksSection />
        <FAQSection /> {/* Новый блок FAQ */}
        <TeamSection /> {/* Новый блок Команды разработчиков */}
        <RoadmapSection /> {/* Новый блок Роадмапа */}
      </main>
      <Footer />
    </>
  );
}

export default App;
