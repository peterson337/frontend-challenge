import Youtube from "@/app/components/icons/Youtube";
import Facebook from "@/app/components/icons/Facebook";
import Instagram from "@/app/components/icons/Instagram";
import WhatsApp from "@/app/components/icons/WhatsApp";
export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-start gap-8 px-5 py-9 md:flex-row md:items-center md:justify-between md:gap-0 md:py-5 md:px-3.75">
      <div className="flex items-center gap-5">
        <WhatsApp textColor="#090909" />
        <Youtube />
        <Facebook />
        <Instagram />
      </div>

      <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-3.75">
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
          <div className="flex w-4.25 gap-2.5 border-b-2 border-purple py-0.75">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              PT
            </span>
          </div>
          <div className="flex w-4.25 gap-2.5 py-0.75">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              EN
            </span>
          </div>
          <div className="flex w-4.25 gap-2.5 py-0.75">
            <span className="w-full text-center font-quattrocento text-xs font-bold leading-[120%] text-text-neutral-800">
              ES
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
