"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { IParticipants, useCoreContext } from "../context";
import { CustomerModel } from "../type";
import { CREATE, DELETE, SET, UPDATE } from "../context/reducer";
import Modal from "../components/Modal";
import CustomerModal, { getFormSchemaCustomer } from "../CustomerModal";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import { PolicyParticipantPolicyUserRequest } from "@/types";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Input from "../components/Input";
import { ExtraChargeFooter } from "./ModalFooter";

type MapperParticipants = {
  [K in keyof IParticipants]: (
    | { customerId: string }
    | { insurerId: string }
  )[];
};

const formSchema = getFormSchemaCustomer({
  extraCharge: z.string(),
});

const PolicyUsers: React.FC = () => {
  const { data, dispatch } = useCoreContext();

  const {
    policyUsers,
    policyHolders,
    beneficiaries,
    invoiceRecipients,
    insurers,
  } = data;

  const [selectedParticipantId, setSelectedParticipantId] =
    useState<string>("");

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
    insurers,
  };

  const participantsIteration = (
    dispatcher: (
      key: keyof IParticipants,
      participant: ({ customerId: string } | { insurerId: string })[]
    ) => void
  ) => {
    for (const key in mapperParticipants) {
      // Asserting the type of `key` as `keyof MapperParticipants`
      const typedKey = key as keyof MapperParticipants;

      dispatcher(typedKey, mapperParticipants[typedKey]);
    }
  };

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
    });
  };

  const deletePolicyUserHandler = (
    values: PolicyParticipantPolicyUserRequest & CustomerModel
  ) => {
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
    });

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
            });
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  const defaultValuesPromise = async () => {
    if (!selectedParticipantId) return {};

    const response = await _request(
      `/customer/${selectedParticipantId}`,
      token,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  };

  const onOkHandler = (values: CustomerModel) => {
    if (selectedParticipantId) {
      updatePolicyUserHandler(values);
    } else {
      addPolicyUserHandler(values);
    }

    onCancelHandler();
  };

  const onCancelHandler = () => {
    setOpen(false);

    setSelectedParticipantId("");
  };

  return (
    <>
      {policyUsers.map(
        (
          user: PolicyParticipantPolicyUserRequest & CustomerModel,
          index: number
        ) => {
          return (
            <div className="flex items-center" key={index}>
              <Input
                label={index === 0 ? "Lideri *" : ` Perdoruesi ${index + 1}`}
                value={user?.displayName}
                onClick={() => {
                  setOpen(true);
                  setSelectedParticipantId(user.id ?? '');
                }}
                suffix={
                  !!user.extraCharge && (
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
                  )
                }
              />

              <button
                onClick={() => {
                  setOpen(true);
                  setSelectedParticipantId(user.id ?? '');
                }}
                className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100"
              >
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

              {index !== 0 && (
                <div>
                  <Button
                    onClick={() => {
                      deletePolicyUserHandler(user);
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
                  </Button>
                </div>
              )}
            </div>
          );
        }
      )}

      {data.policyUsers.filter((user) => user.id).length > 1 && (
        <Button
          onClick={() => {
            setOpen(true);
          }}
          className="text-esig hover:bg-sky-50 !text-base !w-full"
          icon={
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
          }
        >
          <div className="flex items-center gap-x-1 mx-auto text-white">
            <span>Shto perdorues tjeter</span>
          </div>
        </Button>
      )}

      {/* 
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
        */}
      <Modal
        title="Modali i perdoruesve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        open={open}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
        formSchema={formSchema}
        defaultValues={defaultValuesPromise}
      >
        <CustomerModal id={selectedParticipantId}>
          <ExtraChargeFooter />
        </CustomerModal>
      </Modal>
    </>
  );
};

export default PolicyUsers;
