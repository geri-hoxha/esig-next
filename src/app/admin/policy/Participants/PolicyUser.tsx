"use client";

import Image from "next/image";
import Modal from "@/components/esig/Modal";
import React, { Dispatch, useEffect } from "react";
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

interface IProps {
  data: CustomerModel[];
  dispatch: Dispatch<IAction<IParticipants>>;
}

const PolicyUsers: React.FC<IProps> = ({ data, dispatch }) => {
  const { data: coreData, dispatch: dispatchCore } = useCoreContext();

  const { policyUsers, policyHolders, beneficiaries, invoiceRecipients } =
    coreData;

  useEffect(() => {
    // empty object to show first input (leader)
    dispatch({ type: CREATE, payload: { key: "policyUsers", item: {} } });
  }, []);

  const { toast } = useToast();

  const participants: { [key: symbol]: { customerId: string }[] } = {
    policyUsers,
    policyHolders,
    beneficiaries,
    invoiceRecipients,
  };

  const addPolicyUserHandler = (values: CustomerModel) => {

    Object.keys(participants).forEach((key) => {
      dispatch({
        type: CREATE,
        payload: {
          key,
          item: {
            customerId: values.id,
          },
        },
      });
    });

  };

  const onParticipantUpdate = (values: any, id: string | undefined) => {
    // update
    if (id) {
      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: id,
          },
          key: "policyUsers",
          item: values,
        },
      });

      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: id,
          },
          key: "beneficiaries",
          item: values,
        },
      });

      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: id,
          },
          key: "policyHolders",
          item: values,
        },
      });

      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: id,
          },
          key: "invoiceRecipients",
          item: values,
        },
      });
      return;
    }

    // add
    dispatch({
      type: CREATE,
      payload: {
        key: "policyUsers",
        item: values,
      },
    });
    dispatch({
      type: CREATE,
      payload: {
        key: "beneficiaries",
        item: values,
      },
    });
    dispatch({
      type: CREATE,
      payload: {
        key: "policyHolders",
        item: values,
      },
    });
    dispatch({
      type: CREATE,
      payload: {
        key: "invoiceRecipients",
        item: values,
      },
    });
  };

  const onParticipantDelete = (user: any) => {
    const { id } = user;
    dispatch({
      type: DELETE,
      payload: {
        key: "policyUsers",
        identifier: {
          value: id,
        },
      },
    });
    dispatch({
      type: DELETE,
      payload: {
        key: "beneficiaries",
        identifier: {
          value: id,
        },
      },
    });
    dispatch({
      type: DELETE,
      payload: {
        key: "policyHolders",
        identifier: {
          value: id,
        },
      },
    });
    dispatch({
      type: DELETE,
      payload: {
        key: "invoiceRecipients",
        identifier: {
          value: id,
        },
      },
    });

    toast({
      title: `Pjesemarresi: ${user.displayName} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            dispatch({
              type: SET,
              payload: { key: "policyUsers", item: data },
            });
            dispatch({
              type: SET,
              payload: { key: "invoiceRecipients", item: data },
            });
            dispatch({
              type: SET,
              payload: { key: "beneficiaries", item: data },
            });
            dispatch({
              type: SET,
              payload: { key: "policyHolders", item: data },
            });
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

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

  const setSelectedPolicyUser = (id: string) => {
    pushQueryParams({ id });
  };

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
    </>
  );
};

export default PolicyUsers;
