import { render, screen, fireEvent } from "@testing-library/react";
import { useCadastroForm } from "@/app/hook/useCadastroForm";

// Componente teste para usar o hook
function TestComponent() {
  const {
    nomeRef,
    emailRef,
    confirmEmailRef,
    passwordRef,
    confirmPasswordRef,
    validateForm,
  } = useCadastroForm();

  return (
    <div>
      <input ref={nomeRef} data-testid="nome-input" type="text" />
      <input ref={emailRef} data-testid="email-input" type="email" />
      <input
        ref={confirmEmailRef}
        data-testid="confirm-email-input"
        type="email"
      />
      <input ref={passwordRef} data-testid="password-input" type="password" />
      <input
        ref={confirmPasswordRef}
        data-testid="confirm-password-input"
        type="password"
      />
      <button onClick={validateForm} data-testid="validate-button">
        Validar
      </button>
    </div>
  );
}

describe("useCadastroForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
  });

  it("deve retornar as referências dos campos do formulário", () => {
    render(<TestComponent />);

    expect(screen.getByTestId("nome-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
  });

  it("deve retornar alerta quando campos estão vazios", () => {
    render(<TestComponent />);
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.click(validateButton);

    expect(global.alert).toHaveBeenCalledWith(
      "Por favor, preencha todos os campos.",
    );
  });

  it("deve retornar alerta quando email é inválido", () => {
    render(<TestComponent />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, { target: { value: "email-invalido" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "email-invalido" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha123456" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "senha123456" },
    });

    fireEvent.click(validateButton);

    expect(global.alert).toHaveBeenCalledWith(
      "Por favor, insira um e-mail válido.",
    );
  });

  it("deve retornar alerta quando emails não conferem", () => {
    render(<TestComponent />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "email2@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha123456" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "senha123456" },
    });

    fireEvent.click(validateButton);

    expect(global.alert).toHaveBeenCalledWith("Os e-mails não conferem.");
  });

  it("deve retornar alerta quando senha é menor que 8 caracteres", () => {
    render(<TestComponent />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "email@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "senha" } });

    fireEvent.click(validateButton);

    expect(global.alert).toHaveBeenCalledWith("A senha deve ter 8 caracteres.");
  });

  it("deve retornar alerta quando senhas não conferem", () => {
    render(<TestComponent />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "email@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha123456789" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "senha987654321" },
    });

    fireEvent.click(validateButton);

    expect(global.alert).toHaveBeenCalledWith("As senhas não conferem.");
  });

  it("deve retornar true quando todos os campos são válidos", () => {
    let validationResult: boolean | undefined;

    function TestComponentWithResult() {
      const {
        nomeRef,
        emailRef,
        confirmEmailRef,
        passwordRef,
        confirmPasswordRef,
        validateForm,
      } = useCadastroForm();

      const handleClick = () => {
        validationResult = validateForm();
      };

      return (
        <div>
          <input ref={nomeRef} data-testid="nome-input" type="text" />
          <input ref={emailRef} data-testid="email-input" type="email" />
          <input
            ref={confirmEmailRef}
            data-testid="confirm-email-input"
            type="email"
          />
          <input
            ref={passwordRef}
            data-testid="password-input"
            type="password"
          />
          <input
            ref={confirmPasswordRef}
            data-testid="confirm-password-input"
            type="password"
          />
          <button onClick={handleClick} data-testid="validate-button">
            Validar
          </button>
        </div>
      );
    }

    render(<TestComponentWithResult />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, { target: { value: "email@example.com" } });
    fireEvent.change(confirmEmailInput, {
      target: { value: "email@example.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha123456789" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "senha123456789" },
    });

    fireEvent.click(validateButton);

    expect(validationResult).toBe(true);
  });

  it("deve aceitar emails válidos", () => {
    render(<TestComponent />);

    const nomeInput = screen.getByTestId("nome-input") as HTMLInputElement;
    const emailInput = screen.getByTestId("email-input") as HTMLInputElement;
    const confirmEmailInput = screen.getByTestId(
      "confirm-email-input",
    ) as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      "password-input",
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input",
    ) as HTMLInputElement;
    const validateButton = screen.getByTestId("validate-button");

    fireEvent.change(nomeInput, { target: { value: "João" } });
    fireEvent.change(emailInput, {
      target: { value: "usuario@example.com.br" },
    });
    fireEvent.change(confirmEmailInput, {
      target: { value: "usuario@example.com.br" },
    });
    fireEvent.change(passwordInput, { target: { value: "senha123456789" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "senha123456789" },
    });

    fireEvent.click(validateButton);

    expect(global.alert).not.toHaveBeenCalled();
  });
});
