type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  github: string | null;
  demo: string | null;
  featured: boolean;
  technologies: string[];
};

async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    "http://backend:8000/api/projects",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export default async function Projects() {
  const projects = await getProjects();

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  return (
    <section
      id="projects"
      className="px-6 py-24 md:px-8"
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-12">
          <p className="text-sm text-gray-500 mb-3">
            Selected work
          </p>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Featured Projects
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl leading-7">
            A selection of projects I have built using modern
            web technologies and development practices.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="
                group
                overflow-hidden
                rounded-2xl
                border border-white/10
                bg-white/[0.02]
                hover:border-white/20
                transition
              "
            >

              {/* Project image */}
              <a
                href={`/projects/${project.slug}`}
                className="block overflow-hidden"
              >
                <div className="aspect-video bg-white/[0.03]">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={`${project.title} project preview`}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-600 text-sm">
                        Project Preview
                      </span>
                    </div>
                  )}
                </div>
              </a>

              {/* Project content */}
              <div className="p-6">

                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">
                    {project.title}
                  </h3>

                  <a
                    href={`/projects/${project.slug}`}
                    className="
                      text-gray-500
                      group-hover:text-white
                      transition
                      text-lg
                    "
                    aria-label={`View ${project.title} details`}
                  >
                    ↗
                  </a>
                </div>

                <p className="text-gray-400 text-sm leading-7 mt-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full
                        border border-white/10
                        bg-white/[0.03]
                        px-3 py-1.5
                        text-xs
                        text-gray-300
                      "
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-3 mt-6">

                  <a
                    href={`/projects/${project.slug}`}
                    className="
                      rounded-md
                      bg-white
                      text-black
                      px-4 py-2.5
                      text-sm
                      font-medium
                      hover:bg-gray-200
                      transition
                    "
                  >
                    View Project
                  </a>

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-md
                        border border-white/10
                        px-4 py-2.5
                        text-sm
                        hover:bg-white/10
                        transition
                      "
                    >
                      GitHub
                    </a>
                  )}

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        rounded-md
                        border border-white/10
                        px-4 py-2.5
                        text-sm
                        hover:bg-white/10
                        transition
                      "
                    >
                      Live Demo
                    </a>
                  )}

                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}