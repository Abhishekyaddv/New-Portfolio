
import About from "@/components/About";
import Footer from "@/components/Footer";
import HeroName from "@/components/HeroName";
import MyJourneyPage from "@/components/MyJourneyPage";
import { Nav } from "@/components/Nav";
import Projects from "@/components/Projects";


export default function Home() {
  return (
    <>
      <Nav />
      <HeroName />
      <About />
      <Projects />
      <MyJourneyPage />
      <Footer />

    </>
  );
}
