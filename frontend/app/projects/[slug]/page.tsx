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
    <main className="min-h-screen px-8 py-24">
      <div className="max-w-5xl mx-auto">
        <a
          href="/#projects"
          className="text-sm text-gray-400 hover:text-white transition"
        >
          ← Back to projects
        </a>

        <div className="mt-10">
          <h1 className="text-5xl font-bold mb-6">
            {project.title}
          </h1>

          <p className="text-gray-400 text-lg leading-8 max-w-3xl mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="border border-white/10 rounded-md px-3 py-2 text-sm"
              >
                {technology}
              </span>
            ))}
          </div>

          <div className="h-80 border border-white/10 bg-white/[0.02] rounded-xl flex items-center justify-center mb-10">
            {project.image_url ? (
              
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-gray-600 text-sm">Project Preview</span>
                )}
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/10 px-5 py-3 rounded-md hover:bg-white/10 transition"
              >
                GitHub
              </a>
            )}

             {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-5 py-3 rounded-md hover:bg-gray-200 transition"
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