"use client";
import { useState } from "react";
import Brand from "@/app/components/Ui/Brand";
import Image from "next/image";
import Link from "next/link";
import Email from "@/app/components/icons/Email";
import Form from "@/app/components/layout/Form";

export default function CadastroPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white md:h-dvh md:max-h-dvh md:flex-row md:overflow-hidden">
      <div className="flex w-full flex-col gap-6 overflow-y-auto px-4 pb-12 pt-[34px] md:h-full md:min-h-0 md:w-1/2 md:flex-1 md:gap-6 md:px-8 md:pb-6 md:pt-8 [@media(min-width:768px)_and_(max-height:819px)]:overflow-hidden [@media(min-width:768px)_and_(min-height:820px)]:overflow-y-auto">
        <div className="hidden shrink-0 md:flex md:items-center md:gap-2">
          <Brand />
        </div>

        <div className="flex flex-col justify-start md:min-h-0 md:flex-1 [@media(min-width:768px)_and_(max-height:819px)]:overflow-y-auto [@media(min-width:768px)_and_(min-height:820px)]:overflow-visible">
          <div className="mx-auto flex w-full max-w-[343px] flex-col items-stretch gap-8 pb-4 md:max-w-[360px] md:gap-12 md:pb-8 md:pt-2">
            {!isSubmitted && (
              <div className="flex flex-col w-full gap-[18px] md:gap-0">
                <div className="flex flex-row items-center gap-2 md:hidden">
                  <Brand />
                </div>

                <div className="flex flex-col items-stretch w-full gap-2 md:gap-0">
                  <h1 className="m-0 font-inter text-[24px] font-semibold leading-[32px] text-[#181D27] md:text-[36px] md:leading-[44px] md:tracking-[-0.02em]">
                    Criar conta
                  </h1>
                  <p className="m-0 font-inter text-[16px] font-normal leading-[24px] text-[#535862] md:hidden">
                    Start turning your ideas into reality.
                  </p>
                </div>
              </div>
            )}

            <div className="flex w-full flex-col items-stretch gap-8 md:gap-[32px]">
              <Form
                isSubmitted={isSubmitted}
                setIsSubmitted={() => setIsSubmitted(true)}
              />

              {!isSubmitted && (
                <div className="flex w-full flex-row items-center justify-center gap-1">
                  <span className="font-inter text-[14px] font-normal leading-[20px] text-[#535862]">
                    Já tem uma conta?
                  </span>
                  <Link
                    href="/login"
                    className="cursor-pointer font-inter text-[14px] font-semibold leading-[20px] text-[#792BF9] no-underline"
                  >
                    Entrar
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="hidden w-full shrink-0 pt-4 md:flex md:flex-row md:items-center md:justify-between">
          <div className="font-inter text-[14px] font-normal leading-[20px] text-[#535862]">
            © EVOB 2025
          </div>

          <div className="flex flex-row items-center gap-2">
            <Email />
            <span className="font-inter text-[14px] font-normal leading-[20px] text-[#535862]">
              help@evob.com
            </span>
          </div>
        </div>
      </div>

      <div className="relative hidden min-h-dvh w-1/2 2xl:w-[40%] shrink-0 bg-[#F3F4F6] xl:block md:min-h-0 md:h-full md:self-stretch">
        <Image
          src="/signup-banner.jpg"
          alt="Signup Banner"
          fill
          priority
          sizes="50vw"
          className="object-cover object-left"
        />
      </div>
    </div>
  );
}
