// import { projects } from "@/data/projects";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
};


export default async function Projects() {

  const response = await fetch(
  "http://backend:8000/api/projects",
  {
    cache: "no-store",
  }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  

const projects: Project[] = await response.json();
  return (
    <section id="projects" className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-400 mb-3">03 — Projects</p>

        <h2 className="text-4xl font-bold mb-12">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article
              key={project.id}
              className="
                group
                border border-white/10
                rounded-xl
                p-6
                bg-white/[0.02]
                hover:bg-white/[0.04]
                hover:border-white/20
                hover:-translate-y-1
                transition-all
                duration-300
            "
            >
              <div className="h-40 bg-white/5 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
            <span className="text-gray-600 text-sm">
                Project Preview
            </span>
            </div>

              <h3 className="text-xl font-semibold mb-3">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-7 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="text-xs border border-white/10 rounded-md px-3 py-1"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                 <Link
                  href={`/projects/${project.slug}`}
                  className="border border-white/10 rounded-md px-4 py-2 text-sm hover:bg-white/10 transition"
                >
                  View Details
                </Link>
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    border border-white/10
                    rounded-md
                    px-4 py-2
                    text-sm
                    hover:bg-white/10
                    transition
                    "
                >
                    GitHub
                </a>

                <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    bg-white
                    text-black
                    rounded-md
                    px-4 py-2
                    text-sm
                    font-medium
                    hover:bg-gray-200
                    transition
                    "
                >
                    Live Demo
                </a>
                </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}