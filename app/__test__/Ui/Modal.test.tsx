import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "@/app/components/Ui/Modal";

// Mock dos ícones e Button
jest.mock("@/app/components/Ui/Button", () => {
  return function MockButton(
    props: React.PropsWithChildren<Record<string, unknown>>,
  ) {
    // Filtra apenas as props válidas para elemento HTML <button>
    const {
      colorButton,
      rounded,
      size,
      fontFamily,
      fontWeight,
      display,
      shadow,
      width,
      heigth,
      border,
      ...htmlProps
    } = props;
    return <button {...htmlProps}>{props.children}</button>;
  };
});

jest.mock("@/app/components/icons/WhatsApp", () => {
  return function MockWhatsApp() {
    return <div data-testid="whatsapp-icon">WhatsApp</div>;
  };
});

jest.mock("@/app/components/icons/Close", () => {
  return function MockClose() {
    return <div data-testid="close-icon">Close</div>;
  };
});

jest.mock("@/app/components/icons/Copy", () => {
  return function MockCopy() {
    return <div data-testid="copy-icon">Copy</div>;
  };
});

describe("Modal", () => {
  const mockSetIsOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o modal", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    expect(container).toBeInTheDocument();
  });

  it("deve renderizar o overlay do modal", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const overlay = container.querySelector(".fixed.inset-0");
    expect(overlay).toBeInTheDocument();
  });

  it("deve renderizar o título 'Compartilhar curso'", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    expect(screen.getByText("Compartilhar curso")).toBeInTheDocument();
  });

  it("deve renderizar o botão de fechar", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();
  });

  it("deve chamar setIsOpenModal ao clicar no botão de fechar", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const buttons = screen.getAllByRole("button");
    const closeButton = buttons[0]; // Primeiro botão é o close
    fireEvent.click(closeButton);
    expect(mockSetIsOpenModal).toHaveBeenCalledWith(false);
  });

  it("deve chamar setIsOpenModal ao clicar no overlay", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const overlay = container.querySelector(".fixed.inset-0") as HTMLElement;
    fireEvent.click(overlay);
    expect(mockSetIsOpenModal).toHaveBeenCalledWith(false);
  });

  it("não deve chamar setIsOpenModal ao clicar dentro do modal", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const modalContent = container.querySelector(
      ".flex.flex-col.items-stretch",
    ) as HTMLElement;
    fireEvent.click(modalContent);
    expect(mockSetIsOpenModal).not.toHaveBeenCalled();
  });

  it("deve renderizar o link do curso", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const link = screen.getByText(/https/);
    expect(link).toBeInTheDocument();
  });

  it("deve renderizar o botão de copiar link", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const copyIcon = screen.getByTestId("copy-icon");
    expect(copyIcon).toBeInTheDocument();
  });

  it("deve renderizar o botão de compartilhar via WhatsApp", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const whatsappText = screen.getByText(/Compartilhar via Whatsapp/);
    expect(whatsappText).toBeInTheDocument();
  });

  it("deve renderizar o ícone do WhatsApp", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const whatsappIcon = screen.getByTestId("whatsapp-icon");
    expect(whatsappIcon).toBeInTheDocument();
  });

  it("deve ter o overlay com fundo semi-transparente preto", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const overlay = container.querySelector(".fixed.inset-0");
    expect(overlay).toHaveClass("bg-black/50");
  });

  it("deve ter o modal centrado verticamente", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const overlay = container.querySelector(
      ".flex.items-center.justify-center",
    );
    expect(overlay).toBeInTheDocument();
  });

  it("deve renderizar com estrutura correta de header", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const header = container.querySelector(".border-b");
    expect(header).toBeInTheDocument();
  });

  it("deve renderizar com estrutura correta de footer", () => {
    const { container } = render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const footer = container.querySelector(".border-t");
    expect(footer).toBeInTheDocument();
  });

  it("deve renderizar todos os botões corretamente", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBeGreaterThanOrEqual(3); // Close, Copy, WhatsApp
  });

  it("deve ter o texto de título com fonte correta", () => {
    render(<Modal setIsOpenModal={mockSetIsOpenModal} />);
    const title = screen.getByText("Compartilhar curso");
    expect(title).toHaveClass("font-inter", "font-medium", "text-base");
  });
});
