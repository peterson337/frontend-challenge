import Brand from "@/app/components/Ui/Brand";
import Image from "next/image";
import Link from "next/link";
import Email from "@/app/components/icons/Email";
import Form from "@/app/components/layout/Form";

export default function CadastroPage() {
  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      {/* Container - Mobile*/}
      <div className="relative flex flex-col items-center w-full md:w-1/2 2xl:w-full md:justify-center md:min-h-screen px-4 pt-[34px] pb-[48px] md:px-8 min-h-screen md:bg-white">
        {/* Form Container */}
        <div className="flex flex-col items-stretch w-full max-w-[343px] md:max-w-[360px] gap-8 md:gap-12">
          <div className="flex flex-col w-full gap-[18px] md:gap-0">
            <div className="flex flex-row items-center gap-2 md:absolute md:top-8 md:left-8 md:gap-2">
              <Brand />
            </div>

            <div className="flex flex-col items-stretch w-full gap-2 md:gap-0">
              <h1 className="font-inter font-semibold text-[24px] leading-[32px] md:text-[36px] md:leading-[44px] md:tracking-[-0.02em] text-[#181D27] m-0">
                Criar conta
              </h1>
              <p className="md:hidden font-inter font-normal text-[16px] leading-[24px] text-[#535862] m-0">
                Start turning your ideas into reality.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-stretch w-full gap-8 md:gap-[32px]">
            <Form />

            <div className="flex flex-row justify-center items-center w-full gap-1">
              <span className="font-inter font-normal text-[14px] leading-[20px] text-[#535862]">
                Já tem uma conta?
              </span>
              <Link
                href="/login"
                className="font-inter font-semibold text-[14px] leading-[20px] text-[#792BF9] cursor-pointer no-underline"
              >
                Entrar
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:flex-row md:w-[90%] 2xl:w-[95%] justify-between  items-center absolute bottom-8 left-8">
          <div className="hidden md:block  font-inter font-normal text-[14px] leading-[20px] text-[#535862]">
            © EVOB 2025
          </div>

          <div className="md:flex md:flex-row md:items-center md:gap-2">
            <Email />
            <span className="font-inter font-normal text-[14px] leading-[20px] text-[#535862]">
              help@evob.com
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 h-screen bg-[#F3F4F6] items-center justify-end mt-auto">
        <div className="relative w-full max-w-[720px] h-full">
          <Image
            src="/signup-banner.jpg"
            alt="Signup Banner"
            fill
            priority
            className="object-cover object-left"
          />
        </div>
      </div>
    </div>
  );
}
