import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Currencies from "./Currencies";
import Image from "next/image";
import Translation from "./Translation";

const Navbar: React.FC = () => {
  return (
    <nav className="p-2.5 bg-slate-200	flex items-center">
      <Image
        src="esig_black_text.svg"
        alt="Logo"
        width={80}
        height={40}
        style={{ width: 80, height: 40 }}
        priority
      />
      <Currencies />
      <div className="ml-auto mr-4 flex items-center">
        <Translation />
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
