"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
  technologies: string[];
};

type ProjectFormProps = {
  project?: Project;
};


export default function ProjectForm({
  project,
}: ProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(project); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const technologies = String(form.get("technologies"))
      .split(",")
      .map((technology) => technology.trim())
      .filter(Boolean);

    const projectData = {
      title: form.get("title"),
      slug: form.get("slug"),
      description: form.get("description"),
      github: form.get("github"),
      demo: form.get("demo"),
      featured: form.get("featured") === "on",
      technologies,
    };

    try {
      const url = isEditing
        ? `http://localhost:8000/api/projects/${project!.slug}`
        : "http://localhost:8000/api/projects";

    const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
        });

    if (!response.ok) {
    throw new Error(
        isEditing
        ? "Failed to update project"
        : "Failed to create project"
    );
    }

      router.push("/admin/projects");
      router.refresh();
    } catch {
    setError(
        isEditing
        ? "Something went wrong while updating the project."
        : "Something went wrong while creating the project."
    );
    }finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block mb-2">
          Title
        </label>

        <input
        name="title"
        required
        defaultValue={project?.title ?? ""}
        className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Slug
        </label>

        <input
        name="slug"
        required
        disabled={isEditing}
        defaultValue={project?.slug ?? ""}
        className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3 disabled:opacity-50"
        />
      </div>

      <div>
        <label className="block mb-2">
          Description
        </label>

        <textarea
        name="description"
        required
        rows={5}
        defaultValue={project?.description ?? ""}
        className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Technologies
        </label>

        <input
          name="technologies"
          defaultValue={project?.technologies.join(", ") ?? ""}
          placeholder="Next.js, PHP, MySQL, Docker"
          className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3"
        />

        <p className="text-xs text-gray-500 mt-2">
          Separate technologies with commas.
        </p>
      </div>

      <div>
        <label className="block mb-2">
          GitHub URL
        </label>

        <input
          name="github"
          defaultValue={project?.github ?? ""}
          type="url"
          className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3"
        />
      </div>

      <div>
        <label className="block mb-2">
          Live Demo URL
        </label>

        <input
          name="demo"
          defaultValue={project?.demo ?? ""}
          type="url"
          className="w-full border border-white/10 bg-white/[0.02] rounded-md px-4 py-3"
        />
      </div>

      <label className="flex items-center gap-3">
        <input
        name="featured"
        type="checkbox"
        defaultChecked={project?.featured ?? false}
        />

        Featured project
      </label>

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-white text-black px-6 py-3 rounded-md disabled:opacity-50"
      >
        {loading
        ? isEditing
        ? "Updating..."
        : "Creating..."
        : isEditing
        ? "Update Project"
        : "Create Project"}
      </button>
    </form>
  );
}