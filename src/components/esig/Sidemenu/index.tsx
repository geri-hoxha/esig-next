import { PhoneCall } from "lucide-react";
import Routes, { IRoute } from "./Routes";
import { routes as defaultRoutes } from "./Routes";

interface IProps {
  routes?: IRoute[];
  className?: string;
}

const Sidemenu: React.FC<IProps> = ({
  className = "",
  routes = defaultRoutes,
}) => {
  return (
    <aside
      className={`min-w-64 fixed left-0  justify-between flex-col h-full border-gray-200 border-r bg-white ${className}`}
    >
      <div className="flex flex-col space-y-2 p-4">
        <Routes routes={routes} />
      </div>
      <div className="w-full flex items-center justify-center text-center pb-2 text-xs text-gray-500 font-semibold">

        
        
        <PhoneCall size={15} className="mr-2" /> Support: 04 22 333 08 ext 186
      </div>
    </aside>
  );
};

export default Sidemenu;
