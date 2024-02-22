import Currencies from "./Currencies";
import Image from "next/image";
import Translation from "./Translation";
import { Separator } from "@/components/ui/separator";
import UserActions from "./UserActions";
import Balance from "./Balance";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input"

const Navbar: React.FC = () => {
  return (
    <nav className="px-4 py-3 bg-white flex items-center border-gray-200 border-b z-50">
      <div className="min-w-24 lg:min-w-52">
        <Image
          src="/esig_black_text.svg"
          alt="Logo"
          width={'0'}
          height={'0'}
          style={{ width: 80, height: 35 }}
          priority
        />
      </div>
      <Currencies />
      <div className="ml-auto flex items-center gap-x-7">
        <Input icon={<Search size={15} />} className="bg-gray-50 h-9 text-gray-900 rounded-lg border-gray-300" />
        <Translation />
        <UserActions />
        <Balance />
      </div>
    </nav>
  );
};

export default Navbar;
