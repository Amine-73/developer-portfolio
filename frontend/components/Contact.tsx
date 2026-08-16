export default function Contact() {
  return (
    <section id="contact" className="px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-gray-400 mb-3">05 — Contact</p>

        <div className="border border-white/10 rounded-xl p-10 md:p-16 text-center">
          <h2 className="text-4xl font-bold mb-5">
            Let&apos;s work together
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-7">
            I&apos;m open to new opportunities and interesting projects.
            Feel free to contact me if you&apos;d like to work together.
          </p>

          <a
            href="mailto:aminchana.besiness@gmail.com"
            className="inline-block bg-white text-black px-6 py-3 rounded-md"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
}