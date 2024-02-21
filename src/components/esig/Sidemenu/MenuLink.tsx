'use client'

import { useState } from "react";
import { IRoute } from "./Sidemenu2";
import Single from "./Single";
import Link from "next/link";


interface IProps {
    route: IRoute
}

// <ChevronDown size={18} />


const MenuLink: React.FC<IProps> = ({route}) => {
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const {href = ''} = route;


    if(route.items?.length === 0) {
        return (
        <Link className="select-none" href={href}>
                <div className={`flex items-center justify-between p-2 text-sm font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group cursor-pointer`}>
                    <div className="w-full flex items-center">
                    {icon?.(toggle || isSelected)}
                    <span className="ml-3">{text}</span>
                    </div>
                     
                </div>
    </Link>
        )
    }

    return (<Single icon={(isSelected) => route.icon(isSelected)} href={route.href}>{route.text}</Single>
}

export default MenuLink; 