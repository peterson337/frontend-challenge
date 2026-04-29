import { Course } from "@/app/types/courses";

// Recebe o endpoint da API no primeiro parâmetro e, no segundo, o objeto que pode conter os dados da resposta da API, caso exista.
export default function useFetchData() {
  async function getCourses(endpoint: string, dataKey: string | null) {
    try {
      const res = await fetch(`https://api.evob.dev/content/${endpoint}`, {
        headers: { Origin: "http://localhost:3024" },
      });

      const courses = await res.json();

      const coursesData = dataKey
        ? courses[dataKey]
        : courses.map((item: Course) => ({
            title: item.title,
            slug: item.slug,
            teachers: item.teachers,
            banner: item.banner,
            id: item.id,
          }));

      return coursesData;
    } catch (error: unknown) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }

  return { getCourses };
}
