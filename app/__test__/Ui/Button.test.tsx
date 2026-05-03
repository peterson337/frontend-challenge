import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/Ui/Button";

describe("Button", () => {
  it("deve renderizar o botão corretamente", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("deve renderizar o texto interno corretamente", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Click me
      </Button>,
    );
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("deve aplicar as classes de cor de fundo", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-black",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-black");
  });

  it("deve aplicar as classes de cor de texto", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-black",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-black");
  });

  it("deve aplicar as classes de border-radius", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-button-circle"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("rounded-button-circle");
  });

  it("deve aplicar as classes opcionais (size, width, border)", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
        size="h-[42px]"
        width="w-full"
        border="border border-gray-200"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-[42px]", "w-full", "border");
  });

  it("deve aplicar o hover effect quando hover é true", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: true,
        }}
        rounded="rounded-sm"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("hover:bg-[#D6D10B]", "active:bg-[#B56576]");
  });

  it("não deve aplicar o hover effect quando hover é false", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("hover:bg-[#D6D10B]");
  });

  it("deve chamar onClick quando clicado", () => {
    const mockClick = jest.fn();
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
        onClick={mockClick}
      >
        Click me
      </Button>,
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalled();
  });

  it("deve ter cursor-pointer e outline-none", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("cursor-pointer", "outline-none");
  });

  it("deve aplicar fontWeight quando fornecido", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
        fontWeight="font-bold"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("font-bold");
  });

  it("deve aplicar fontFamily quando fornecido", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
        fontFamily="font-inter"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("font-inter");
  });

  it("deve aplicar shadow quando fornecido", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
        shadow="shadow-lg"
      >
        Test
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("shadow-lg");
  });

  it("deve aceitar children como ReactNode", () => {
    render(
      <Button
        colorButton={{
          backgroundColor: "bg-purple",
          textColor: "text-white",
          hover: false,
        }}
        rounded="rounded-sm"
      >
        <span>Text content</span>
      </Button>,
    );
    expect(screen.getByText("Text content")).toBeInTheDocument();
  });
});
