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

interface IProps {
  data: any;
  dispatch: Dispatch<IAction<IParticipants>>;
}

// Function to push query parameters to the current URL
export function pushQueryParams(params: any) {
  // Get current URL and its search parameters
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  // Append or set the provided parameters
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.set(key, params[key]);
    }
  }

  // Update the URL with the new parameters
  url.search = searchParams.toString();
  window.history.pushState({ path: url.href }, "", url.href);
}

// Function to get query parameters from the current URL
export function getQueryParams() {
  // Get current URL and its search parameters
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  // Create an object to store the query parameters
  const queryParams = {};

  // Iterate over the search parameters and populate the queryParams object
  for (const [key, value] of searchParams?.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
}

export function removeQueryParam(paramKey: string) {
  // Get current URL and its search parameters
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  // Remove the specified parameter
  searchParams.delete(paramKey);

  // Update the URL with the new parameters
  url.search = searchParams.toString();
  const newUrl = url.toString();

  // Replace the current URL with the new URL
  window.history.replaceState({ path: newUrl }, "", newUrl);
}

const PolicyUsers: React.FC<IProps> = ({ data, dispatch }) => {
  const { toast } = useToast();

  const onAddParticipant = (values: any) => {
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
      <Image
        className="cursor-pointer"
        src="/svg/question.svg"
        alt="edit"
        width={"0"}
        height={"0"}
        style={{ width: 30, height: 20 }}
        priority
      />
      <div className="flex items-center w-full">
        <div className="mr-2 text-gray-700 font-semibold text-sm ">
          Tarife shtese:
        </div>
        <div className="w-10">
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

  if (data.length === 0) {
    return (
      <div className="flex items-center">
        <Base
          className="bg-red-0"
          label={"Lideri *"}
          name="serial"
          value={""}
        />
        <Modal
          title="Modali i pjesemarresve"
          description="Ketu mund te modikoni klientin e perzgjedhur."
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
