"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { useCursosFavoritos } from "@/app/context/cursosFavoritosContext";
import { Course } from "@/app/types/courses";
import Fire from "@/app/components/icons/Fire";
import HeartSearch from "@/app/components/icons/HeartSearch";

type Props = {
  allCourses?: Course[];
  isFavoriteList?: boolean;
  title: string;
};

export default function Courses(props: Props) {
  const { allCourses, isFavoriteList, title } = props;
  const router = useRouter();
  const { cursosFavoritos, isCursoFavorito, setCursosFavoritos } =
    useCursosFavoritos();

  function toggleCursoFavorito(curso: Course) {
    const isFavorito = isCursoFavorito(curso.id);

    setCursosFavoritos((prevState) => {
      if (isFavorito) {
        return prevState.filter((item) => item.id !== curso.id);
      }

      return [...prevState, curso];
    });
  }

  const coursesToRender = isFavoriteList
    ? cursosFavoritos
    : (allCourses || []).filter((course) => !isCursoFavorito(course.id));

  return (
    <>
      <section className="mt-5 grid md:grid-cols-[repeat(auto-fit,22rem)] justify-center">
        <h2 className="col-span-full mx-5 md:mx-3 my-5 text-2xl md:text-3xl md:my-10 text-left">
          {title}
        </h2>
        {(coursesToRender.length > 0 && isFavoriteList) || !isFavoriteList ? (
          <>
            {coursesToRender.map((course) => (
              <div
                key={course.id}
                className="flex h-96 flex-col overflow-hidden  bg-white mx-5 md:mx-3 mb-5"
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
                      {course.teachers}
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
            ))}
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
