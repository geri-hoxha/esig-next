"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Sidemenu from "../Sidemenu";
import { ChangeEvent, useState } from "react";
import debounce from "@/lib/debounce";
import { routes as defaultRoutes } from "../Sidemenu/Routes";

const DrawerContent = () => {
  const [routes, setRoutes] = useState(defaultRoutes);

  const onChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;

    if (!value) {
      return setRoutes(defaultRoutes);
    }

    setRoutes(
      routes.filter((route) =>
        route.text?.toLowerCase().includes(value.toLowerCase())
      )
    );
  }, 400);

  return (
    <>
      <div className="w-full px-4 pt-4">
        <Input
          icon={<Search size={15} />}
          className="bg-gray-50 h-9 pl-8 text-gray-900 rounded-md border-gray-300"
          onChange={onChange}
        />
      </div>
      <Sidemenu className="flex" routes={routes} />
    </>
  );
};

export default DrawerContent;
