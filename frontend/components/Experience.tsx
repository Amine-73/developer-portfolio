const experiences = [
  {
    role: "Web Developer",
    company: "ADSGLORY",
    period: "2023 - 2026",
    description:
      "Worked on web development projects, automation scripts, data processing and frontend/backend features.",
  },
  {
    role: "Web Developer Intern",
    company: "Devium",
    period: "May 2023 - June 2023",
    description:
      "Built and improved user interfaces with HTML, CSS and JavaScript, fixed UX issues and integrated REST APIs.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-400 mb-3">04 — Experience</p>

        <h2 className="text-4xl font-bold mb-12">
          Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((experience) => (
            <div
              key={`${experience.company}-${experience.role}`}
              className="border-l border-white/20 pl-6"
            >
              <p className="text-sm text-gray-500 mb-2">
                {experience.period}
              </p>

              <h3 className="text-xl font-semibold">
                {experience.role}
              </h3>

              <p className="text-gray-300 mb-3">
                {experience.company}
              </p>

              <p className="text-gray-400 leading-7 max-w-2xl">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}