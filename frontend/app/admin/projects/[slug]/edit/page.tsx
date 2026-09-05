import ProjectForm from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

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

type EditProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
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

  return (
    <main className="min-h-screen px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-2">
          Admin / Projects
        </p>

        <h1 className="text-4xl font-bold mb-10">
          Edit Project
        </h1>

        <ProjectForm project={project} />
      </div>
    </main>
  );
}
