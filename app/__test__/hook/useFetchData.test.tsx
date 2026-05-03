import { renderHook, act, waitFor } from "@testing-library/react";
import useFetchData from "@/app/hook/useFetchData";

global.fetch = jest.fn();

describe("useFetchData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it("deve retornar a função getCourses", () => {
    const { result } = renderHook(() => useFetchData());

    expect(result.current.getCourses).toBeDefined();
    expect(typeof result.current.getCourses).toBe("function");
  });

  it("deve fazer uma requisição para a URL correta", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({
        json: async () => [{ id: 1, name: "Curso 1" }],
      }),
    );

    const { result } = renderHook(() => useFetchData());

    act(() => {
      result.current.getCourses("cursos");
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "https://api.evob.dev/content/cursos",
        {
          headers: { Origin: "http://localhost:3024" },
        },
      );
    });
  });

  it("deve retornar os cursos quando a requisição é bem-sucedida", async () => {
    const mockCourses = [
      { id: 1, name: "Curso 1" },
      { id: 2, name: "Curso 2" },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({
        json: async () => mockCourses,
      }),
    );

    const { result } = renderHook(() => useFetchData());

    let courses;
    await act(async () => {
      courses = await result.current.getCourses("cursos");
    });

    expect(courses).toEqual(mockCourses);
  });

  it("deve retornar um array vazio quando não há cursos", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({
        json: async () => null,
      }),
    );

    const { result } = renderHook(() => useFetchData());

    let courses;
    await act(async () => {
      courses = await result.current.getCourses("cursos");
    });

    expect(courses).toEqual([]);
  });

  it("deve registrar um erro no console quando a requisição falha", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    const mockError = new Error("Erro na requisição");

    (global.fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useFetchData());

    await act(async () => {
      await result.current.getCourses("cursos");
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Erro ao buscar dados do usuário:",
      mockError,
    );
    consoleErrorSpy.mockRestore();
  });

  it("deve fazer requisição com endpoint diferente", async () => {
    const mockCourses = [{ id: 1, name: "Curso Premium" }];

    (global.fetch as jest.Mock).mockResolvedValueOnce(
      Promise.resolve({
        json: async () => mockCourses,
      }),
    );

    const { result } = renderHook(() => useFetchData());

    let courses;
    await act(async () => {
      courses = await result.current.getCourses("cursos-premium");
    });

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.evob.dev/content/cursos-premium",
      {
        headers: { Origin: "http://localhost:3024" },
      },
    );
    expect(courses).toEqual(mockCourses);
  });

  it("deve não retornar nada quando ocorre um erro", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    const { result } = renderHook(() => useFetchData());

    let courses;
    await act(async () => {
      courses = await result.current.getCourses("cursos");
    });

    expect(courses).toBeUndefined();
    consoleErrorSpy.mockRestore();
  });
});
