export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-[85vh] flex items-center px-8 py-20"
    >
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-gray-400 mb-4">
            Available for new opportunities
          </p>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Hi, I&apos;m Amine
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-6">
            Full Stack Web Developer
          </h2>

          <p className="text-gray-400 text-lg leading-8 max-w-xl mb-8">
            I build modern and scalable web applications with a focus on clean
            interfaces, reliable APIs, automation and cloud technologies.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#projects"
              className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition"
            >
              View Projects
            </a>

            <a
              href="/Resume_A_C.pdf"
              className="border border-white/20 px-6 py-3 rounded-md font-medium hover:bg-white/10 transition"
            >
              Download CV
            </a>
          </div>

          <div className="flex gap-5 text-sm text-gray-400">
            <a href="https://github.com/Amine-73" className="hover:text-white transition">
              GitHub
            </a>

            <a href="https://linkedin.com/in/amine-channa" className="hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hidden lg:flex justify-center">
          <div className="w-full max-w-md border border-white/10 rounded-xl bg-white/5 p-6">
            <div className="flex gap-2 mb-6">
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
              <span className="w-3 h-3 rounded-full bg-white/20" />
            </div>

            <pre className="text-sm text-gray-300 whitespace-pre-wrap">
{`const developer = {
  name: "Amine",
  role: "Full Stack Developer",
  skills: [
    "Next.js",
    "PHP",
    "Docker",
    "AWS"
  ],
  passion: "Building useful products"
};`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}