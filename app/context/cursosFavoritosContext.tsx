"use client";
import { Course } from "@/app/types/courses";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type CursosFavoritosContextData = {
  cursosFavoritos: Course[];
  setCursosFavoritos: React.Dispatch<React.SetStateAction<Course[]>>;
  isCursoFavorito: (courseId: number) => boolean;
};

const CursosFavoritosContext = createContext<CursosFavoritosContextData | null>(
  null,
);

export function CursosFavoritosProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cursosFavoritos, setCursosFavoritos] = useState<Course[]>([]);

  const isCursoFavorito = useCallback(
    (courseId: number) => cursosFavoritos.some((item) => item.id === courseId),
    [cursosFavoritos],
  );

  const value = useMemo(
    () => ({ cursosFavoritos, setCursosFavoritos, isCursoFavorito }),
    [cursosFavoritos, isCursoFavorito],
  );

  return (
    <CursosFavoritosContext.Provider value={value}>
      {children}
    </CursosFavoritosContext.Provider>
  );
}

export function useCursosFavoritos() {
  const context = useContext(CursosFavoritosContext);

  if (!context) {
    throw new Error(
      "useCursosFavoritos precisa ser usado dentro de CursosFavoritosProvider",
    );
  }

  return context;
}
