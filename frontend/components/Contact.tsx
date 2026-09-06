export default function Contact() {
  return (
    <section id="contact" className="px-6 py-24 md:px-8">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-500 mb-3">
          05 — Contact
        </p>

        <div className="grid md:grid-cols-2 gap-12 border border-white/10 rounded-2xl p-8 md:p-12 bg-white/[0.02]">

          {/* Left side */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Let&apos;s work together
            </h2>

            <p className="text-gray-400 mt-6 leading-8 max-w-lg">
              I&apos;m open to new opportunities, freelance projects,
              and interesting collaborations. If you have a project
              in mind, feel free to get in touch.
            </p>

            <div className="mt-8 space-y-4">
              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <a
                  href="mailto:aminchana.besiness@gmail.com"
                  className="text-gray-300 hover:text-white transition"
                >
                  aminchana.besiness@gmail.com
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  GitHub
                </p>

                <a
                  href="https://github.com/Amine-73"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition"
                >
                  github.com/Amine-73
                </a>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex flex-col justify-center">
            <div className="border border-white/10 rounded-xl p-6 bg-black/20">

              <p className="text-sm text-gray-500 mb-2">
                Have a project in mind?
              </p>

              <h3 className="text-2xl font-semibold mb-4">
                Get in touch
              </h3>

              <p className="text-gray-400 text-sm leading-7 mb-6">
                Send me an email and tell me a little about your
                project, opportunity, or idea.
              </p>

              <a
                href="mailto:aminchana.besiness@gmail.com"
                className="
                  inline-flex
                  items-center
                  justify-center
                  w-full
                  bg-white
                  text-black
                  px-6
                  py-3
                  rounded-md
                  font-medium
                  hover:bg-gray-200
                  transition
                "
              >
                Send me an email
              </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}