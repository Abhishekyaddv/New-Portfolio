import { Timeline } from "@/components/ui/timeline"; // Adjust import path if needed

export default function MyJourneyPage() {
  // 1. Create the array of data
  const timelineData = [
    {
      title: "Present",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-8">
            Working as SDE intern at <span className="font-bold text-blue-500 text-2xl">Social Cults</span>
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
            SwissGain <span className="font-bold text-green-500">MERN Stack Project </span>
              Developed responsive and scalable frontend interfaces using React.js, focusing on clean UI/UX and performance.
            Built and integrated backend services using Node.js and Express.js.
            Designed and managed application data using MongoDB, ensuring efficient data modeling and API performance.
            Implemented end-to-end features, API integrations, and handled state management across the application.
            Collaborated on debugging, optimization, and improving overall application stability.

          </p>
          {/* You can even put images or other components in here! */}
        </div>
      ),
    },
    {
      title: "2024-2026",
      content: (
        <div>
           <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
            Masters of Computer Application (MCA) from AKTU University.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
            CGPA: 7.9/10
          </p>
        </div>
      ),
    },
    {
      title: "2021-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
            Bachelors of Computer Application from CCSU Meerut.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-lg font-normal mb-4">
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