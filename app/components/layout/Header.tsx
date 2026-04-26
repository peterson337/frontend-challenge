import { RiMenu2Fill } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { RiUserLine } from "react-icons/ri";
import Image from "next/image";
import Button from "../Ui/Button";

export default function Header() {
  const flexRow = "flex flex-row items-center";

  const iconMobile = "md:hidden flex items-center cursor-pointer text-purple";

  const renderDesktop = " hidden md:flex";

  return (
    <header className="bg-white">
      <section
        className={` ${flexRow} justify-between  md:px-15 md:py-5 gap-4 pt-4 pb-5 px-5`}
      >
        <div className={`${flexRow} gap-4`}>
          <RiMenu2Fill size={28} className={iconMobile} />

          <div className={`${flexRow}  gap-2`}>
            <CiSearch
              className="cursor-pointer text-purple hover:text-yellow text-2xl md:text-[19px]"
              strokeWidth={1.0}
            />
            <div className={`${renderDesktop} md:bg-white md:text-black `}>
              <Button
                colorButton={{
                  backgroundColor: "bg-white",
                  textColor: "text-black",
                  hover: false,
                }}
                rounded="rounded-none"
                size="px-3 py-1.5"
              >
                Busca
              </Button>
            </div>
          </div>
        </div>

        <div className={`${flexRow} gap-3`}>
          <div className="bg-light-purple px-0.75 py-0.75 rounded">
            <Image src="/logo.png" alt="logo" width={28} height={28} />
          </div>

          <h1 className="text-2xl font-bold text-gray">EVOB</h1>
        </div>

        <div className={`${flexRow} gap-4`}>
          <CiLogin size={28} className={iconMobile} strokeWidth={1.0} />

          <div className={`${renderDesktop} items-center gap-4`}>
            <Button
              colorButton={{
                backgroundColor: "bg-white",
                textColor: "text-black",
                hover: false,
              }}
              rounded="rounded-none"
              size="px-3 py-1.5"
            >
              <div className={`${flexRow} gap-1 font-medium`}>
                <RiUserLine size={24} className="text-purple" />
                Cadastra-se
              </div>
            </Button>

            <Button
              colorButton={{
                backgroundColor: "bg-purple",
                textColor: "text-white",
                hover: true,
              }}
              rounded="rounded-none"
              size="px-3 py-1.5"
            >
              <span className={`${flexRow} gap-2 items-center`}>
                <CiLogin size={21} className="text-white" strokeWidth={1.0} />
                <p>Entrar</p>
              </span>
            </Button>
          </div>
        </div>
      </section>
    </header>
  );
}
