import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string | null;
  github: string | null;
  demo: string | null;
  technologies: string[];
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const response = await fetch(
  `http://backend:8000/api/projects/${slug}`,
  {
    cache: "no-store",
  }
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }

  const project: Project = await response.json();

  
  if (!project) {
    notFound();
  }

  return (
  <main className="min-h-screen px-6 py-20 md:px-8 md:py-24">
    <div className="max-w-6xl mx-auto">

      {/* Back button */}
      <a
        href="/#projects"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition"
      >
        ← Back to projects
      </a>

      {/* Project header */}
      <div className="mt-12 max-w-4xl">
        <p className="text-sm text-gray-500 mb-4">
          Project
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          {project.title}
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-8 max-w-3xl">
          {project.description}
        </p>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mt-8">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="
              border border-white/10
              bg-white/[0.03]
              rounded-full
              px-4 py-2
              text-sm text-gray-300
            "
          >
            {technology}
          </span>
        ))}
      </div>

      {/* Project image */}
      <div
        className="
          group
          mt-12
          overflow-hidden
          rounded-2xl
          border border-white/10
          bg-white/[0.02]
        "
      >
        <div className="aspect-video">
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
      </div>

      {/* Project information */}
      <div className="grid md:grid-cols-[1fr_auto] gap-10 mt-12">

        {/* Description */}
        <div>
          <p className="text-sm text-gray-500 mb-3">
            About this project
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Overview
          </h2>

          <p className="text-gray-400 leading-8 max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex md:flex-col gap-3 md:min-w-40">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                border border-white/10
                rounded-md
                px-5 py-3
                text-sm
                text-center
                hover:bg-white/10
                transition
              "
            >
              View on GitHub
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                bg-white
                text-black
                rounded-md
                px-5 py-3
                text-sm
                font-medium
                text-center
                hover:bg-gray-200
                transition
              "
            >
              Live Demo
            </a>
          )}
        </div>

      </div>

    </div>
  </main>
);
}