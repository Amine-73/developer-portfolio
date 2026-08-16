const skillGroups = [
  {
    title: "Frontend",
    skills: ["JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "PHP", "REST APIs"],
  },
  {
    title: "Database",
    skills: ["MySQL", "MongoDB"],
  },
  {
    title: "Cloud / DevOps",
    skills: ["AWS", "Docker", "Git", "GitHub","linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-400 mb-3">02 — Skills</p>

        <h2 className="text-4xl font-bold mb-12">
          Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="
                border border-white/10
                rounded-xl
                p-6
                bg-white/[0.02]
                hover:border-white/20
                transition-all
                duration-300
                "
            >
              <h3 className="text-sm uppercase tracking-wider mb-5">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                        border border-white/10
                        bg-white/5
                        rounded-md
                        px-3
                        py-2
                        text-sm
                        text-gray-300
                        hover:text-white
                        hover:border-white/30
                        transition
                    "
                    >
                    {skill}
                    </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}