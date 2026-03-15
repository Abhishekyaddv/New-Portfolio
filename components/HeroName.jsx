import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import ThemeToggle from "./ThemeToggle";

const HeroName = () => {
  return (
    <div className="mx-auto max-w-5xl py-12 text-center md:py-20 ">
      <div className="theme-heading text-4xl font-bold leading-tight md:text-6xl">
        <LayoutTextFlip 
          text="Hey i'm Abhishek, a "
          words={["Full Stack Developer", "UI/UX Designer", "Tech Enthusiast"]}
          duration={3000}
        />
       
      </div>
       <p className="theme-copy mx-auto mt-6 max-w-2xl text-sm leading-7 md:text-base">
        I build polished web products with modern frontend systems, reliable backend flows,
        and interfaces that feel deliberate in motion and detail.
      </p>
      
      
    </div>
  );
};

export default HeroName;