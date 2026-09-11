import { render, screen } from "@testing-library/react";
import Projects from "./projects";

describe("Projects section", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockProject = {
    id: 1,
    title: "Test Project",
    slug: "test-project",
    description: "A project used for testing",
    image_url: null,
    github: "https://github.com/example/test",
    demo: "https://example.com/demo",
    featured: true,
    technologies: ["React", "TypeScript"],
  };

  it("renders only featured projects", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        mockProject,
        { ...mockProject, id: 2, title: "Hidden Project", featured: false },
      ],
    });

    const ui = await Projects();
    render(ui);

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.queryByText("Hidden Project")).not.toBeInTheDocument();
  });

  it("renders project technologies", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockProject],
    });

    const ui = await Projects();
    render(ui);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders GitHub and Live Demo links when present", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [mockProject],
    });

    const ui = await Projects();
    render(ui);

    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      "https://github.com/example/test"
    );
    expect(screen.getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://example.com/demo"
    );
  });

  it("throws when the API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(Projects()).rejects.toThrow("Failed to fetch projects");
  });
});
