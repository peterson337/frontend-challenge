import { use } from "react";
import Courses from "./components/Ui/Courses";
import Button from "./components/Ui/Button";
import useFetchData from "@/app/hook/useFetchData";

export default function Home() {
  // Recebe o endpoint da API no primeiro parâmetro e, no segundo, o objeto que pode conter os dados da resposta da API, caso exista.
  const { getCourses } = useFetchData();

  const coursesData = use(getCourses("courses", "courses"));

  const [firstCourse, ...otherCourses] = coursesData;

  if (!firstCourse) return null;

  return (
    <>
      <div
        className="w-full h-140 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${firstCourse.banner})` }}
      >
        <div className="flex h-full flex-col items-stretch justify-center gap-5 md:gap-20 px-5 py-10 mt-10 md:mt-20">
          <h1 className="max-w-full wrap-break-word  text-[32px] font-bold leading-[1.2] text-white">
            {firstCourse.title}
          </h1>

          <div>
            <Button
              colorButton={{
                backgroundColor: "bg-black",
                textColor: "text-white",
                hover: true,
                fontFamily: "font-family-roboto-condensed",
                fontWeight: "font-semibold",
              }}
              rounded="rounded-none"
              size="px-10 py-4"
            >
              Conheça as aulas
            </Button>
          </div>
        </div>
      </div>

      {/* Exibe todos os cursos */}
      <Courses
        allCourses={otherCourses}
        title="Meus cursos"
        isFavoriteList={false}
      />

      {/* Exibe os cursos favoritos */}
      <Courses title="Meus favoritos" isFavoriteList={true} />
    </>
  );
}
