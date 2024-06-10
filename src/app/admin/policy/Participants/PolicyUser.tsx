"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
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
import Input from "../components/Input";
import { ExtraChargeFooter } from "./ModalFooter";
import Button from "../components/Button";
import { plainToClass } from "class-transformer";
import ParticipantModel from "./dto";

type MapperParticipants = {
  [K in keyof IParticipants]: (
    | { customerId: string }
    | { insurerId: string }
  )[];
};

const transformCustomerToParticipant = (values: CustomerModel, key: keyof IParticipants) => {
  return plainToClass(ParticipantModel, values, {
    groups: [key],
  });
}

const formSchema = getFormSchemaCustomer({
  extraCharge: z.enum(["true", "false"]).optional(),
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
    createEmptyPolicyUser();
  }, []);

  const createEmptyPolicyUser = () => {
    // empty object to show first input (leader)
    dispatch({
      type: CREATE,
      payload: { key: "policyUsers", item: { empty: "empty" } },
    });
  };

  const deleteEmptyPolicyUser = () => {
    dispatch({
      type: DELETE,
      payload: {
        key: "policyUsers",
        identifier: {
          key: "empty",
          value: "empty",
        },
      },
    });
  };

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
    deleteEmptyPolicyUser();

    participantsIteration((key) => {
      dispatch({
        type: CREATE,
        payload: {
          key,
          item: transformCustomerToParticipant(values, key)
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
          item: transformCustomerToParticipant(values, key)
        },
      });
    });
  };

  const deletePolicyUserHandler = (
    values: PolicyParticipantPolicyUserRequest & CustomerModel
  ) => {
    // never leave it empty
    if(policyUsers.length === 1) {
      createEmptyPolicyUser();
    }

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

  const onOkHandler = async (values: CustomerModel | any) => {

    if (selectedParticipantId) {
      updatePolicyUserHandler(values as CustomerModel);
    } else {
      addPolicyUserHandler(values);
    }

    onCancelHandler();
  };

  const onCancelHandler = () => {
    setSelectedParticipantId("");
  };

  const lengthOfValidPolicyUsers = data.policyUsers.filter(
    (user) => user.id
  ).length;

  const onEditClick = (user: CustomerModel) => {
    setOpen(true);
    setSelectedParticipantId(user.id ?? "");
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
                value={user?.displayName || " "}
                onClick={() => onEditClick(user)}
                className={`${!!user.extraCharge ? "pr-32" : ""}`}
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
                      <span className="text-esig text-xs">
                        {" "}
                        Me tarife shtese
                      </span>
                    </div>
                  )
                }
              />
              <Button variant="edit" onClick={() => onEditClick(user)}>
                Zgjidh
              </Button>
              {user.id && (
                <Button
                  variant={"danger"}
                  onClick={() => {
                    deletePolicyUserHandler(user);
                  }}
                >
                  Fshij
                </Button>
              )}
            </div>
          );
        }
      )}

      {/* and lower than the maxDefault from rule (context) */}
      {lengthOfValidPolicyUsers >= 1 && lengthOfValidPolicyUsers <= 3 && (
        <Button
          variant="edit"
          onClick={() => {
            setOpen(true);
          }}
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
          <span>Shto perdorues tjeter</span>
        </Button>
      )}
      {/* the maxDefault from rule (context) */}
      {lengthOfValidPolicyUsers >= 3 && (
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
        setOpen={useCallback((arg: boolean) => {
          setOpen(arg);
        }, [])}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
        formSchema={formSchema}
        footer={<ExtraChargeFooter />}
        destroyOnClose
      >
        <CustomerModal entityId={selectedParticipantId} />
      </Modal>
    </>
  );
};

export default PolicyUsers;
