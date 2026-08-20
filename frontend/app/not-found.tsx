import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-8">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-4">
          404
        </p>

        <h1 className="text-5xl font-bold mb-5">
          Page not found
        </h1>

        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page or project you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-md hover:bg-gray-200 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}