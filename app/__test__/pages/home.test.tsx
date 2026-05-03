import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "@/app/(public)/page";
import useFetchData from "@/app/hook/useFetchData";

// Precisamos simular o comportamento de use() do React para retornar o objeto passado,
// pois em nosso teste passaremos diretamente os dados do curso em vez de uma Promise genuina.
jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    use: (p: unknown) => p,
  };
});

jest.mock("@/app/hook/useFetchData");

interface MockCourse {
  id: string;
  title: string;
  slug: string;
  teachers: string[];
  banner: string;
}

jest.mock("@/app/components/Ui/Courses", () => {
  return function MockCourses({
    title,
    allCourses,
    isFavoriteList,
  }: {
    title: string;
    allCourses: MockCourse[];
    isFavoriteList: boolean;
  }) {
    return (
      <div data-testid={`courses-${isFavoriteList ? "fav" : "all"}`}>
        <h2>{title}</h2>
        {allCourses && (
          <span data-testid="all-courses-count">{allCourses.length}</span>
        )}
      </div>
    );
  };
});

interface ColorButton {
  backgroundColor: string;
  textColor: string;
  hover?: boolean;
}

interface MockButtonProps {
  children: React.ReactNode;
  colorButton: ColorButton;
  rounded: string;
  size: string;
  fontFamily: string;
  fontWeight: string;
}

jest.mock("@/app/components/Ui/Button", () => {
  return function MockButton({
    children,
    colorButton,
    rounded,
    size,
    fontFamily,
    fontWeight,
  }: MockButtonProps) {
    return (
      <button
        data-testid="mock-button"
        data-color-bg={colorButton?.backgroundColor}
        data-color-text={colorButton?.textColor}
        data-rounded={rounded}
        data-size={size}
      >
        {children}
      </button>
    );
  };
});

