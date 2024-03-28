"use client";

import Image from "next/image";

import Modal from "@/components/esig/Modal";
import React, { useEffect, useState } from "react";
import Base from "../../components/Fields_v2/Base";
import CustomerModal from "../CustomerModal";
import { ButtonGeri } from "../page";

const PolicyUsers = ({setBaseUsers}) => {
  const [users, setUsers] = useState<any>([{}]);

  useEffect(() => {
    setBaseUsers(users)
  }, [users])

  const onSave= (values) => {
    console.log(values)
    setUsers([...users.filter((user) => !!user?.id), values])
  }

  return (
    <>
      {
        users.map((user: any, index: number) => {
          return (
            <div className="flex items-center">
              <Base
                className="bg-red-0"
                label={index === 0 ? 'Lideri *' : ` Perdoruesi ${index + 1}`}
                name="serial"
                value={user.displayName}
              />
            <Modal
          title="Modali i pjesemarresve"
          description="Ketu mund te modikoni klientin e perzgjedhur."
          body={<CustomerModal onSave={onSave} />}
          noButtons
        >
          <div>
            <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
              <div className="flex items-center gap-x-1">
                <Image
                  className="cursor-pointer"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span>Zgjidh</span>
              </div>
            </button>
          </div>
        </Modal>

              {
                index !== 0 &&
                <div>
                <button onClick={() => {
                  setUsers([...users.filter((_user:any) => _user.id !== user.id )])
                }} className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
                  <div className="flex items-center gap-x-1">
                    <Image
                      src="/svg/close.svg"
                      alt="edit"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 20 }}
                      priority
                    />
                    <span>Fshij</span>
                  </div>
                </button>
              </div>
              }
            </div>
          )
        })
      }


      <div className="w-full">
        <Modal
          title="Modali i pjesemarresve"
          description="Ketu mund te modikoni klientin e perzgjedhur."
          body={<CustomerModal onSave={onSave} />}
          noButtons
        >
          <ButtonGeri className="text-esig hover:bg-sky-50 !text-base !w-full">
            <div className="flex items-center gap-x-1 mx-auto">
              <svg
                className="stroke-esig"
                width="14"
                height="14"
                xmlns="http://www.w3.org/2000/svg"
                fillRule="evenodd"
                clipRule="evenodd"
              >
                <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
              </svg>
              <span>Shto perdorues tjeter</span>
            </div>
          </ButtonGeri>
        </Modal>
      </div>
    </>
  )
}

export default PolicyUsers;