import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start gap-8 px-5 py-9 md:flex-row md:items-center md:justify-between md:gap-0 md:py-[20px] md:px-[60px]">
      <div className="flex items-center gap-5">
        <Image src="/Whatsapp.svg" alt="Whatsapp" width={16} height={16} />
        <Image src="/youtube.svg" alt="Youtube" width={16} height={16} />
        <Image src="/facebook.svg" alt="Facebook" width={16} height={16} />
        <Image src="/Instagram.svg" alt="Instagram" width={16} height={16} />
      </div>

      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-[60px]">
        <div className="flex flex-col items-start justify-center gap-1 pt-1 md:items-center">
          <span className="font-quattrocento text-xs font-bold leading-[120%] text-neutral-800 md:text-center">
            Termos de uso
          </span>
          <span className="hidden h-0 w-px border-t border-text-neutral-800 md:block" />
        </div>

        <div className="flex flex-col items-start justify-center gap-1 pt-1 md:items-center">
          <span className="font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800 md:text-center">
            Política de privacidade
          </span>
          <span className="hidden h-0 w-px border-t border-text-neutral-800 md:block" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex w-[17px] gap-[10px] border-b-2 border-purple py-[3px]">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              PT
            </span>
          </div>
          <div className="flex w-[17px] gap-[10px] py-[3px]">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              EN
            </span>
          </div>
          <div className="flex w-[17px] gap-[10px] py-[3px]">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              ES
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
