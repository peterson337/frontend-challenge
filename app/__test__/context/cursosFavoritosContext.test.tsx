import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import {
  CursosFavoritosProvider,
  useCursosFavoritos,
} from "@/app/context/cursosFavoritosContext";
import { Course } from "@/app/types/courses";

describe("cursosFavoritosContext", () => {
  const mockCourse1: Course = {
    id: 1,
    title: "Curso React",
    slug: "curso-react",
    teachers: [],
    banner: "banner1.jpg",
    long_description: "Aprenda React",
  };

  const mockCourse2: Course = {
    id: 2,
    title: "Curso TypeScript",
    slug: "curso-typescript",
    teachers: [],
    banner: "banner2.jpg",
    long_description: "Aprenda TypeScript",
  };

  describe("CursosFavoritosProvider", () => {
    it("deve renderizar o provider", () => {
      const { container } = render(
        <CursosFavoritosProvider>
          <div data-testid="test-child">Conteúdo</div>
        </CursosFavoritosProvider>,
      );

      expect(screen.getByTestId("test-child")).toBeInTheDocument();
    });

    it("deve renderizar os filhos corretamente", () => {
      render(
        <CursosFavoritosProvider>
          <div data-testid="child-content">Teste de conteúdo</div>
        </CursosFavoritosProvider>,
      );

      expect(screen.getByText("Teste de conteúdo")).toBeInTheDocument();
    });
  });

  describe("useCursosFavoritos", () => {
    it("deve retornar os valores iniciais do contexto", () => {
      function TestComponent() {
        const { cursosFavoritos, searchTerm } = useCursosFavoritos();

        return (
          <div>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
            <div data-testid="search-term">{searchTerm}</div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      expect(screen.getByTestId("cursos-count")).toHaveTextContent("0");
      expect(screen.getByTestId("search-term")).toHaveTextContent("");
    });

    it("deve adicionar um curso aos favoritos", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito } = useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => toggleCursoFavorito(mockCourse1)}
              data-testid="add-button"
            >
              Adicionar
            </button>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
            <div data-testid="cursos-list">
              {cursosFavoritos.map((curso) => (
                <div key={curso.id} data-testid={`curso-${curso.id}`}>
                  {curso.title}
                </div>
              ))}
            </div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      const button = screen.getByTestId("add-button");
      fireEvent.click(button);

      expect(screen.getByTestId("cursos-count")).toHaveTextContent("1");
      expect(screen.getByTestId("curso-1")).toHaveTextContent("Curso React");
    });

    it("deve remover um curso dos favoritos", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito } = useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => toggleCursoFavorito(mockCourse1)}
              data-testid="toggle-button"
            >
              Toggle
            </button>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      const button = screen.getByTestId("toggle-button");

      // Adicionar
      fireEvent.click(button);
      expect(screen.getByTestId("cursos-count")).toHaveTextContent("1");

      // Remover
      fireEvent.click(button);
      expect(screen.getByTestId("cursos-count")).toHaveTextContent("0");
    });

    it("deve verificar se um curso é favorito", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito, isCursoFavorito } =
          useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => toggleCursoFavorito(mockCourse1)}
              data-testid="toggle-button"
            >
              Toggle
            </button>
            <div data-testid="is-favorito">
              {isCursoFavorito(1) ? "sim" : "não"}
            </div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      expect(screen.getByTestId("is-favorito")).toHaveTextContent("não");
      fireEvent.click(screen.getByTestId("toggle-button"));
      expect(screen.getByTestId("is-favorito")).toHaveTextContent("sim");
    });

    it("deve adicionar múltiplos cursos aos favoritos", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito } = useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => toggleCursoFavorito(mockCourse1)}
              data-testid="add-course-1"
            >
              Adicionar Curso 1
            </button>
            <button
              onClick={() => toggleCursoFavorito(mockCourse2)}
              data-testid="add-course-2"
            >
              Adicionar Curso 2
            </button>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      fireEvent.click(screen.getByTestId("add-course-1"));
      fireEvent.click(screen.getByTestId("add-course-2"));

      expect(screen.getByTestId("cursos-count")).toHaveTextContent("2");
    });

    it("deve atualizar o termo de busca", () => {
      function TestComponent() {
        const { searchTerm, setSearchTerm } = useCursosFavoritos();

        return (
          <div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-testid="search-input"
            />
            <div data-testid="search-term">{searchTerm}</div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      const input = screen.getByTestId("search-input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "React" } });

      expect(screen.getByTestId("search-term")).toHaveTextContent("React");
    });

    it("deve lançar erro quando usado fora do provider", () => {
      function TestComponent() {
        useCursosFavoritos();
        return null;
      }

      // Suprimir erros de console para o teste
      const spy = jest.spyOn(console, "error").mockImplementation();

      expect(() => {
        render(<TestComponent />);
      }).toThrow(
        "useCursosFavoritos precisa ser usado dentro de CursosFavoritosProvider",
      );

      spy.mockRestore();
    });

    it("deve não duplicar cursos ao adicionar o mesmo curso duas vezes", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito } = useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => {
                toggleCursoFavorito(mockCourse1);
              }}
              data-testid="toggle-button"
            >
              Toggle
            </button>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      const button = screen.getByTestId("toggle-button");

      // Adicionar a primeira vez
      fireEvent.click(button);
      expect(screen.getByTestId("cursos-count")).toHaveTextContent("1");

      // Tentar adicionar novamente (remover)
      fireEvent.click(button);
      expect(screen.getByTestId("cursos-count")).toHaveTextContent("0");
    });

    it("deve manter os cursos favoritos após múltiplas operações", () => {
      function TestComponent() {
        const { cursosFavoritos, toggleCursoFavorito } = useCursosFavoritos();

        return (
          <div>
            <button
              onClick={() => toggleCursoFavorito(mockCourse1)}
              data-testid="toggle-1"
            >
              Toggle 1
            </button>
            <button
              onClick={() => toggleCursoFavorito(mockCourse2)}
              data-testid="toggle-2"
            >
              Toggle 2
            </button>
            <div data-testid="cursos-count">{cursosFavoritos.length}</div>
            <div data-testid="cursos-ids">
              {cursosFavoritos.map((c) => c.id).join(",")}
            </div>
          </div>
        );
      }

      render(
        <CursosFavoritosProvider>
          <TestComponent />
        </CursosFavoritosProvider>,
      );

      // Adicionar curso 1
      fireEvent.click(screen.getByTestId("toggle-1"));
      expect(screen.getByTestId("cursos-ids")).toHaveTextContent("1");

      // Adicionar curso 2
      fireEvent.click(screen.getByTestId("toggle-2"));
      expect(screen.getByTestId("cursos-ids")).toHaveTextContent("1,2");

      // Remover curso 1
      fireEvent.click(screen.getByTestId("toggle-1"));
      expect(screen.getByTestId("cursos-ids")).toHaveTextContent("2");
    });
  });
});
