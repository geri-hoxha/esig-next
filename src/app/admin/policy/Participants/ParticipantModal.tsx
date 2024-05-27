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
import Button from "../components/Button";

const ParticipantModal: React.FC<IParticipantsList> = ({
  stateKey,
  percentageKey,
  primaryModal,
  setPrimaryModal
}) => {
  const { dispatch } = useCoreContext();

  const [selectedParticipantId, setSelectedParticipantId] =
    useState<string>("");


  const [customerModal, setCustomerModal] = useState<boolean>(false);
 
 


 
  const openCustomerModal = () => setCustomerModal(true);

  const closeCustomerModal = () => setCustomerModal(false);

  const onOkHandler = (values: CustomerModel | {}) => {
    if ("id" in values && selectedParticipantId) {
      dispatch({
        type: UPDATE,
        payload: {
          identifier: {
            value: values["id"],
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
    setPrimaryModal(true);
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

  if (customerModal) {
    return (
      <Modal
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        open
        setOpen={setCustomerModal}
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

      <Modal
        open={primaryModal}
        setOpen={setPrimaryModal}
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        width={"min-w-[25%]"}
      >
        <>
          <div className="flex flex-col gap-4">
            <SortableTable stateKey={stateKey} percentageKey={percentageKey} />
          </div>
          <Button
            className="text-esig hover:bg-sky-50 !text-base !w-full"
            onClick={() => {
              openCustomerModal();
              setPrimaryModal(false);
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
    </>

  );

};

export default ParticipantModal;
