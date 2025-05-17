import React from "react";
import HeroSection from "./components/HeroSection";
import RanksSection from "./components/RanksSection";
import Footer from "./components/Footer";

function App() {

  React.useEffect(() => {
  }, []);

  return (
    <>
      {/* <Navbar serverName={serverInfo.projectName} /> */}
      <main>
        <HeroSection />
        <RanksSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
