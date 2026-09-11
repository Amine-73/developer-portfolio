import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminLoginPage from "./page";

describe("Admin login page", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders email, password fields and a submit button", () => {
    const { container } = render(<AdminLoginPage />);

    expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="password"]')).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });

  it("shows an error message on failed login", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid email or password" }),
    });

    const user = userEvent.setup();
    const { container } = render(<AdminLoginPage />);

    const emailInput = container.querySelector('input[name="email"]')!;
    const passwordInput = container.querySelector('input[name="password"]')!;

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i)
      ).toBeInTheDocument();
    });
  });

  it("sends the correct request body on submit", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid email or password" }),
    });

    const user = userEvent.setup();
    const { container } = render(<AdminLoginPage />);

    const emailInput = container.querySelector('input[name="email"]')!;
    const passwordInput = container.querySelector('input[name="password"]')!;

    await user.type(emailInput, "admin@portfolio.local");
    await user.type(passwordInput, "ChangeMe123!");
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/api/login"),
        expect.objectContaining({
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: "admin@portfolio.local",
            password: "ChangeMe123!",
          }),
        })
      );
    });
  });
});
