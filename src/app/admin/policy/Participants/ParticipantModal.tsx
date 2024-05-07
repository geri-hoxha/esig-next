import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { CustomerModel } from "../type";
import Modal from "../components/Modal";
import CustomerModal, { getFormSchemaCustomer } from "../CustomerModal";
import { useCoreContext } from "../context";
import { CREATE, UPDATE } from "../context/reducer";
import { IParticipantsList } from "./List";
import { PercentageFooter } from "./ModalFooter";
import { z } from "zod";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import SortableTable from "./SortableTable";

const ParticipantModal: React.FC<IParticipantsList> = ({
  stateKey,
  percentageKey,
}) => {
  const { dispatch } = useCoreContext();

  const [selectedParticipantId, setSelectedParticipantId] =
    useState<string>("");

  const [primaryModal, setPrimaryModal] = useState<boolean>(false);

  const [customerModal, setCustomerModal] = useState<boolean>(false);

  const openPrimaryModal = () => setPrimaryModal(true);

  const closeMainModal = () => setPrimaryModal(false);

  const openCustomerModal = () => setCustomerModal(true);

  const closeCustomerModal = () => setCustomerModal(false);

  const onOkHandler = (values: CustomerModel) => {
    if (selectedParticipantId) {
      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: values.id,
          },
          key: stateKey,
          item: values,
        },
      });
    } else {
      dispatch({
        type: CREATE,
        payload: {
          item: values,
          key: stateKey,
        },
      });
    }

    onCancelHandler();
  };

  const onCancelHandler = () => {
    closeCustomerModal();
    openPrimaryModal();
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

  const formSchema = getFormSchemaCustomer({
    [percentageKey]: z.string(),
  });

  if (primaryModal) {
    return (
      <Modal
        open={primaryModal}
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        width={"min-w-[25%]"}
      >
        <>
          <div className="flex flex-col gap-4">
            <SortableTable
               stateKey={stateKey}
               percentageKey={percentageKey}
            />
          </div>
          <Button
            className="text-esig hover:bg-sky-50 !text-base !w-full"
            onClick={() => {
              openCustomerModal();
              closeMainModal();
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
          </Button>
        </>
      </Modal>
    );
  }

  if (customerModal) {
    return (
      <Modal
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        open={customerModal}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
        formSchema={formSchema}
        defaultValues={defaultValuesPromise}
      >
        <CustomerModal id={selectedParticipantId}>
          <PercentageFooter percentageKey={percentageKey} />
        </CustomerModal>
      </Modal>
    );
  }

  return (
    <>
      <Button onClick={openPrimaryModal} className="text-esig hover:bg-sky-50">
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
      </Button>
    </>
  );
};

export default ParticipantModal;
