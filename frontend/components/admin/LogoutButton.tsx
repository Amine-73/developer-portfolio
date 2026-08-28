"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const response = await fetch(
      "http://localhost:8000/api/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      setLoading(false);
      return;
    }

    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="border border-white/10 px-4 py-2 rounded-md text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}