// Mock da engine de roteamento caso o Button ou algo use
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Home Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("não deve renderizar nada se o primeiro curso for inexistente", () => {
    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: [] }),
    });

    const { container } = render(<Home />);

    // Como retorna null, o container fica vazio
    expect(container.firstChild).toBeNull();
  });

  it("deve renderizar o primeiro curso como destaque (banner) e passar o restante das props", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Primeiro Curso Destaque",
        slug: "curso-destaque",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner1.jpg",
      },
      {
        id: "2",
        title: "Curso Next.js",
        slug: "curso-next",
        teachers: ["Prof B"],
        banner: "https://minha-url.com/banner2.jpg",
      },
      {
        id: "3",
        title: "Curso Tailwind",
        slug: "curso-tailwind",
        teachers: ["Prof C"],
        banner: "https://minha-url.com/banner3.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    // Título do curso destaque renderizado diretamente
    expect(screen.getByText("Primeiro Curso Destaque")).toBeInTheDocument();

    // MockButton também deve ser renderizado
    expect(screen.getByTestId("mock-button")).toHaveTextContent(
      "Conheça as aulas",
    );

    // Valida os componentes `Courses` renderizados abaixo
    const allCoursesSection = screen.getByTestId("courses-all");
    expect(allCoursesSection).toHaveTextContent("Meus cursos");
    expect(screen.getByTestId("all-courses-count")).toHaveTextContent("2"); // Eram 3 mockados no total

    const favCoursesSection = screen.getByTestId("courses-fav");
    expect(favCoursesSection).toHaveTextContent("Meus favoritos");
  });

  it("deve chamar getCourses com o parâmetro 'courses'", () => {
    const mockGetCourses = jest.fn().mockReturnValue({ courses: [] });
    (useFetchData as jest.Mock).mockReturnValue({ getCourses: mockGetCourses });

    render(<Home />);

    expect(mockGetCourses).toHaveBeenCalledWith("courses");
  });

  it("deve renderizar apenas o primeiro curso quando houver apenas um curso", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Único Curso",
        slug: "unico-curso",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner1.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    expect(screen.getByText("Único Curso")).toBeInTheDocument();
    expect(screen.getByTestId("courses-all")).toBeInTheDocument();
    // Quando há apenas um curso, ele vira destaque, então 0 cursos restantes
    expect(screen.getByTestId("all-courses-count")).toHaveTextContent("0");
  });

  it("deve aplicar o backgroundImage correto no banner do primeiro curso", () => {
    const bannerUrl = "https://exemplo.com/banner.jpg";
    const mockCourses = [
      {
        id: "1",
        title: "Curso com Banner",
        slug: "curso-banner",
        teachers: ["Prof A"],
        banner: bannerUrl,
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    const { container } = render(<Home />);

    const bannerDiv = container.querySelector('[class*="bg-cover"]');
    expect(bannerDiv).toHaveStyle(`background-image: url(${bannerUrl})`);
  });

  it("deve passar os dados corretos para o componente Courses com cursos não-destaque", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Primeiro Curso Destaque",
        slug: "curso-destaque",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner1.jpg",
      },
      {
        id: "2",
        title: "Segundo Curso",
        slug: "segundo-curso",
        teachers: ["Prof B"],
        banner: "https://minha-url.com/banner2.jpg",
      },
      {
        id: "3",
        title: "Terceiro Curso",
        slug: "terceiro-curso",
        teachers: ["Prof C"],
        banner: "https://minha-url.com/banner3.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    const allCoursesCount = screen.getByTestId("all-courses-count");
    expect(allCoursesCount).toHaveTextContent("2");
  });

  it("deve renderizar o botão com as props de estilo corretas", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Curso Teste",
        slug: "curso-teste",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    const button = screen.getByTestId("mock-button");
    expect(button).toHaveAttribute("data-color-bg", "bg-black");
    expect(button).toHaveAttribute("data-color-text", "text-white");
    expect(button).toHaveAttribute("data-rounded", "rounded-none");
    expect(button).toHaveAttribute("data-size", "px-10 py-4");
  });

  it("deve renderizar as duas seções de cursos independentemente", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Primeiro Curso",
        slug: "primeiro-curso",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner1.jpg",
      },
      {
        id: "2",
        title: "Segundo Curso",
        slug: "segundo-curso",
        teachers: ["Prof B"],
        banner: "https://minha-url.com/banner2.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    expect(screen.getByTestId("courses-all")).toBeInTheDocument();
    expect(screen.getByTestId("courses-fav")).toBeInTheDocument();
    expect(screen.getByText("Meus cursos")).toBeInTheDocument();
    expect(screen.getByText("Meus favoritos")).toBeInTheDocument();
  });

  it("deve mapear corretamente os dados dos cursos extraindo apenas campos necessários", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Curso Completo",
        slug: "curso-completo",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner.jpg",
        description: "Uma descrição que não deveria ser usada",
        price: 99.99,
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    render(<Home />);

    // Verifica que apenas os campos necessários são renderizados (title)
    expect(screen.getByText("Curso Completo")).toBeInTheDocument();
    expect(
      screen.queryByText("Uma descrição que não deveria ser usada"),
    ).not.toBeInTheDocument();
  });

  it("deve manter a estrutura HTML correta com classes Tailwind", () => {
    const mockCourses = [
      {
        id: "1",
        title: "Curso com Classes",
        slug: "curso-classes",
        teachers: ["Prof A"],
        banner: "https://minha-url.com/banner.jpg",
      },
    ];

    (useFetchData as jest.Mock).mockReturnValue({
      getCourses: jest.fn().mockReturnValue({ courses: mockCourses }),
    });

    const { container } = render(<Home />);

    const mainBannerDiv = container.querySelector(".w-full.h-140");
    expect(mainBannerDiv).toHaveClass(
      "overflow-hidden",
      "bg-cover",
      "bg-center",
      "bg-no-repeat",
    );

    const h1Element = container.querySelector("h1");
    expect(h1Element).toHaveClass("text-white", "font-bold");
  });
});
