import Button from "@/app/components/Ui/Button";
import { useCadastroForm } from "@/app/hook/useCadastroForm";
import SuccessMessage from "@/app/components/layout/SuccessMessage";

type Props = {
  isSubmitted: boolean;
  setIsSubmitted: (value: boolean) => void;
};

export default function Form(props: Props) {
  const { isSubmitted, setIsSubmitted } = props;

  const {
    nomeRef,
    emailRef,
    confirmEmailRef,
    passwordRef,
    confirmPasswordRef,
    validateForm,
  } = useCadastroForm();

  const handleSubmit = () => {
    const result = validateForm();
    if (result) setIsSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <div className=" h-[calc(90dvh-100px)] flex items-center">
          <SuccessMessage />
        </div>
      ) : (
        <div className="flex flex-col items-stretch w-full gap-6 md:gap-[24px]">
          <form
            className="flex flex-col items-stretch w-full gap-5 md:gap-[20px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-stretch w-full gap-[6px]">
              <label className="font-inter font-medium text-[14px] leading-[20px] text-[#414651]">
                Nome
              </label>
              <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <input
                  ref={nomeRef}
                  type="text"
                  placeholder="Digite aqui"
                  className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col items-stretch w-full gap-[6px]">
              <label className="font-inter font-medium text-[14px] leading-[20px] text-[#414651]">
                Email
              </label>
              <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Digite aqui"
                  className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col items-stretch w-full gap-[6px]">
              <label className="font-inter font-medium text-[14px] leading-[20px] text-[#414651]">
                Confirme Email
              </label>
              <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <input
                  ref={confirmEmailRef}
                  type="email"
                  placeholder="Digite aqui"
                  className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col items-stretch w-full gap-[6px]">
              <label className="font-inter font-medium text-[14px] leading-[20px] text-[#414651]">
                Crie uma senha
              </label>
              <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Digite aqui"
                  className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
                />
              </div>
              <span className="font-inter font-normal text-[14px] leading-[20px] text-[#535862]">
                Deve ter pelo menos 8 caracteres.
              </span>
            </div>

            <div className="flex flex-col items-stretch w-full gap-[6px]">
              <label className="font-inter font-medium text-[14px] leading-[20px] text-[#414651]">
                Confirme a sua senha
              </label>
              <div className="flex flex-row items-center w-full gap-2 px-[14px] py-[10px] bg-white border border-[#D5D7DA] rounded-[2px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)]">
                <input
                  ref={confirmPasswordRef}
                  type="password"
                  placeholder="Digite aqui"
                  className="flex-1 font-inter font-normal text-[16px] leading-[24px] text-[#181D27] placeholder-[#717680] outline-none bg-transparent"
                />
              </div>
              <span className="font-inter font-normal text-[14px] leading-[20px] text-[#535862]">
                A senha deve ser igual a criada acima.
              </span>
            </div>
          </form>

          <div className="flex flex-col items-stretch w-full gap-4 md:gap-[16px]">
            <Button
              onClick={handleSubmit}
              colorButton={{
                backgroundColor: "bg-purple",
                textColor: "text-white",
                hover: false,
              }}
              rounded="rounded-sm"
              size="h-[42px]"
              width="w-full"
              border="border-none"
            >
              <span className="font-inter font-medium text-[12px] leading-[125%] text-white">
                Iniciar curso
              </span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
