"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold">
          {"<Amine />"}
        </a>

        <div className="hidden md:flex items-center gap-6 text-sm text-gray-400">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
          aria-label="Open navigation menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-8 py-5">
          <div className="flex flex-col gap-4 text-gray-400">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}