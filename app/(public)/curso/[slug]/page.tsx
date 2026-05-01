import { use } from "react";
import useFetchData from "@/app/hook/useFetchData";
import CourseDetailActions from "@/app/(public)/curso/[slug]/CourseDetailActions";

type CourseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  // Função utilitária para realizar requisições à API, recebendo o endpoint como parâmetro.
  const { getCourses } = useFetchData();
  const { slug: urlAmigavel } = use(params);

  const fetchData = use(getCourses(`courses/${urlAmigavel}`));

  // Extrai apenas os dados necessários da resposta da API para serem utilizados na aplicação
  const { title, banner, long_description, id, slug, teachers } = fetchData;

  const courseData = {
    id,
    title,
    banner,
    slug,
    teachers,
    long_description,
  };

  return (
    <>
      {courseData ? (
        <section className="h-[68dvh] md:h-auto ">
          {/* Banner do curso */}
          <div
            className="h-42.5 md:h-135 w-full bg-cover  bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          />
          <CourseDetailActions course={courseData} />
        </section>
      ) : (
        <div>Curso não encontrado</div>
      )}
    </>
  );
}
