"use client";
import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useCursosFavoritos } from "@/app/context/cursosFavoritosContext";
import { Course } from "@/app/types/courses";
import Fire from "@/app/components/icons/Fire";
import CourseNotFound from "@/app/components/icons/CourseNotFound";
import HeartSearch from "@/app/components/icons/HeartSearch";

type Props = {
  allCourses?: Course[];
  isFavoriteList?: boolean;
  title: string;
};

export default function Courses(props: Props) {
  const { allCourses, isFavoriteList, title } = props;
  const router = useRouter();
  const {
    cursosFavoritos,
    isCursoFavorito,
    toggleCursoFavorito,
    searchTerm,
    setSearchTerm,
  } = useCursosFavoritos();

  const baseCourses = useMemo(() => {
    return isFavoriteList
      ? cursosFavoritos
      : (allCourses || []).filter((course) => !isCursoFavorito(course.id));
  }, [isFavoriteList, cursosFavoritos, allCourses]);

  const normalizedSearchTerm = searchTerm.toLowerCase();

  const coursesToRender = useMemo(() => {
    return baseCourses.filter((course) =>
      course.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [baseCourses, normalizedSearchTerm]);

  const hasMatchingFavorite = useMemo(() => {
    return cursosFavoritos.some((course) =>
      course.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }, [cursosFavoritos, normalizedSearchTerm]);

  const shouldShowNotFound =
    !isFavoriteList &&
    searchTerm !== "" &&
    coursesToRender.length === 0 &&
    !hasMatchingFavorite;

  const isEmptySearch = searchTerm !== "" && coursesToRender.length === 0;

  if (isFavoriteList && isEmptySearch) {
    return null;
  }
  return (
    <>
      <section className="mt-5 grid md:grid-cols-[repeat(auto-fit,22rem)] justify-center">
        {!isFavoriteList && (
          <div className="col-span-full mx-5 md:mx-3 my-5 text-2xl md:text-3xl md:my-10 text-left w-[90%] md:w-1/2">
            <label>Digite o nome do curso</label>
            <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] mt-4">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Pesquisar"
                className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
              />
            </div>
          </div>
        )}

        <div className="col-span-full mx-5 md:mx-3 my-5 text-2xl md:text-3xl md:my-10 text-left">
          <h2>{isEmptySearch ? "" : title}</h2>
        </div>

        {(coursesToRender.length > 0 && isFavoriteList) || !isFavoriteList ? (
          <>
            {coursesToRender.length > 0 ? (
              coursesToRender.map((course) => (
                <div
                  key={course.id}
                  className="flex h-104 flex-col overflow-hidden  bg-white mx-5 md:mx-3 mb-5"
                >
                  <div
                    className="relative flex flex-col items-end justify-end gap-4 bg-cover bg-center p-4 h-48"
                    style={{ backgroundImage: `url(${course.banner})` }}
                  >
                    <div
                      className="absolute z-10 flex items-center justify-center rounded-full p-2 bg-transparent-black top-4 cursor-pointer"
                      onClick={() => toggleCursoFavorito(course)}
                    >
                      <svg
                        width="20"
                        height="20"
                        fill={isCursoFavorito(course.id) ? "#D9D9D9" : "none"}
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.5166 17.3417C10.2333 17.4417 9.76663 17.4417 9.48329 17.3417C7.06663 16.5167 1.66663 13.075 1.66663 7.24166C1.66663 4.66666 3.74163 2.58333 6.29996 2.58333C7.81663 2.58333 9.15829 3.31666 9.99996 4.45C10.8416 3.31666 12.1916 2.58333 13.7 2.58333C16.2583 2.58333 18.3333 4.66666 18.3333 7.24166C18.3333 13.075 12.9333 16.5167 10.5166 17.3417Z"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10 flex gap-2  w-full">
                      <div className="flex items-center justify-center p-1 bg-rose-red w-5.5 h-5.5">
                        <Fire />
                      </div>

                      <div className=" bg-dark-gray px-3 py-1 w-18 h-[1.35rem] text-center">
                        <p className="text-white  font-quattrocento text-[12px] leading-[1.20] tracking-wider">
                          ONLINE
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col items-center justify-between bg-white p-4">
                    <div className="w-full">
                      <h2 className="w-full text-left text-2xl font-normal leading-[1.16] text-[#090909]">
                        {course.title}
                      </h2>
                      <p className="mt-3 w-full text-left text-sm font-normal leading-[1.4] text-[#090909]">
                        {course.teachers.length === 0
                          ? "Professor não especificado"
                          : course.teachers}
                      </p>
                    </div>

                    <div className="w-full">
                      <Button
                        colorButton={{
                          backgroundColor: "bg-purple",
                          textColor: "text-white",
                          hover: true,
                        }}
                        rounded="rounded-none"
                        size="w-full inline-flex items-center justify-center py-3"
                        fontFamily="font-family-roboto-condensed"
                        fontWeight="font-semibold"
                        onClick={() => router.push(`curso/${course.slug}`)}
                      >
                        Acessar
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : shouldShowNotFound ? (
              <div className="col-span-full flex flex-col items-center justify-center my-10 px-5">
                <div className="mb-6">
                  <CourseNotFound />
                </div>
                <h2 className="text-[24px] md:text-[32px] font-bold text-[#090909] text-center leading-tight">
                  Nenhum curso encontrado
                </h2>
                <div className="mt-4 flex flex-col items-center gap-1.5">
                  <p className="text-[#6B7280] text-[16px] md:text-[18px] text-center">
                    {`Não encontramos cursos com esse nome: ${searchTerm}.`}
                  </p>
                  <p className="text-[#6B7280] text-[16px] md:text-[18px] text-center">
                    Tente buscar por outro termo.
                  </p>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="col-span-full flex  items-center justify-center">
            <div className="flex w-70.5 flex-col items-center gap-2.5 p-6">
              <div className="flex items-center gap-2.5 rounded-full border border-[#E4E0E0] bg-white p-2">
                <HeartSearch />
              </div>
              <p className="h-9.75 w-full text-center text-[14px] font-normal leading-[116%] text-[#666666]">
                Parece que você ainda não tem cursos favoritados
              </p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
