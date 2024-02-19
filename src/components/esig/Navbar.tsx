import Currencies from "./Currencies";
import Image from "next/image";
import Translation from "./Translation";
import { Separator } from "@/components/ui/separator"
import User from "./User";
import Balance from "./Balance";

const Navbar: React.FC = () => {
  return (
    <nav className="px-2.5 py-3 bg-slate-100 flex items-center border-gray-300 border-b shadow-lg z-50">
      <div className="pl-20 pr-28">
        <Image
          src="esig_black_text.svg"
          alt="Logo"
          width={100}
          height={44}
          priority
        />
      </div>
      <Currencies />
      <div className="ml-auto mr-4 flex items-center">
        <Balance />
        <Translation />
        <Separator orientation="vertical" className="mx-4 h-7" />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
