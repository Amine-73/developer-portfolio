"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

export default function MessagesPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMessages() {
      const authResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
        {
          credentials: "include",
        }
      );

      if (!authResponse.ok) {
        router.replace("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        setLoading(false);
        return;
      }

      const data = await response.json();

      setMessages(data);
      setLoading(false);
    }

    loadMessages();
  }, [router]);

  return (
    <main className="min-h-screen px-6 py-20 md:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              Admin
            </p>

            <h1 className="text-3xl md:text-4xl font-bold">
              Messages
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </p>
          </div>

          <a
            href="/admin/projects"
            className="
              border border-white/10
              px-4 py-2
              rounded-md
              text-sm
              hover:bg-white/10
              transition
            "
          >
            Projects
          </a>
        </div>

        {loading ? (
          <p className="text-gray-500">
            Loading messages...
          </p>
        ) : messages.length === 0 ? (
          <div className="border border-white/10 rounded-xl p-8">
            <p className="text-gray-500">
              No messages yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="
                  border border-white/10
                  rounded-xl
                  p-6
                  bg-white/[0.02]
                "
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                  <div>
                    <h2 className="text-lg font-semibold">
                      {message.name}
                    </h2>

                    <a
                      href={`mailto:${message.email}`}
                      className="text-sm text-gray-400 hover:text-white transition"
                    >
                      {message.email}
                    </a>
                  </div>

                  <p className="text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleString()}
                  </p>

                </div>

                <p className="text-gray-300 leading-7 mt-5 whitespace-pre-wrap">
                  {message.message}
                </p>
                <div className="mt-6 pt-5 border-t border-white/10">
                <a
                  href={`mailto:${message.email}?subject=Re: Your message`}
                  className="inline-flex items-center rounded-md bg-white text-black px-4 py-2 text-sm font-medium hover:bg-gray-200 transition"
                >
                  Reply
                </a>
              </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
