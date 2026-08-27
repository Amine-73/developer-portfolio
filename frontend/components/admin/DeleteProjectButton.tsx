"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteProjectButtonProps = {
  slug: string;
};

export default function DeleteProjectButton({
  slug,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/projects/${slug}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      router.refresh();
    } catch {
      alert("Something went wrong while deleting the project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{cursor:"pointer"}}
      disabled={loading}
      className="border border-red-500/30 px-4 py-2 rounded-md text-sm cursor-pointer disabled:opacity-50"  
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}