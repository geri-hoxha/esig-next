"use client";

import Image from "next/image";

import Modal from "@/components/esig/Modal";
import React, { Dispatch, useState } from "react";
import Base from "../../components/Fields_v2/Base";
import CustomerModal from "../CustomerModal";
import { ButtonGeri } from "../page";
import { IParticipants } from "./ParticipantsWrapper";
import { CREATE, DELETE, IAction, SET, UPDATE } from "@/context/reducer";
import { useToast } from "@/components/ui/use-toast";
import RadioGroup from "../RadioGroup";
import { ToastAction } from "@/components/ui/toast";
import { pushQueryParams } from "./PolicyUsers";

const Insurers: React.FC = () => {
  const { toast } = useToast();
  const [insurers, setInsurers] = useState<any>([]);

  const onAddParticipant = (values: any) => {
    setInsurers([...insurers, values]);
  };

  const onParticipantUpdate = (values: any, id: string | undefined) => {
    // update
    if (id) {
      setInsurers(
        insurers.map((insurer: any) => {
          if (insurer.id === id) {
            return values;
          }
          return insurer;
        })
      );
    }

    // add
    onAddParticipant(values);
  };

  const onParticipantDelete = (data: any) => {
    setInsurers(insurers.filter((insurer: any) => insurer.id !== data.id));

    toast({
      title: `Pjesemarresi: ${data.displayName} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            setInsurers(insurers);
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  const footer = (
    <div className="w-max">
      <Base label="Perqindja" name="serial" suffix={"%"} />
    </div>
  );

  const setSelectedPolicyUser = (id: string) => {
    pushQueryParams({ id });
  };

  if (insurers.length === 0) {
    return (
      <div className="flex items-center">
        <Base
          className="bg-red-0"
          label={"Lideri *"}
          name="serial"
          value={""}
        />
        <Modal
          title="Modali i siguruesve"
          description="Ketu mund te modikoni siguruesin e perzgjedhur."
          body={
            <CustomerModal
              footer={footer}
              onSave={(values) => onParticipantUpdate(values, undefined)}
            />
          }
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
      </div>
    );
  }

  return (
    <>
      {insurers.map((user: any, index: number) => {
        return (
          <div className="flex items-center">
            <Base
              className="bg-red-0"
              label={index === 0 ? "Lideri *" : ` Siguruesi ${index + 1}`}
              name="serial"
              value={user?.displayName}
              suffix={
                <div className=" flex items-center justify-center gap-2">
                  <Image
                    className="cursor-pointer"
                    src="/svg/chart_up.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 20, height: 20 }}
                    priority
                  />
                  <span className="text-black text-xs">
                    {Math.floor(Math.random() * 90) + 10}%
                  </span>
                </div>
              }
            />
            <Modal
              title="Modali i pjesemarresve"
              description="Ketu mund te modikoni klientin e perzgjedhur."
              body={
                <CustomerModal
                  onSave={(values) => onParticipantUpdate(values, user.id)}
                  footer={footer}
                />
              }
              noButtons
            >
              <div onClick={() => setSelectedPolicyUser(user.id)}>
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

            {index !== 0 && (
              <div>
                <button
                  onClick={() => {
                    onParticipantDelete(user.id);
                  }}
                  className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100"
                >
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
            )}
          </div>
        );
      })}

      {insurers.length < 3 ? (
        <div className="w-full">
          <Modal
            title="Modali i pjesemarresve"
            description="Ketu mund te modikoni klientin e perzgjedhur."
            body={<CustomerModal onSave={onAddParticipant} footer={footer} />}
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
                <span>Shto sigurues tjeter</span>
              </div>
            </ButtonGeri>
          </Modal>
        </div>
      ) : (
        <div className="flex items-center justify-center text-gray-600 gap-2 text-sm">
          <Image
            src="/svg/info.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 17, height: 17 }}
            priority
          />
          <span>Polica arriti maksimumin e perdorueve</span>
        </div>
      )}
    </>
  );
};

export default Insurers;
