"use client";

import Image from "next/image";

import Modal from "@/components/esig/Modal";
import React, { Dispatch } from "react";
import Base from "../../components/Fields_v2/Base";
import CustomerModal from "../CustomerModal";
import { ButtonGeri } from "../page";
import { IParticipants } from "./ParticipantsWrapper";
import { CREATE, DELETE, IAction, UPDATE } from "@/context/reducer";
import { useToast } from "@/components/ui/use-toast";

interface IProps {
  data: any;
  dispatch: Dispatch<IAction<IParticipants>>;
}

const PolicyUsers: React.FC<IProps> = ({ data, dispatch }) => {
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

  const onParticipantDelete = (id: string) => {
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
              className="bg-red-0"
              label={index === 0 ? "Lideri *" : ` Perdoruesi ${index + 1}`}
              name="serial"
              value={user?.displayName}
            />
            <Modal
              title="Modali i pjesemarresve"
              description="Ketu mund te modikoni klientin e perzgjedhur."
              body={
                <CustomerModal
                  onSave={(values) => onParticipantUpdate(values, user.id)}
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

      {
        data.length < 3 &&
        <div className="w-full">
        <Modal
          title="Modali i pjesemarresve"
          description="Ketu mund te modikoni klientin e perzgjedhur."
          body={<CustomerModal onSave={onAddParticipant} />}
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
      }
    </>
  );
};

export default PolicyUsers;
