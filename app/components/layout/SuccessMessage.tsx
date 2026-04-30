import Image from "next/image";
import Button from "@/app/components/Ui/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessMessage() {
  const [countdown, setCountdown] = useState(5);

  const router = useRouter();

  useEffect(() => {
    if (countdown === 0) router.push("/");

    if (countdown > -1) {
      const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div className="flex flex-col items-center w-full gap-[24px]  md:relative top-0 left-0 absolute justify-center h-screen md:h-auto">
      {/* Icon */}
      <div className="flex items-center justify-center w-[64px] h-[64px] rounded-full ">
        <Image src="/discount-shape.svg" alt="Sucesso" width={80} height={80} />
      </div>

      {/* Texts */}
      <div className="flex flex-col items-center gap-[4px] w-full text-center">
        <h2 className="font-inter font-semibold text-[24px] leading-[44px] tracking-[-0.02em] text-[#171717] m-0">
          Conta criada com sucesso!
        </h2>
        <p className="font-inter font-normal text-[14px] leading-[130%] tracking-[-0.02em] text-[#626262] max-w-[302px] m-0">
          Clique no botão abaixo ou você será redirecionado em {countdown}{" "}
          segundos...
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-stretch gap-[16px] w-full max-w-[302px]">
        <Button
          colorButton={{
            backgroundColor: "bg-white",
            textColor: "text-black",
            hover: false,
          }}
          border="border border-[#E0E0E0]"
          rounded="rounded-sm"
          size="h-[42px]"
          width="w-full"
        >
          <span className="font-inter font-medium text-[12px] leading-[125%] text-[#171717]">
            Ir para o catálogo
          </span>
        </Button>
      </div>
    </div>
  );
}
