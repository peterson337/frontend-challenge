"use client";

import Button from "@/app/components/Ui/Button";
import WhatsApp from "@/app/components/icons/WhatsApp";
import Close from "@/app/components/icons/Close";
import Copy from "@/app/components/icons/Copy";
export default function Modal({
  setIsOpenModal,
}: {
  setIsOpenModal: (value: boolean) => void;
}) {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setIsOpenModal(false)}
      >
        <div
          className="flex flex-col items-stretch rounded-sm w-85.75 md:w-101.25 bg-[#FEFEFE]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-row justify-between items-center pt-2 pr-2 pb-2 pl-4 border-b border-[#F3F4F6]">
            <span className="font-inter font-medium text-base leading-[125%] text-[#262626]">
              Compartilhar curso
            </span>

            <Button
              colorButton={{
                backgroundColor: "bg-white",
                textColor: "text-black",
                hover: false,
              }}
              rounded="rounded-none"
              size="w-[38px] h-[38px]"
              border="border-none"
              onClick={() => setIsOpenModal(false)}
            >
              <span className="flex items-center justify-center">
                <Close />
              </span>
            </Button>
          </div>

          <div className="flex flex-col items-stretch gap-4 p-4">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2 px-3 py-2 bg-[#FEFEFE] border border-[#D1D5DB] shadow-sm">
                <span className="flex-1 font-inter font-normal text-sm leading-[125%] text-gray">
                  https//:www.curso.com/iwejfnwieuf...
                </span>

                <Button
                  colorButton={{
                    backgroundColor: "bg-white",
                    textColor: "text-black",
                    hover: false,
                  }}
                  rounded="rounded-none"
                  border="border-none"
                  size="p-0"
                >
                  <span className="flex items-center justify-center">
                    <Copy />
                  </span>
                </Button>
              </div>
            </div>

            <Button
              colorButton={{
                backgroundColor: "bg-green",
                textColor: "text-white",
                hover: false,
              }}
              rounded="rounded-none"
              size="px-3 py-3"
              border="border-none"
              width="w-full"
            >
              <span className="flex flex-row justify-center items-center gap-1.5">
                <WhatsApp textColor="#FFFFFF" />

                <span className="font-inter font-medium text-xs leading-[125%] text-[#FAFAFA]">
                  Compartilhar via Whatsapp
                </span>
              </span>
            </Button>
          </div>

          <div className="flex flex-row justify-end items-center gap-2 px-4 py-3 border-t border-[#E5E7EB]">
            <Button
              colorButton={{
                backgroundColor: "bg-white",
                textColor: "text-black",
                hover: false,
              }}
              rounded="rounded-none"
              size="px-3 py-0"
              width="w-[76px]"
              heigth="h-[36px]"
              border="border border-[#E5E7EB]"
              onClick={() => setIsOpenModal(false)}
            >
              <span className="font-medium text-xs leading-[125%] text-gray">
                Fechar
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
