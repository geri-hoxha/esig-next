import Image from "next/image";
import Modal from "@/components/esig/Modal";
import ParticipantModal from "./ParticipantModal";
import { ButtonGeri } from "./page";
import { useCallback, useState } from "react";
import CustomerModal from "./CustomerModal";
import { CREATE } from "@/context/reducer";
import Base from "../components/Fields_v2/Base";

const GeriHoxha = ({ baseUsers, percentageKey, dispatch, stateKey, haveLeader }) => {
  const [firstModalOpen, setFirstModalOpen] = useState(false);
  const [nestedModalOpen, setNestedModalOpen] = useState(false);

  const openFirstModal = () => setFirstModalOpen(true);
  const closeFirstModal = () => setFirstModalOpen(false);

  const openNestedModal = () => setNestedModalOpen(true);

  const closeNestedModal = () => {
    setNestedModalOpen(false);
  };

  const geri = useCallback((e) => {
    setFirstModalOpen(e);
  }, []);

  const onParticipantAdd = (value: any) => {
    console.log(value);

    dispatch({
      type: CREATE,
      payload: {
        item: value,
        key: stateKey,
      },
    });
  };

  if (firstModalOpen) {
    return (
      <Modal
        openProp
        setOpenProp={geri}
        title="Modali i perfituesit"
        description="Ketu mund te modikoni perfituesit e polices."
        body={
          <ParticipantModal haveLeader={haveLeader} baseUsers={baseUsers} percentageKey={percentageKey} dispatch={dispatch} stateKey={stateKey}>
            <ButtonGeri
              className="text-esig hover:bg-sky-50 !text-base !w-full"
              onClick={() => {
                openNestedModal();

                closeFirstModal();
              }}
            >
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
                <span>Shto pjesemarres tjeter</span>
              </div>
            </ButtonGeri>
          </ParticipantModal>
        }
        noButtons
        width={"min-w-[25%]"}
      >
        <></>
      </Modal>
    );
  }

  if (nestedModalOpen) {
    return (
      <Modal
        title="Modali i pjesemarresve"
        description="Ketu mund te modikoni klientin e perzgjedhur."
        body={
          <CustomerModal
            onSave={onParticipantAdd}
            footer={
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
                <div className="w-full">
                  <Base
                    className="bg-red-0"
                    label="Perqindja"
                    name="serial"
                    suffix={"%"}
                  />
                </div>
              </>
            }
          />
        }
        noButtons
        openProp
        setOpenProp={(open: boolean) => {
          setNestedModalOpen(false);

          setFirstModalOpen(true);
        }}
      >
        <></>
      </Modal>
    );
  }
  return (
    <>
      <ButtonGeri
        onClick={() => {
          openFirstModal();
        }}
        className="text-esig hover:bg-sky-50"
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
          <span>Ndrysho</span>
        </div>
      </ButtonGeri>
    </>
  );
};

export default GeriHoxha;
