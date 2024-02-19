import { CircleDollarSign, Gauge, Handshake, Landmark, ScrollText } from "lucide-react";
import MenuLink from "./MenuItem";

const Sidemenu: React.FC = () => {
    return (
        <aside className="min-w-80 cursor-pointer flex flex-col pt-10 px-4 h-full bg-white shadow-lg">
            <MenuLink icon={<Gauge size={25} />} href="/" text="Dashboard" />
            <MenuLink icon={<CircleDollarSign size={25} />} href="/sale" text="Sale" />
            <MenuLink icon={<Landmark size={25} />} href="/finance" text="Finance" />
            <MenuLink icon={<ScrollText size={25} />} href="/invoices" text="Invoices" />
            <MenuLink icon={<Handshake size={25} />} href="/claim" text="Claim" />
        </aside>
    )
}

export default Sidemenu;