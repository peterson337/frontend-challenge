import { render, screen } from "@testing-library/react";
import Brand from "@/app/components/Ui/Brand";

// Mock do componente Logo
jest.mock("@/app/components/icons/Logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

describe("Brand", () => {
  it("deve renderizar o componente Brand", () => {
    const { container } = render(<Brand />);
    expect(container).toBeInTheDocument();
  });

  it("deve renderizar o logo", () => {
    render(<Brand />);
    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });

  it("deve renderizar o texto 'EVOB'", () => {
    render(<Brand />);
    const text = screen.getByText("EVOB");
    expect(text).toBeInTheDocument();
  });

  it("deve renderizar com a classe de fundo correto", () => {
    const { container } = render(<Brand />);
    const div = container.querySelector(".bg-light-purple");
    expect(div).toBeInTheDocument();
  });

  it("deve renderizar o h1 com as classes de estilo correto", () => {
    render(<Brand />);
    const heading = screen.getByText("EVOB");
    expect(heading.tagName).toBe("H1");
    expect(heading).toHaveClass("text-2xl", "font-bold", "text-gray");
  });

  it("deve renderizar o logo junto com o texto", () => {
    const { container } = render(<Brand />);
    const wrapper = container.querySelector("h1");
    expect(wrapper).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });
});
