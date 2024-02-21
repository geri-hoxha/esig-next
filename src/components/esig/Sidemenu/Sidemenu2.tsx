import { Badge, badgeVariants } from "@/components/ui/badge";
import { VariantProps } from "class-variance-authority";
import { Landmark } from "lucide-react";
import Single from "./Single";
import { useState } from "react";
import MenuLink from "./MenuLink";

export interface IRoute {
  text: string;
  icon?: (isSelected: boolean) => React.ReactNode;
  href?: string;
  notifications?: JSX.Element;
  items?: IRoute[];
}

const getIconProps = (isSelected: boolean) => {
  return {
    size: 20,
    className: `group-hover:text-black transition duration-75 ${
      isSelected ? "text-black" : "text-gray-600"
    }`,
  };
};

const routes: IRoute[] = [
  {
    text: "Finance",
    icon: (isSelected) => <Landmark {...getIconProps(isSelected)} />,
    items: [
      {
        text: "Reconciliation",
        href: "/finance/reconciliation",
      },
      {
        text: "Invoices",
        href: "/finance/invoices",
      },
      {
        text: "Failed Invoices",
        href: "/finance/invoices",
        notifications: <Badge variant="destructive">24</Badge>,
      },
    ],
  },
];


const Sidemenu = () => {
  return (
    <aside className="min-w-80 justify-between flex flex-col h-full border-gray-200 border-r">
      <div className="flex flex-col space-y-2 p-4">
        {routes.map((route) => (
          <MenuLink route={route} />
        ))}
      </div>
    </aside>
  );
};

export default Sidemenu;
