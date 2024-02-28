"use client";

import { Badge } from "@/components/ui/badge";
import {
  CircleDollarSign,
  Database,
  Gauge,
  Landmark,
  PhoneCall,
  ScrollText,
  Settings,
} from "lucide-react";
import MenuLink from "./MenuLink";
import { Separator } from "@/components/ui/separator";
import { Fragment } from "react";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

export interface IRoute {
  text: string;
  icon?: (isSelected: boolean) => React.ReactNode;
  href?: string;
  notifications?: JSX.Element;
  hidden?: boolean;
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

export const routes: IRoute[] = [
  {
    text: "Dashboard",
    icon: (isSelected) => <Gauge {...getIconProps(isSelected)} />,
    items: [
      {
        text: "General",
        href: "/dashboard/general",
        notifications: <Badge>7</Badge>,
      },
      {
        text: "Analytic",
        href: "/dashboard/analytic",
        notifications: <Badge>3</Badge>,
      },
    ],
  },
  {
    text: "Sale",
    icon: (isSelected) => <CircleDollarSign {...getIconProps(isSelected)} />,
    href: "/sale",
  },
  {
    text: "List of policies",
    icon: (isSelected) => <Database {...getIconProps(isSelected)} />,
    href: "/list",
  },
  {
    text: "Claims",
    icon: (isSelected) => <ScrollText {...getIconProps(isSelected)} />,
    href: "/claims",
  },
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
        href: "/finance/failed-invoices",
        notifications: <Badge variant="destructive">24</Badge>,
      },
    ],
  },
  {
    text: "Configurations",
    icon: (isSelected) => <Settings {...getIconProps(isSelected)} />,
    items: [
      {
        text: "Products",
        href: "/configurations/products",
        notifications: <Badge>2</Badge>,
      },
      {
        text: "Blocked objects",
        href: "/configurations/blocked-objects",
      },
    ],
  },
];

export default function Routes({ routes }: { routes: IRoute[] }) {
  return (
    <>
      {routes.map((route, index) => {
        return (
          <Fragment key={index}>

 
                      <MenuLink route={route} />
 
          </Fragment>
        );
      })}
    </>
  );
}
