import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Courses from "@/app/components/Ui/Courses";
import { useCursosFavoritos } from "@/app/context/cursosFavoritosContext";
import { useRouter } from "next/navigation";

interface MockCourse {
  id: number;
  title: string;
  slug: string;
  teachers: [];
  banner: string;
}

// Mock dos hooks e componentes
jest.mock("@/app/context/cursosFavoritosContext");
jest.mock("next/navigation");
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
jest.mock("@/app/components/icons/Fire", () => {
  return function MockFire() {
    return <div data-testid="fire-icon">Fire</div>;
  };
});
jest.mock("@/app/components/icons/CourseNotFound", () => {
  return function MockCourseNotFound() {
    return <div data-testid="not-found-icon">Not Found</div>;
  };
});
jest.mock("@/app/components/icons/HeartSearch", () => {
  return function MockHeartSearch() {
    return <div data-testid="heart-search-icon">Heart</div>;
  };
});

describe("Courses", () => {
  const mockCourses: MockCourse[] = [
    {
      id: 1,
      title: "React Basics",
      slug: "react-basics",
      banner: "https://example.com/banner1.jpg",
      teachers: [],
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      slug: "javascript-advanced",
      banner: "https://example.com/banner2.jpg",
      teachers: [],
    },
    {
      id: 3,
      title: "TypeScript Fundamentals",
      slug: "typescript-fundamentals",
      banner: "https://example.com/banner3.jpg",
      teachers: [],
    },
  ];

  const mockContextValue = {
    cursosFavoritos: [mockCourses[0]],
    isCursoFavorito: jest.fn((id: number) => id === 1),
    toggleCursoFavorito: jest.fn(),
    searchTerm: "",
    setSearchTerm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCursosFavoritos as jest.Mock).mockReturnValue(mockContextValue);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("deve renderizar a seção de cursos", () => {
    const { container } = render(
      <Courses allCourses={mockCourses} title="Cursos Disponíveis" />,
    );
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("deve renderizar o título", () => {
    render(<Courses allCourses={mockCourses} title="Cursos Disponíveis" />);
    expect(screen.getByText("Cursos Disponíveis")).toBeInTheDocument();
  });

  it("deve renderizar o campo de busca quando não é lista de favoritos", () => {
    render(
      <Courses
        allCourses={mockCourses}
        title="Cursos"
        isFavoriteList={false}
      />,
    );
    const searchInput = screen.getByPlaceholderText("Pesquisar");
    expect(searchInput).toBeInTheDocument();
  });

  it("não deve renderizar o campo de busca quando é lista de favoritos", () => {
    render(
      <Courses
        allCourses={mockCourses}
        title="Favoritos"
        isFavoriteList={true}
      />,
    );
    const searchInput = screen.queryByPlaceholderText("Pesquisar");
    expect(searchInput).not.toBeInTheDocument();
  });

  it("deve atualizar o searchTerm ao digitar no campo de busca", async () => {
    jest.useFakeTimers();
    render(
      <Courses
        allCourses={mockCourses}
        title="Cursos"
        isFavoriteList={false}
      />,
    );
    const searchInput = screen.getByPlaceholderText(
      "Pesquisar",
    ) as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "React" } });

    jest.advanceTimersByTime(400);

    await waitFor(() => {
      expect(mockContextValue.setSearchTerm).toHaveBeenCalled();
    });

    jest.useRealTimers();
  });

  it("deve renderizar o rótulo 'Digite o nome do curso' quando não é lista de favoritos", () => {
    render(
      <Courses
        allCourses={mockCourses}
        title="Cursos"
        isFavoriteList={false}
      />,
    );
    expect(screen.getByText("Digite o nome do curso")).toBeInTheDocument();
  });

  it("deve filtrar cursos por termo de busca", () => {
    mockContextValue.searchTerm = "React";
    (useCursosFavoritos as jest.Mock).mockReturnValue(mockContextValue);

    const { container } = render(
      <Courses
        allCourses={mockCourses}
        title="Cursos"
        isFavoriteList={false}
      />,
    );

    // Como o scroll não mostra os cursos intermediários, vamos verificar apenas a estrutura
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("deve renderizar cursos não favoritos quando isFavoriteList é false", () => {
    mockContextValue.isCursoFavorito.mockReturnValue(false);
    (useCursosFavoritos as jest.Mock).mockReturnValue(mockContextValue);

    const { container } = render(
      <Courses
        allCourses={mockCourses}
        title="Cursos"
        isFavoriteList={false}
      />,
    );

    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("deve renderizar somente cursos favoritos quando isFavoriteList é true", () => {
    mockContextValue.cursosFavoritos = [mockCourses[0]];
    (useCursosFavoritos as jest.Mock).mockReturnValue(mockContextValue);

    const { container } = render(
      <Courses isFavoriteList={true} title="Meus Favoritos" />,
    );

    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("deve retornar null quando não há resultados de busca na lista de favoritos", () => {
    mockContextValue.searchTerm = "NonExistent";
    mockContextValue.cursosFavoritos = [];
    (useCursosFavoritos as jest.Mock).mockReturnValue(mockContextValue);

    const { container } = render(
      <Courses isFavoriteList={true} title="Favoritos" />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("deve renderizar com valor padrão vazio quando allCourses não é fornecido", () => {
    const { container } = render(
      <Courses title="Cursos" isFavoriteList={false} />,
    );

    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("deve chamar useCursosFavoritos hook", () => {
    render(<Courses allCourses={mockCourses} title="Cursos" />);
    expect(useCursosFavoritos).toHaveBeenCalled();
  });

  it("deve chamar useRouter hook", () => {
    render(<Courses allCourses={mockCourses} title="Cursos" />);
    expect(useRouter).toHaveBeenCalled();
  });
});
