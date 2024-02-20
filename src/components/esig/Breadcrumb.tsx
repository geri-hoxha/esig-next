'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

const Breadcrumb = () => {

    const paths = usePathname()

    const pathNames = paths.split('/').filter( path => path )

    const separator = <span> / </span>

    const activeClasses="text-[#000000d9]";

    const containerClasses="flex items-center";

    const listClasses="hover:underline mx-2 font-bold";

    return (
        <div>
            <ul className={containerClasses}>
                <li className={listClasses}><Link href={'/'}>General</Link></li>
                {pathNames.length > 0 && separator}
            {
                pathNames.map( (link, index) => {
                    let href = `/${pathNames.slice(0, index + 1).join('/')}`
                    let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                    let itemLink = link[0].toUpperCase() + link.slice(1, link.length)
                    return (
                        <React.Fragment key={index}>
                            <li className={itemClasses} >
                                <Link href={href}>{itemLink}</Link>
                            </li>
                            {pathNames.length !== index + 1 && separator}
                        </React.Fragment>
                    )
                })
            }
            </ul>
        </div>
    )
}

export default Breadcrumb