// Função utilitária para realizar requisições à API, recebendo o endpoint como parâmetro.
export default function useFetchData() {
  async function getCourses(endpoint: string) {
    try {
      const res = await fetch(`https://api.evob.dev/content/${endpoint}`, {
        headers: { Origin: "http://localhost:3024" },
      });

      const courses = await res.json();

      return courses || [];
    } catch (error: unknown) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  }

  return { getCourses };
}
