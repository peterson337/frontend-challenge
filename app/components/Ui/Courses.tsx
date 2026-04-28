"use client";
import Button from "./Button";
import { Course } from "@/app/types/courses";

type Props = {
  allCourses: Course[];
  title: string;
};

export default function Courses(props: Props) {
  const { allCourses, title } = props;

  return (
    <>
      <section className="mt-5 grid md:grid-cols-[repeat(auto-fit,22rem)] justify-center">
        <h2 className="col-span-full mx-5 md:mx-3 my-5 text-2xl md:text-3xl md:my-10 text-left">
          {title}
        </h2>
        <>
          {allCourses.map((course) => (
            <div
              key={course.id}
              className="flex h-96 flex-col overflow-hidden  bg-white mx-5 md:mx-3 mb-5"
            >
              <div
                className="relative flex flex-col items-end justify-end gap-4 bg-cover bg-center p-4 h-48"
                style={{ backgroundImage: `url(${course.banner})` }}
              >
                <div className="absolute z-10 flex items-center justify-center rounded-full p-2 bg-transparent-black top-4 cursor-pointer">
                  <svg
                    width="20"
                    height="20"
                    fill={"none"}
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
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.48393 3.84185C8.39985 3.76418 8.28187 3.72888 8.16642 3.74693C8.05075 3.76491 7.95087 3.83393 7.89721 3.93298C7.71268 4.27374 7.47829 4.58689 7.20252 4.86371C7.23002 4.66374 7.24385 4.46257 7.24385 4.26087C7.24385 3.87385 7.18928 3.47557 7.0816 3.07697C6.72758 1.76772 5.79924 0.660508 4.5347 0.0392489C4.4246 -0.0148215 4.29342 -0.0129231 4.18511 0.0443114C4.07679 0.101569 4.00585 0.206546 3.99613 0.323968C3.89755 1.51375 3.25282 2.59619 2.22627 3.29445C2.21268 3.30375 2.1992 3.31317 2.18571 3.32255C2.15777 3.34198 2.13144 3.36035 2.10683 3.37577C2.10298 3.37821 2.09916 3.3807 2.09541 3.38325C1.44979 3.82263 0.917073 4.40834 0.554786 5.07722C0.186655 5.75759 0 6.4877 0 7.24719C0 7.6341 0.0545662 8.03237 0.162195 8.43105C0.730172 10.5324 2.71961 12 5.00015 12C7.75709 12 10 9.86789 10 7.24719C10 5.95484 9.46159 4.74546 8.48393 3.84185Z"
                        fill="#383838"
                      />
                    </svg>
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
                      fontFamily: "font-family-roboto-condensed",
                      fontWeight: "font-semibold",
                    }}
                    rounded="rounded-none"
                    size="w-full inline-flex items-center justify-center py-3"
                  >
                    Acessar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </>
      </section>
    </>
  );
}
