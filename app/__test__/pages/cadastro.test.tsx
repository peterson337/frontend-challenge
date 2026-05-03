import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CadastroPage from "@/app/(auth)/cadastro/page";
import Form from "@/app/components/layout/Form";
import { useCadastroForm } from "@/app/hook/useCadastroForm";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="next-image" />
  ),
}));

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return (
      <a href={href} data-testid={`link-${href}`}>
        {children}
      </a>
    );
  };
});

jest.mock("@/app/components/Ui/Brand", () => {
  return function MockBrand() {
    return <div data-testid="mock-brand">Brand</div>;
  };
});

jest.mock("@/app/components/icons/Email", () => {
  return function MockEmail() {
    return <span data-testid="mock-email-icon">Email Icon</span>;
  };
});

jest.mock("@/app/components/layout/SuccessMessage", () => {
  return function MockSuccessMessage() {
    return (
      <div data-testid="mock-success-message">
        Cadastro realizado com sucesso!
      </div>
    );
  };
});

jest.mock("@/app/components/Ui/Button", () => {
  return function MockButton({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) {
    return (
      <button onClick={onClick} data-testid="mock-button">
        {children}
      </button>
    );
  };
});

jest.mock("@/app/hook/useCadastroForm");

interface FormRef {
  current: {
    value: string;
  } | null;
}

interface UseCadastroFormReturn {
  nomeRef: FormRef;
  emailRef: FormRef;
  confirmEmailRef: FormRef;
  passwordRef: FormRef;
  confirmPasswordRef: FormRef;
  validateForm: () => boolean;
}

describe("CadastroPage and Form Component", () => {
  const mockValidateForm = jest.fn();
  const mockNomeRef = { current: { value: "João Silva" } };
  const mockEmailRef = { current: { value: "joao@example.com" } };
  const mockConfirmEmailRef = { current: { value: "joao@example.com" } };
  const mockPasswordRef = { current: { value: "senha123456" } };
  const mockConfirmPasswordRef = { current: { value: "senha123456" } };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCadastroForm as jest.Mock).mockReturnValue({
      nomeRef: mockNomeRef,
      emailRef: mockEmailRef,
      confirmEmailRef: mockConfirmEmailRef,
      passwordRef: mockPasswordRef,
      confirmPasswordRef: mockConfirmPasswordRef,
      validateForm: mockValidateForm,
    } as unknown as UseCadastroFormReturn);
  });

  describe("CadastroPage", () => {
    it("deve renderizar o título da página de cadastro", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      expect(screen.getByText("Criar conta")).toBeInTheDocument();
    });

    it("deve renderizar o componente Brand", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      expect(screen.getAllByTestId("mock-brand").length).toBeGreaterThan(0);
    });

    it("deve renderizar o Form component", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      expect(screen.getByTestId("mock-button")).toBeInTheDocument();
    });

    it("deve renderizar o link para login", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      const loginLink = screen.getByTestId("link-/login");
      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveTextContent("Entrar");
    });

    it("deve renderizar informações de contato no rodapé", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      expect(screen.getByText("© EVOB 2025")).toBeInTheDocument();
      expect(screen.getByTestId("mock-email-icon")).toBeInTheDocument();
      expect(screen.getByText("help@evob.com")).toBeInTheDocument();
    });

    it("deve renderizar a imagem do banner em desktop", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/signup-banner.jpg");
      expect(image).toHaveAttribute("alt", "Signup Banner");
    });

    it("deve renderizar descrição mobile", () => {
      mockValidateForm.mockReturnValue(false);
      render(<CadastroPage />);

      expect(
        screen.getByText("Start turning your ideas into reality."),
      ).toBeInTheDocument();
    });

    it("deve alternar para SuccessMessage após envio bem-sucedido", () => {
      mockValidateForm.mockReturnValue(true);
      render(<CadastroPage />);

      fireEvent.click(screen.getAllByTestId("mock-button")[0]);

      expect(screen.getByTestId("mock-success-message")).toBeInTheDocument();
    });
  });

  describe("Form Component", () => {
    it("deve renderizar todos os campos de input", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      const inputs = screen.getAllByPlaceholderText("Digite aqui");
      expect(inputs).toHaveLength(5); // nome, email, confirmar email, senha, confirmar senha
    });

    it("deve renderizar labels para todos os campos", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      expect(screen.getByText("Nome")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("Confirme Email")).toBeInTheDocument();
      expect(screen.getByText("Crie uma senha")).toBeInTheDocument();
      expect(screen.getByText("Confirme a sua senha")).toBeInTheDocument();
    });

    it("deve renderizar mensagens de ajuda para senha", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      expect(
        screen.getByText("Deve ter pelo menos 8 caracteres."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("A senha deve ser igual a criada acima."),
      ).toBeInTheDocument();
    });

    it("deve chamar validateForm ao clicar no botão de envio", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      const submitButton = screen.getByText("Iniciar curso");
      fireEvent.click(submitButton);

      expect(mockValidateForm).toHaveBeenCalled();
    });

    it("deve chamar setIsSubmitted quando validação for bem-sucedida", () => {
      const mockSetIsSubmitted = jest.fn();
      mockValidateForm.mockReturnValue(true);
      render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);

      const submitButton = screen.getByText("Iniciar curso");
      fireEvent.click(submitButton);

      expect(mockSetIsSubmitted).toHaveBeenCalledWith(true);
    });

    it("não deve chamar setIsSubmitted quando validação falhar", () => {
      const mockSetIsSubmitted = jest.fn();
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={mockSetIsSubmitted} />);

      const submitButton = screen.getByText("Iniciar curso");
      fireEvent.click(submitButton);

      expect(mockSetIsSubmitted).not.toHaveBeenCalled();
    });

    it("deve renderizar SuccessMessage quando isSubmitted for true", () => {
      render(<Form isSubmitted={true} setIsSubmitted={jest.fn()} />);

      expect(screen.getByTestId("mock-success-message")).toBeInTheDocument();
    });

    it("não deve renderizar form quando isSubmitted for true", () => {
      render(<Form isSubmitted={true} setIsSubmitted={jest.fn()} />);

      const inputs = screen.queryAllByPlaceholderText("Digite aqui");
      expect(inputs).toHaveLength(0);
    });

    it("deve ter o tipo correto para cada input", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      const inputs = screen.getAllByPlaceholderText("Digite aqui");
      expect(inputs[0]).toHaveAttribute("type", "text"); // nome
      expect(inputs[1]).toHaveAttribute("type", "email"); // email
      expect(inputs[2]).toHaveAttribute("type", "email"); // confirmar email
      expect(inputs[3]).toHaveAttribute("type", "password"); // senha
      expect(inputs[4]).toHaveAttribute("type", "password"); // confirmar senha
    });

    it("deve enviar o form corretamente", () => {
      mockValidateForm.mockReturnValue(false);
      const { container } = render(
        <Form isSubmitted={false} setIsSubmitted={jest.fn()} />,
      );

      const form = container.querySelector("form");
      expect(form).toBeInTheDocument();
      expect(form?.tagName).toBe("FORM");
    });

    it("deve renderizar o botão de submissão", () => {
      mockValidateForm.mockReturnValue(false);
      render(<Form isSubmitted={false} setIsSubmitted={jest.fn()} />);

      const button = screen.getByRole("button", { name: /Iniciar curso/i });
      expect(button).toBeInTheDocument();
    });
  });
});
