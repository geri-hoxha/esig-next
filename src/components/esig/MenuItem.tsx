'use client'
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from 'next/navigation';

interface IProps {
    text: string;
    href: string;
    icon: ReactNode;
}

const MenuLink: React.FC<IProps> = ({ text, href, icon }) => {
    const pathname = usePathname()

    const isSelected = pathname === href;

    return <Link href={href}><div className={`${isSelected ? 'bg-slate-700 text-white' : "text-slate-700"} w-full hover:bg-slate-700 rounded-lg hover:text-white transition-all flex items-center gap-x-3 text-lg font-medium border border-transparent pl-10 py-3.5 my-1`}>{icon}{text}</div></Link>

}

export default MenuLink;