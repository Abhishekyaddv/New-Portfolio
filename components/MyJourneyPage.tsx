import { Timeline } from "@/components/ui/timeline"; // Adjust import path if needed

export default function MyJourneyPage() {
  // 1. Create the array of data
  const timelineData = [
    {
      title: "May 2026 - Present",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-3">
            Working as Sr.Backend Intern at <span className="font-semibold text-blue-500">Fidore Health</span>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-4">
            <span className="font-semibold text-green-500">Fidore Health </span> 
            <ul className="list-disc list-inside">
              <li>Developed Inhouse CRM and Dashboard for Company From Scratch Using Laravel and React.</li>
              <li>Optimized the application to improve loading performance and page load speeds.</li>
              <li>Reduced query time for database operations by 40% using filtering and indexing.</li>
            </ul>
          </p>
          {/* You can even put images or other components in here! */}
        </div>
      ),
    },
    {
      title: "Jan 2026 - Mar 2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-3">
            Worked as Full-Stack Intern at <span className="font-semibold text-blue-500">Social Cults</span>.
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
            Masters of Computer Application (MCA) from <span className="font-semibold text-blue-500">Harlal Institue of Management and Technology, Greater Noida</span>.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base leading-relaxed font-normal mb-4">
            SCGPA: 7.9/10
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
            SCGPA: 7.62/10
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