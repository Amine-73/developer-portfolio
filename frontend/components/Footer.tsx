export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center">
        <p className="font-semibold">
          {"<Amine_73/>"}
        </p>

        <p className="text-sm text-gray-500">
          © 2026 Amine. Built with Next.js.
        </p>

        <div className="flex gap-5 text-sm text-gray-400">
          <a href="https://github.com/Amine-73" target="_blank">
            GitHub
          </a>

          <a href="https://linkedin.com/in/amine-channa" target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}