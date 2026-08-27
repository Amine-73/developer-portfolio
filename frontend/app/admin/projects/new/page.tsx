import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen px-8 py-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-gray-500 mb-2">
          Admin / Projects
        </p>

        <h1 className="text-4xl font-bold mb-10">
          Add Project
        </h1>

        <ProjectForm />
      </div>
    </main>
  );
}