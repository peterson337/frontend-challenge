import { use } from "react";
import useFetchData from "@/app/hook/useFetchData";
import Button from "@/app/components/Ui/Button";
import Image from 'next/image'

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

  // Função utilitária para remover tags HTML de uma string
  function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <>
      {courseData ? (
        <>
          {/* Banner do curso */}
          <div
            className="h-[170px] md:h-[540px] w-full bg-cover bg-contain  bg-no-repeat"
            style={{ backgroundImage: `url(${banner})` }}
          />

          <div className="flex flex-col items-stretch gap-4 p-6 w-full md:px-[60px] md:py-[48px]">

            <div className="flex flex-col gap-3 md:flex-row-reverse justify-between">

              <div className="md:flex  md:gap-1 md:flex-row">
                <Button
              colorButton={{
                backgroundColor: "bg-white",
                textColor: "text-black",
                hover: false,
              }}
              rounded="rounded-sm"
              width="w-full md:w-[114px]"
              border="border border-[#D4D9EB]"
              heigth="h-[31px]"
            >
              <span className="flex flex-row justify-center items-center gap-[6px]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.5166 17.3417C10.2333 17.4417 9.76663 17.4417 9.48329 17.3417C7.06663 16.5167 1.66663 13.075 1.66663 7.24166C1.66663 4.66666 3.74163 2.58333 6.29996 2.58333C7.81663 2.58333 9.15829 3.31666 9.99996 4.45C10.8416 3.31666 12.1916 2.58333 13.7 2.58333C16.2583 2.58333 18.3333 4.66666 18.3333 7.24166C18.3333 13.075 12.9333 16.5167 10.5166 17.3417Z"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-sembold text-xs text-left text-[#272727]">
                  Favoritar
                </span>
              </span>
              
            </Button>

                <Button
              colorButton={{
                backgroundColor: "bg-purple",
                textColor: "text-white",
                hover: false,
              }}
              rounded="rounded-sm"
              size="pb-1"
              width="w-full md:w-[114px]"
              display="hidden md:block"
              heigth="h-[31px]"
            >
                <span className="font-sembold text-xs text-left text-white">
                  Iniciar curso
                </span>
            </Button>
              </div>
              <p className="font-semibold text-2xl leading-[116%] text-left text-[#252525] m-0 md:text-[32px]">
                {title}
              </p>
            </div>

              <p className="font-normal text-base leading-[116%] md:text-[20px] text-left text-[#252525] m-0 md:w-[1023px] md:h-[138px]">
                {stripHtmlTags(long_description)}
              </p>

            <div className="fixed bottom-96 right-4 md:bottom-20 md:right-18">
              <Button
              colorButton={{
                backgroundColor: "bg-white",
                textColor: "text-black",
                hover: false,
              }}
              rounded="rounded-button-circle"
              shadow="shadow-custom"
              size="w-[56px] h-[56px]"
            >
              <span className="flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M18 3C16.8954 3 16 3.89543 16 5C16 6.10457 16.8954 7 18 7C19.1046 7 20 6.10457 20 5C20 3.89543 19.1046 3 18 3ZM14 5C14 2.79086 15.7909 1 18 1C20.2091 1 22 2.79086 22 5C22 7.20914 20.2091 9 18 9C15.7909 9 14 7.20914 14 5Z" fill="#362828"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6 10C4.89543 10 4 10.8954 4 12C4 13.1046 4.89543 14 6 14C7.10457 14 8 13.1046 8 12C8 10.8954 7.10457 10 6 10ZM2 12C2 9.79086 3.79086 8 6 8C8.20914 8 10 9.79086 10 12C10 14.2091 8.20914 16 6 16C3.79086 16 2 14.2091 2 12Z" fill="#362828"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M18 17C16.8954 17 16 17.8954 16 19C16 20.1046 16.8954 21 18 21C19.1046 21 20 20.1046 20 19C20 17.8954 19.1046 17 18 17ZM14 19C14 16.7909 15.7909 15 18 15C20.2091 15 22 16.7909 22 19C22 21.2091 20.2091 23 18 23C15.7909 23 14 21.2091 14 19Z" fill="#362828"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M7.726 13.0065C8.00406 12.5293 8.61631 12.3679 9.09348 12.646L15.9235 16.626C16.4007 16.9041 16.5621 17.5163 16.284 17.9935C16.006 18.4707 15.3937 18.6321 14.9165 18.354L8.08653 14.374C7.60935 14.096 7.44794 13.4837 7.726 13.0065Z" fill="#362828"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M16.2737 6.00598C16.5521 6.48298 16.391 7.09532 15.914 7.37369L9.09403 11.3537C8.61703 11.6321 8.00469 11.471 7.72632 10.994C7.44795 10.517 7.60898 9.90468 8.08598 9.62632L14.906 5.64632C15.383 5.36795 15.9953 5.52897 16.2737 6.00598Z" fill="#362828"/>
              </svg>
              </span>
            </Button>
            </div>
          </div>
        </>
      ) : (
        <div>Curso não encontrado</div>
      )}
    </>
  );
}
