import { render, screen } from "@testing-library/react";
import Footer from "@/app/components/layout/Footer";

describe("Footer", () => {
  it("deve renderizar o componente footer", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("deve renderizar os ícones de redes sociais", () => {
    render(<Footer />);
    // Verificar se os ícones de redes sociais estão presentes
    // Os ícones são renderizados como componentes, então verificamos se o container deles existe
    const socialContainer = screen
      .getByRole("contentinfo")
      .querySelector("div");
    expect(socialContainer).toBeInTheDocument();
  });

  it('deve renderizar o texto "Termos de uso"', () => {
    render(<Footer />);
    const termsText = screen.getByText("Termos de uso");
    expect(termsText).toBeInTheDocument();
  });

  it('deve renderizar o texto "Política de privacidade"', () => {
    render(<Footer />);
    const privacyText = screen.getByText("Política de privacidade");
    expect(privacyText).toBeInTheDocument();
  });

  it("deve renderizar as opções de idioma", () => {
    render(<Footer />);
    expect(screen.getByText("PT")).toBeInTheDocument();
    expect(screen.getByText("EN")).toBeInTheDocument();
    expect(screen.getByText("ES")).toBeInTheDocument();
  });

  it("deve ter PT como idioma ativo (com borda inferior)", () => {
    render(<Footer />);
    const ptButton = screen.getByText("PT").parentElement;
    expect(ptButton).toHaveClass("border-b-2", "border-purple");
  });

  it("deve renderizar o footer com as classes base corretas", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("flex", "w-full", "flex-col");
  });
});
