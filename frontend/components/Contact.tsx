"use client";

import { FormEvent, useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setStatus("");

    const form = event.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setStatus(result.error || "Something went wrong.");
        return;
      }

      setStatus("Message sent successfully!");

      form.reset();
    } catch (error) {
      console.error(error);

      setStatus(
        "Unable to send your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

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

          {/* Contact form */}
          <div>
            <form
              onSubmit={handleSubmit}
              className="border border-white/10 rounded-xl p-6 bg-black/20 space-y-5"
            >

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-400 mb-2"
                >
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="
                    w-full
                    rounded-md
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-white/30
                    transition
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-400 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="
                    w-full
                    rounded-md
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-white/30
                    transition
                  "
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-400 mb-2"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="
                    w-full
                    rounded-md
                    border border-white/10
                    bg-white/[0.03]
                    px-4 py-3
                    text-white
                    placeholder:text-gray-600
                    outline-none
                    focus:border-white/30
                    transition
                    resize-none
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-md
                  bg-white
                  text-black
                  px-6 py-3
                  font-medium
                  hover:bg-gray-200
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition
                "
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {/* Status */}
              {status && (
                <p className="text-sm text-gray-400">
                  {status}
                </p>
              )}

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}