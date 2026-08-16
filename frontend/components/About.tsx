export default function About() {
  return (
    <section id="about" className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-400 mb-3">01 — About</p>

        <h2 className="text-4xl font-bold mb-12">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-gray-400 leading-8">
            <p className="mb-6">
              I&apos;m a web developer focused on building modern and
              maintainable applications.
            </p>

            <p>
              I enjoy working across frontend, backend, automation and cloud
              technologies, and I continuously improve my skills through real
              projects and practical learning.
            </p>
          </div>

          <div className="space-y-4">
            <div className="
                border border-white/10
                rounded-xl
                p-6
                bg-white/[0.02]
                hover:bg-white/[0.05]
                hover:border-white/20
                transition-all
                duration-300
                ">
              <h3 className="font-semibold text-lg mb-2">
                Web Development
              </h3>
              <p className="text-gray-400">
                Building responsive applications with modern frontend and
                backend technologies.
              </p>
            </div>

            <div className="
                border border-white/10
                rounded-xl
                p-6
                bg-white/[0.02]
                hover:bg-white/[0.05]
                hover:border-white/20
                transition-all
                duration-300
                ">
              <h3 className="font-semibold text-lg mb-2">
                Automation
              </h3>
              <p className="text-gray-400">
                Creating scripts and workflows that reduce repetitive work.
              </p>
            </div>

            <div className="
                border border-white/10
                rounded-xl
                p-6
                bg-white/[0.02]
                hover:bg-white/[0.05]
                hover:border-white/20
                transition-all
                duration-300
                ">
              <h3 className="font-semibold text-lg mb-2">
                Cloud & DevOps
              </h3>
              <p className="text-gray-400">
                Learning and applying AWS, Docker and deployment concepts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}