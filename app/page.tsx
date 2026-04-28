import Courses from "./components/layout/Courses";

async function getCourses() {
  const res = await fetch("https://api.evob.dev/content/courses", {
    headers: { Origin: "http://localhost:3024" },
  });

  return res.json();
}

export default async function Home() {
  const coursesData = await getCourses();

  return <Courses coursesData={coursesData.courses} />;
}
