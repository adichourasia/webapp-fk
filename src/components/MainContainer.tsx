import { PropsWithChildren, useEffect, useState } from "react";
import About from "./About";
import SkillsStack from "./SkillsStack";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Education from "./Education";
import Work from "./Work";
import TechnicalClubs from "./TechnicalClubs";
import CodeActivity from "./CodeActivity";
import Achievements from "./Achievements";
import setSplitText from "./utils/splitText";

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <Education />
            <SkillsStack />
            <Work />
            <TechnicalClubs />
            <CodeActivity />
            <Achievements />
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

