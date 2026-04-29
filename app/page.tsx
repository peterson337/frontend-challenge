import { use } from "react";
import Courses from "./components/Ui/Courses";
import Button from "./components/Ui/Button";
import { Course } from "@/app/types/courses";

export default function Home() {
  async function getCourses() {
    const res = await fetch("https://api.evob.dev/content/courses", {
      headers: { Origin: "http://localhost:3024" },
    });

    const courses = await res.json();

    const coursesData = courses.courses.map((item: Course) => ({
      title: item.title,
      slug: item.slug,
      teachers: item.teachers,
      banner: item.banner,
      id: item.id,
    }));

    return coursesData;
  }

  const coursesData = use(getCourses());

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

      {/* Todos os cursos */}
      <Courses
        allCourses={otherCourses}
        title="Meus cursos"
        isFavoriteList={false}
      />

      {/* Cursos favoritos */}
      <Courses title="Meus favoritos" isFavoriteList={true} />
    </>
  );
}
