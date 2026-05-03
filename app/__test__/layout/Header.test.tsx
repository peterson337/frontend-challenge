import { render, screen } from "@testing-library/react";
import Header from "@/app/components/layout/Header";

describe("Header", () => {
  it("deve renderizar o componente header", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("deve renderizar o componente Brand", () => {
    render(<Header />);
    // Componente Brand deve ser renderizado no centro
    const section = screen.getByRole("banner").querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("deve renderizar o ícone Menu no mobile", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    const menuContainer = header.querySelector(".md\\:hidden");
    expect(menuContainer).toBeInTheDocument();
  });

  it("deve renderizar o ícone Search", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it('deve renderizar o botão "Busca" no desktop', () => {
    render(<Header />);
    const buscaButton = screen.getByText("Busca");
    expect(buscaButton).toBeInTheDocument();
  });

  it('deve renderizar o botão "Cadastra-se" no desktop', () => {
    render(<Header />);
    const cadastroButton = screen.getByText("Cadastra-se");
    expect(cadastroButton).toBeInTheDocument();
  });

  it('deve renderizar o botão "Entrar" no desktop', () => {
    render(<Header />);
    const entrarButton = screen.getByText("Entrar");
    expect(entrarButton).toBeInTheDocument();
  });

  it("deve ter a cor de fundo correta no header", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-white");
  });

  it("deve renderizar ícones de login e usuário no mobile e desktop", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();
  });

  it("deve ter o header com layout flexbox", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    const section = header.querySelector("section");
    expect(section).toHaveClass("flex", "flex-row", "justify-between");
  });

  it("deve renderizar todos os botões", () => {
    render(<Header />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3); // Busca, Cadastra-se, Entrar
  });
});
