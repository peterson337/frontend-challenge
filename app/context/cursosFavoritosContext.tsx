"use client";
import { Course } from "@/app/types/courses";

import { createContext, useContext, useMemo, useState } from "react";

type CursosFavoritosContextData = {
  cursosFavoritos: Course[];
  toggleCursoFavorito: (curso: Course) => void;
  isCursoFavorito: (courseId: number) => boolean;
};

const CursosFavoritosContext = createContext<CursosFavoritosContextData | null>(null);

export function CursosFavoritosProvider({children,}: {children: React.ReactNode}) {
  const [cursosFavoritos, setCursosFavoritos] = useState<Course[]>([]);

  function toggleCursoFavorito(curso: Course) {
    setCursosFavoritos((prevState) => {
      const isFavorito = prevState.some((item) => item.id === curso.id);

      if (isFavorito) {
        return prevState.filter((item) => item.id !== curso.id);
      }

      return [...prevState, curso];
    });
  }

  const  isCursoFavorito = (courseId: number) => cursosFavoritos.some((item) => item.id === courseId);
  

  const value = useMemo(() => ({ cursosFavoritos, toggleCursoFavorito, isCursoFavorito }),[cursosFavoritos],);

  return (
    <CursosFavoritosContext.Provider value={value}>
      {children}
    </CursosFavoritosContext.Provider>
  );
}

export function useCursosFavoritos() {
  const context = useContext(CursosFavoritosContext);

  if (!context) {
    throw new Error("useCursosFavoritos precisa ser usado dentro de CursosFavoritosProvider");
  }

  return context;
}
