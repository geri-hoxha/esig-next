"use client";

import {
  ChevronDown,
  CircleDollarSign,
  Database,
  Gauge,
  Handshake,
  Landmark,
  PhoneCall,
  ScrollText,
  Settings,
} from "lucide-react";
import MenuLink from "./MenuItem";
import { Separator } from "../ui/separator";
import { Badge } from "@/components/ui/badge";

const getIconProps = (isSelected: boolean) => {
  return {
    size: 20,
    className: `group-hover:text-black transition duration-75 ${
      isSelected ? "text-black" : "text-gray-600"
    }`,
  };
};

const Sidemenu: React.FC = () => {
  return (
    <aside className="min-w-80 justify-between flex flex-col h-full border-gray-200 border-r">
      <div className="flex flex-col space-y-2 p-4">
        <MenuLink
          icon={(isSelected) => {
            return <Gauge {...getIconProps(isSelected)} />;
          }}
          href="/"
          text="Dashboard"
        >
          <Badge>3</Badge>
        </MenuLink>
        <Separator />
        <MenuLink
          icon={(isSelected) => (
            <CircleDollarSign {...getIconProps(isSelected)} />
          )}
          href="/sale"
          text="Sale"
        />
        <MenuLink
          icon={(isSelected) => <Database {...getIconProps(isSelected)} />}
          href="/list"
          text="List of policies"
        />
        <MenuLink
          icon={(isSelected) => <ScrollText {...getIconProps(isSelected)} />}
          href="/claim"
          text="Claim"
        >
          <Badge>8</Badge>
        </MenuLink>
        <Separator />
        <MenuLink
          icon={(isSelected) => <Landmark {...getIconProps(isSelected)} />}
          text="Finance"
          items={[
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
              children: <Badge variant="destructive">24</Badge>,
            },
          ]}
        >
          <ChevronDown size={18} />
        </MenuLink>
        <Separator />
        <MenuLink
          icon={(isSelected) => <Settings {...getIconProps(isSelected)} />}
          text="Configurations"
          items={[
            {
              text: "Products",
              href: "/configurations/products",
              children: <Badge>2</Badge>,
            },
            {
              text: "Blocked objects",
              href: "/configurations/blocked-objects",
            },
          ]}
        >
          <ChevronDown size={18} />
        </MenuLink>
      </div>
      <div className="w-full flex items-center justify-center text-center pb-2 text-xs text-gray-500 font-semibold">
        <PhoneCall size={15} className="mr-2" /> Support: 067 58 35 032
      </div>
    </aside>
  );
};

export default Sidemenu;
