export type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Task Manager",
    slug: "task-manager",
    description:
      "A task management application for creating, updating and organizing tasks.",
    technologies: ["Next.js", "TypeScript", "PHP", "MySQL"],
    image: "/projects/task-manager.png",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 2,
    title: "AI Automation Assistant",
    slug: "ai-automation-assistant",
    description:
      "An AI-powered automation system using agents and external services to automate repetitive tasks.",
    technologies: ["n8n", "AI", "APIs", "PostgreSQL"],
    image: "/projects/ai-assistant.png",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Developer Portfolio",
    slug: "developer-portfolio",
    description:
      "A full-stack developer portfolio built with Next.js, PHP, MySQL and Docker.",
    technologies: ["Next.js", "PHP", "MySQL", "Docker"],
    image: "/projects/portfolio.png",
    github: "#",
    demo: "#",
    featured: true,
  },
];