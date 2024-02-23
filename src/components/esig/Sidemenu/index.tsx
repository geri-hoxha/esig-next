import { PhoneCall } from "lucide-react";
import Routes from "./Routes";

const Sidemenu = () => {
  return (
    <aside className="min-w-64 justify-between hidden md:flex flex-col h-full border-gray-200 border-r">
      <div className="flex flex-col space-y-2 p-4">
        <Routes />
      </div>
      <div className="w-full flex items-center justify-center text-center pb-2 text-xs text-gray-500 font-semibold">
        <PhoneCall size={15} className="mr-2" /> Support: 04 22 333 08 ext 186
      </div>
    </aside>
  );
};

export default Sidemenu;
