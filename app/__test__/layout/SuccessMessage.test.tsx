import { render, screen, waitFor, act } from "@testing-library/react";
import SuccessMessage from "@/app/components/layout/SuccessMessage";
import { useRouter } from "next/navigation";

// Mock do useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SuccessMessage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("deve renderizar o componente SuccessMessage", () => {
    render(<SuccessMessage />);
    const heading = screen.getByText("Conta criada com sucesso!");
    expect(heading).toBeInTheDocument();
  });

  it("deve exibir o countdown inicial de 5 segundos", () => {
    render(<SuccessMessage />);
    expect(screen.getByText(/5 segundos/)).toBeInTheDocument();
  });

  it("deve renderizar a imagem de sucesso", () => {
    render(<SuccessMessage />);
    const image = screen.getByAltText("Sucesso");
    expect(image).toBeInTheDocument();
  });

  it("deve renderizar o botão 'Ir para o catálogo'", () => {
    render(<SuccessMessage />);
    const button = screen.getByText("Ir para o catálogo");
    expect(button).toBeInTheDocument();
  });

  it("deve exibir mensagem de redirecionamento", () => {
    render(<SuccessMessage />);
    const message = screen.getByText(
      /Clique no botão abaixo ou você será redirecionado/,
    );
    expect(message).toBeInTheDocument();
  });

  it("deve decrementar o countdown a cada segundo", async () => {
    render(<SuccessMessage />);

    // Verifica countdown inicial
    expect(screen.getByText(/5 segundos/)).toBeInTheDocument();

    // Avança 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByText(/4 segundos/)).toBeInTheDocument();
    });

    // Avança mais 1 segundo
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFor(() => {
      expect(screen.getByText(/3 segundos/)).toBeInTheDocument();
    });
  });

  it("deve renderizar com estrutura correta de container", () => {
    render(<SuccessMessage />);
    const container = screen
      .getByText("Conta criada com sucesso!")
      .closest("div");
    expect(container).toHaveClass("flex", "flex-col");
  });

  it("deve ter a estrutura correta do texto de sucesso", () => {
    render(<SuccessMessage />);
    const heading = screen.getByText("Conta criada com sucesso!");
    expect(heading).toHaveClass("font-semibold");
    expect(heading).toHaveClass("text-[24px]");
  });
});
