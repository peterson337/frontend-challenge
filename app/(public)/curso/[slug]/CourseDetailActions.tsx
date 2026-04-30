"use client";
import React from "react";
import Button from "@/app/components/Ui/Button";
import Modal from "@/app/components/Ui/Modal";
import Share from "@/app/components/icons/Share";
import Heart from "@/app/components/icons/Heart";
import { useRouter } from "next/navigation";

type CourseDetailActionsProps = {
  title: string;
  long_description: string;
};
export default function CourseDetailActions(props: CourseDetailActionsProps) {
  const router = useRouter();

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { title, long_description } = props;

  // Função utilitária para remover tags HTML de uma string
  function stripHtmlTags(html: string): string {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <>
      {isOpenModal && <Modal setIsOpenModal={setIsOpenModal} />}
      <div className="flex flex-col items-stretch gap-4 p-6 w-full md:px-15 md:py-12">
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
              <span className="flex flex-row justify-center items-center gap-1.5">
                <Heart />
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
              onClick={() => router.push("/cadastro")}
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

        <p className="font-normal text-base leading-[116%] md:text-[20px] text-left text-[#252525] m-0 md:w-255.75 md:h-34.5">
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
            onClick={() => setIsOpenModal(true)}
          >
            <span className="flex items-center justify-center">
              <Share />
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
