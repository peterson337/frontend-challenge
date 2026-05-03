import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CourseDetailPage from "@/app/(public)/curso/[slug]/page";
import CourseDetailActions from "@/app/(public)/curso/[slug]/CourseDetailActions";
import useFetchData from "@/app/hook/useFetchData";
import { useCursosFavoritos } from "@/app/context/cursosFavoritosContext";
import { useRouter } from "next/navigation";

// Mock do React use para params
jest.mock("react", () => {
  const ActualReact = jest.requireActual("react");
  return {
    ...ActualReact,
    use: (p: unknown) => p,
  };
});

jest.mock("@/app/hook/useFetchData");
jest.mock("@/app/context/cursosFavoritosContext");
jest.mock("next/navigation");

jest.mock("@/app/components/Ui/Button", () => {
  return function MockButton({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) {
    return <button onClick={onClick}>{children}</button>;
  };
});

jest.mock("@/app/components/Ui/Modal", () => {
  return function MockModal({
    setIsOpenModal,
  }: {
    setIsOpenModal: (open: boolean) => void;
  }) {
    return (
      <div data-testid="mock-modal">
        <button onClick={() => setIsOpenModal(false)}>Close Modal</button>
      </div>
    );
  };
});

jest.mock("@/app/components/icons/Share", () => {
  return function MockShare() {
    return <span data-testid="share-icon">Share</span>;
  };
});

jest.mock("@/app/components/icons/Heart", () => {
  return function MockHeart({
    fill,
    stroke,
  }: {
    fill: string;
    stroke: string;
  }) {
    return (
      <span data-testid="heart-icon" data-fill={fill} data-stroke={stroke}>
        Heart
      </span>
    );
  };
});

interface MockCourse {
  id: number;
  title: string;
  slug: string;
  teachers: [];
  banner: string;
  long_description: string;
}

describe("Course Detail Page and Component", () => {
  const mockCourse: MockCourse = {
    id: 1,
    title: "Curso de React Avançado",
    slug: "curso-react-avancado",
    teachers: [],
    banner: "https://exemplo.com/banner.jpg",
    long_description:
      "<p>Aprenda React com <strong>tags HTML</strong></p><p>Segunda linha</p>",
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
    (useCursosFavoritos as jest.Mock).mockReturnValue({
      isCursoFavorito: () => false,
      toggleCursoFavorito: jest.fn(),
    });
  });

  describe("CourseDetailPage", () => {
    it("deve renderizar o banner com a URL correta", async () => {
      (useFetchData as jest.Mock).mockReturnValue({
        getCourses: jest.fn().mockReturnValue(mockCourse),
      });

      const { container } = render(
        <CourseDetailPage
          params={Promise.resolve({ slug: "curso-react-avancado" })}
        />,
      );

      await waitFor(() => {
        const bannerDiv = container.querySelector(".bg-cover");
        expect(bannerDiv).toHaveStyle(
          `background-image: url(${mockCourse.banner})`,
        );
      });
    });

    it("deve renderizar CourseDetailActions com dados corretos", async () => {
      (useFetchData as jest.Mock).mockReturnValue({
        getCourses: jest.fn().mockReturnValue(mockCourse),
      });

      render(
        <CourseDetailPage
          params={Promise.resolve({ slug: "curso-react-avancado" })}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
      });
    });
  });

  describe("CourseDetailActions", () => {
    it("deve renderizar o título do curso", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    });

    it("deve renderizar descrição sem tags HTML", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      expect(
        screen.getByText(/Aprenda React com tags HTML/),
      ).toBeInTheDocument();
      expect(screen.queryByText("<p>")).not.toBeInTheDocument();
      expect(screen.queryByText("<strong>")).not.toBeInTheDocument();
    });

    it("deve chamar toggleCursoFavorito ao clicar no botão de favorito", () => {
      const mockToggleFavorito = jest.fn();
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: mockToggleFavorito,
      });

      render(<CourseDetailActions course={mockCourse} />);

      const buttons = screen.getAllByRole("button");
      const favButton = buttons[0];
      fireEvent.click(favButton);

      expect(mockToggleFavorito).toHaveBeenCalledWith(mockCourse);
    });

    it("deve exibir 'Favoritado' quando curso está nos favoritos", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => true,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      expect(screen.getByText("Favoritado")).toBeInTheDocument();
    });

    it("deve exibir 'Favoritar' quando curso não está nos favoritos", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      expect(screen.getByText("Favoritar")).toBeInTheDocument();
    });

    it("deve renderizar ícone Heart com cor vermelha quando favorito", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => true,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      const heart = screen.getByTestId("heart-icon");
      expect(heart).toHaveAttribute("data-fill", "red");
      expect(heart).toHaveAttribute("data-stroke", "red");
    });

    it("deve renderizar ícone Heart sem cor quando não é favorito", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      const heart = screen.getByTestId("heart-icon");
      expect(heart).toHaveAttribute("data-fill", "none");
      expect(heart).toHaveAttribute("data-stroke", "#272727");
    });

    it("deve possibilitar abrir o Modal ao clicar no ícone de compartilhar", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      const shareButtons = screen.getAllByRole("button");
      const shareButton = shareButtons[shareButtons.length - 1]; // Último botão
      fireEvent.click(shareButton);

      expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    });

    it("deve navegar para cadastro ao clicar em 'Iniciar curso'", () => {
      const mockPush = jest.fn();
      (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
      });

      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      const buttons = screen.getAllByRole("button");
      const startCourseButton = buttons[1]; // Segundo botão
      fireEvent.click(startCourseButton);

      expect(mockPush).toHaveBeenCalledWith("/cadastro");
    });

    it("deve renderizar a descrição longa corretamente", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      const courseWithLongDescription = {
        ...mockCourse,
        long_description:
          "<p>Descrição do curso</p><p>Segunda seção</p><p>Terceira seção</p>",
      };

      render(<CourseDetailActions course={courseWithLongDescription} />);

      // Verifica cada seção separadamente
      expect(screen.getByText(/Descrição do curso/)).toBeInTheDocument();
      expect(screen.getByText(/Segunda seção/)).toBeInTheDocument();
      expect(screen.getByText(/Terceira seção/)).toBeInTheDocument();
    });

    it("deve renderizar ícone de compartilhar", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      render(<CourseDetailActions course={mockCourse} />);

      expect(screen.getByTestId("share-icon")).toBeInTheDocument();
    });

    it("deve tratar descrição vazia corretamente", () => {
      (useCursosFavoritos as jest.Mock).mockReturnValue({
        isCursoFavorito: () => false,
        toggleCursoFavorito: jest.fn(),
      });

      const courseWithoutDescription = {
        ...mockCourse,
        long_description: undefined,
      };

      render(<CourseDetailActions course={courseWithoutDescription} />);

      // Deve renderizar sem erros mesmo com descrição undefined
      expect(screen.getByText(mockCourse.title)).toBeInTheDocument();
    });
  });
});
