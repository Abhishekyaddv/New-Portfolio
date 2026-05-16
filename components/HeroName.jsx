import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import ThemeToggle from "./ThemeToggle";

const HeroName = () => {
  return (
    <div className="mx-auto max-w-5xl py-12 text-center md:py-20 ">
      <div className="theme-heading text-4xl font-bold leading-tight md:text-6xl">
        <LayoutTextFlip 
          text="Hey i'm Abhishek, a "
          words={["Full Stack Developer", "UI/UX Designer", "Software Engineer"]}
          duration={3000}
        />
       
      </div>
      
      
    </div>
  );
};

export default HeroName;