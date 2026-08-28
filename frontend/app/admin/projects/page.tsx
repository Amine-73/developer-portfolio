"use client";
// pannel admin for Add / Edit / Delete
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";


type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  featured: boolean;
};

export default function AdminProjectsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function loadPage() {
      // 1. Check authentication
      const authResponse = await fetch(
        "http://localhost:8000/api/me",
        {
          credentials: "include",
        }
      );

      if (!authResponse.ok) {
        router.replace("/admin/login");
        return;
      }

      // 2. Fetch projects
      const projectsResponse = await fetch(
        "http://localhost:8000/api/projects"
      );

      const projectsData = await projectsResponse.json();

      setProjects(projectsData);

      // 3. Page is ready
      setLoading(false);
    }

    loadPage();
  }, [router]);


  if (loading) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <p>Checking authentication...</p>
    </main>
  );
  }

 

  return (
    <main className="min-h-screen px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Admin
            </p>

            <h1 className="text-4xl font-bold">
              Projects
            </h1>
          </div>

          <a
            href="/admin/projects/new"
            className="bg-white text-black px-5 py-3 rounded-md"
          >
            Add Project
          </a>
          <LogoutButton />
        </div>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-white/10 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {project.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  /projects/{project.slug}
                </p>
              </div>

              <div className="flex gap-3">
                <a
                  href={`/projects/${project.slug}`}
                  className="border border-white/10 px-4 py-2 rounded-md text-sm"
                >
                  View
                </a>

                <a
                  href={`/admin/projects/${project.slug}/edit`}
                  className="border border-white/10 px-4 py-2 rounded-md text-sm"
                >
                  Edit
                </a>

                <DeleteProjectButton slug={project.slug}  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}