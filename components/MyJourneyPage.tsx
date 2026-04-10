import { Timeline } from "@/components/ui/timeline"; // Adjust import path if needed

export default function MyJourneyPage() {
  // 1. Create the array of data
  const timelineData = [
    {
      title: "Jan 2026 - Mar 2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-3">
            Working as SDE intern at <span className="font-semibold text-blue-500">Social Cults</span>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-4">
            <span className="font-semibold text-green-500">SwissGain MERN Stack Project:</span> Developed responsive and scalable frontend interfaces using React.js, built and integrated backend services using Node.js and Express.js, designed and managed MongoDB data models and APIs, implemented end-to-end features and integrations, and collaborated on debugging and optimization.

          </p>
          {/* You can even put images or other components in here! */}
        </div>
      ),
    },
    {
      title: "2024-2026",
      content: (
        <div>
           <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-2">
            Masters of Computer Application (MCA) from AKTU University.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-4">
            CGPA: 7.9/10
          </p>
        </div>
      ),
    },
    {
      title: "2021-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-2">
            Bachelors of Computer Application from CCSU Meerut.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-4">
            CGPA: 7.62/10
          </p>
        </div>
      ),
    },
  ];

  // 2. Pass it into the component
  return (
    <main className="w-full">
      <Timeline data={timelineData} />
    </main>
  );
}