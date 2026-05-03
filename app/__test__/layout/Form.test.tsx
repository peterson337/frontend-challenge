import { render, screen, fireEvent } from "@testing-library/react";
import Form from "@/app/components/layout/Form";
import { useCadastroForm } from "@/app/hook/useCadastroForm";

// Mock do hook useCadastroForm
jest.mock("@/app/hook/useCadastroForm");

// Mock do componente SuccessMessage
jest.mock("@/app/components/layout/SuccessMessage", () => {
  return function MockSuccessMessage() {
    return <div data-testid="success-message">Success Message</div>;
  };
});

describe("Form", () => {
  const mockSetIsSubmitted = jest.fn();
  const mockValidateForm = jest.fn();

  const mockRefs = {
    nomeRef: { current: null },
    emailRef: { current: null },
    confirmEmailRef: { current: null },
    passwordRef: { current: null },
    confirmPasswordRef: { current: null },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateForm.mockReturnValue(false);
    (useCadastroForm as jest.Mock).mockReturnValue({
      ...mockRefs,
      validateForm: mockValidateForm,
    });
  });

  it("deve renderizar o formulário quando isSubmitted é false", () => {
    const { container } = render(
      <Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />,
    );
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
  });

  it("deve renderizar todos os labels de entrada", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Confirme Email")).toBeInTheDocument();
    expect(screen.getByText("Crie uma senha")).toBeInTheDocument();
    expect(screen.getByText("Confirme a sua senha")).toBeInTheDocument();
  });

  it("deve renderizar todos os campos de entrada", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const inputs = screen.getAllByPlaceholderText("Digite aqui");
    expect(inputs).toHaveLength(5);
  });

  it("deve renderizar o botão 'Iniciar curso'", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Iniciar curso");
  });

  it("deve exibir as mensagens de ajuda de senha", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    expect(
      screen.getByText("Deve ter pelo menos 8 caracteres."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A senha deve ser igual a criada acima."),
    ).toBeInTheDocument();
  });

  it("deve renderizar o SuccessMessage quando isSubmitted é true", () => {
    render(<Form isSubmitted={true} setIsSubmitted={mockSetIsSubmitted} />);
    const successMessage = screen.getByTestId("success-message");
    expect(successMessage).toBeInTheDocument();
  });

  it("não deve renderizar o formulário quando isSubmitted é true", () => {
    render(<Form isSubmitted={true} setIsSubmitted={mockSetIsSubmitted} />);
    const form = screen.queryByRole("form");
    expect(form).not.toBeInTheDocument();
  });

  it("deve chamar validateForm quando o botão é clicado", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockValidateForm).toHaveBeenCalled();
  });

  it("deve chamar setIsSubmitted com true quando o formulário é validado com sucesso", () => {
    mockValidateForm.mockReturnValue(true);
    (useCadastroForm as jest.Mock).mockReturnValue({
      ...mockRefs,
      validateForm: mockValidateForm,
    });

    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockSetIsSubmitted).toHaveBeenCalledWith(true);
  });

  it("não deve chamar setIsSubmitted quando o formulário não é validado", () => {
    mockValidateForm.mockReturnValue(false);
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockSetIsSubmitted).not.toHaveBeenCalled();
  });

  it("deve ter os campos de entrada com tipos corretos", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const inputs = screen.getAllByPlaceholderText("Digite aqui");
    expect(inputs[0]).toHaveAttribute("type", "text");
    expect(inputs[1]).toHaveAttribute("type", "email");
    expect(inputs[2]).toHaveAttribute("type", "email");
    expect(inputs[3]).toHaveAttribute("type", "password");
    expect(inputs[4]).toHaveAttribute("type", "password");
  });

  it("deve ter as classes CSS corretas no botão", () => {
    render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-purple", "text-white");
  });
});
