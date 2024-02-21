"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const Breadcrumb = () => {
  const paths = usePathname();

  const pathNames = paths.split("/").filter((path) => path);

  const separator = <span className="text-[#00000073] pr-2"> / </span>;

  const listClasses = "hover:text-[#000000d9] pr-2";

  const homepageIsActive = pathNames.length === 0;

  return (
    <div className="mb-5">
      <ul className="flex items-center text-sm text-[#00000073]">
        <li
          className={`${listClasses} ${
            homepageIsActive ? "text-[#000000d9] group" : ""
          }`}
        >
          <Link href={"/"} className="group-hover:cursor-text">
            Kryefaqja
          </Link>
        </li>
        {homepageIsActive ? null : separator}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href || homepageIsActive
              ? `${listClasses} text-[#000000d9] group`
              : listClasses;
          let itemLink = link[0].toUpperCase() + link.slice(1, link.length);
          return (
            <React.Fragment key={index}>
              <li className={itemClasses}>
                <Link className="group-hover:cursor-text" href={href}>
                  {itemLink}
                </Link>
              </li>
              {pathNames.length !== index + 1 && separator}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumb;
