import { use } from "react";
import useFetchData from "@/app/hook/useFetchData";
import CourseDetailActions from "@/app/(main)/curso/[slug]/CourseDetailActions";
type CourseDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  // Função utilitária para realizar requisições à API, recebendo o endpoint como parâmetro.
  const { getCourses } = useFetchData();
  const { slug } = use(params);

  const courseData = use(getCourses(`courses/${slug}`));

  // Extrai apenas os dados necessários da resposta da API para serem utilizados na aplicação
  const { title, banner, long_description } = courseData;

  return (
    <>
      {courseData ? (
        <>
          {/* Banner do curso */}
          <div
            className="h-[170px] md:h-[540px] w-full bg-cover bg-contain  bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          />
          <CourseDetailActions
            title={title}
            long_description={long_description}
          />
        </>
      ) : (
        <div>Curso não encontrado</div>
      )}
    </>
  );
}
