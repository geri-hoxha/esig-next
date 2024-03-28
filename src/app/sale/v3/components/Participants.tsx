"use client";

import Image from "next/image";
import GeriHoxha from "../GeriHoxha";
import { Toggle } from "../page";

 
 
 

const Participants =({title, baseUsers}) => {
    return(
<div className="flex flex-col min-w-60">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    {title}
                    <GeriHoxha baseUsers={baseUsers} />
                  </div>
                  <Toggle />
                  <ul>
                    {baseUsers.map((user, index) => {
                      return (
                        <li key={index}>
                          {index === 0 ? (
                            <Image
                              src="/svg/star.svg"
                              alt="users_group"
                              width={"0"}
                              height={"0"}
                              style={{ width: 15, height: 15 }}
                              className=""
                              priority
                            />
                          ) : (
                            <div>-</div>
                          )} <span className="truncate w-40"> {user.displayName}</span>,{" "}
                          {user.percentage ?? 1 * 100}%
                        </li>
                      );
                    })}
                  </ul>
                </div>

    )
}

export default Participants;