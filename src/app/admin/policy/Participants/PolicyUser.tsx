"use client";

import Image from "next/image";
import React, { Dispatch, useEffect, useState } from "react";
import { ButtonGeri } from "../page";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useCoreContext } from "../context";
import { CustomerModel, IssueRequest } from "../type";
import {
  MASS_UPDATE,
  CREATE,
  DELETE,
  SET,
  UPDATE,
  IAction,
} from "../context/reducer";
import { IParticipants } from "./";
import Modal from "../components/Modal";
import CustomerModal, { formSchemaCustomer } from "../CustomerModal";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";


type MapperParticipants = {
  [K in keyof IParticipants]: { customerId: string }[];
};

const PolicyUsers: React.FC = () => {

  const { data, dispatch } = useCoreContext();

  const { policyUsers, policyHolders, beneficiaries, invoiceRecipients } =
    data;

  const [selectedParticipantId, setSelectedParticipantId] = useState<string>('');

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // empty object to show first input (leader)
    dispatch({ type: CREATE, payload: { key: "policyUsers", item: {} } });
  }, []);

  const { toast } = useToast();

  const mapperParticipants: MapperParticipants = {
    policyUsers,
    policyHolders,
    beneficiaries,
    invoiceRecipients,
  };

  const participantsIteration = (dispatcher: (key: keyof IParticipants, participant: { customerId: string }[]) => void) => {

    for (const key in mapperParticipants) {
      // Asserting the type of `key` as `keyof MapperParticipants`
      const typedKey = key as keyof MapperParticipants;

      dispatcher(typedKey, mapperParticipants[typedKey]);
    }
  }

  const addPolicyUserHandler = (values: CustomerModel) => {
    participantsIteration((key) => {
      dispatch({
        type: CREATE,
        payload: {
          key,
          item: values,
        },
      });
    });
  };

  const updatePolicyUserHandler = (values: CustomerModel) => {
    participantsIteration((key) => {
      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: values.id,
          },
          key,
          item: values,
        },
      });
    })
  };

  const deletePolicyUserHandler = (values: CustomerModel) => {
    participantsIteration((key) => {
      dispatch({
        type: DELETE,
        payload: {
          key,
          identifier: {
            value: values.id,
          },
        },
      });
    })

    toast({
      title: `Pjesemarresi: ${values.displayName} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            participantsIteration((key, participant) => {
              dispatch({
                type: SET,
                payload: { key, item: participant },
              });
            })
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  const defaultValuesPromise = async () => {
    const response = await _request(`/customer/${selectedParticipantId}`, token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  }

  const onOkHandler = () => {

  }
  const onCancelHandler = () => {

  }

  const footer = (
    <>
      <div className="flex items-center grow shrink-0">
        <div className="mr-2 text-gray-700 font-semibold text-sm ">
          Tarife shtese:
        </div>
        <div className="">
          <RadioGroup
            options={[
              {
                id: "3",
                title: "Po",
              },
              {
                id: "4",
                title: "Jo",
              },
            ]}
          />
        </div>
      </div>
    </>
  );

  return (
    <>
      {data.map((user: any, index: number) => {
        return (
          <div className="flex items-center">
            <Base
              label={index === 0 ? "Lideri *" : ` Perdoruesi ${index + 1}`}
              name="serial"
              value={user?.displayName}
              suffix={
                index === 1 ? (
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
                    <span className="text-black text-xs"> Tarife shtese</span>
                  </div>
                ) : (
                  ""
                )
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
                    onParticipantDelete(user);
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

      {data.length < 3 ? (
        <div className="w-full">
          <Modal
            title="Modali i pjesemarresve"
            description="Ketu mund te modikoni klientin e perzgjedhur."
            body={
              <CustomerModal onSave={addPolicyUserHandler} footer={footer} />
            }
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


      <Modal
        title="Modali i perdoruesve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        open={open}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
        formSchema={formSchemaCustomer}
        defaultValues={defaultValuesPromise}
      >
        <CustomerModal footer={<></>} />
      </Modal>
    </>
  );
};

export default PolicyUsers;
