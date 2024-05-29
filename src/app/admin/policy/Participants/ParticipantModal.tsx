import { useCallback, useState } from "react";
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
}) => {
  const { dispatch } = useCoreContext();

  const [primaryModal, setPrimaryModal] = useState<boolean>(false);

  const [customerModal, setCustomerModal] = useState<boolean>(false);

  const openCustomerModal = () => setCustomerModal(true);

  const closeCustomerModal = () => setCustomerModal(false);

  const onOkHandler = (values: CustomerModel | {}) => {
    dispatch({
      type: CREATE,
      payload: {
        item: {
          ...values,
          ...(stateKey === 'policyHolders' ? {isLeader: false} : {})
        },
        key: stateKey,
      },
    });

    onCancelHandler();
  };

  const onCancelHandler = () => {
    closeCustomerModal();
    setPrimaryModal(true);
  };

  const formSchema = getFormSchemaCustomer({
    [percentageKey]: z
      .string()
      .min(1, "Perqindja e pronesise eshte e detyrueshme!"),
  });

  if (customerModal) {
    return (
      <Modal
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        open
        setOpen={useCallback((arg: boolean) => {
          setCustomerModal(arg);
        }, [])}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
        formSchema={formSchema}
        footer={<PercentageFooter percentageKey={percentageKey} />}
      >
        <CustomerModal />
      </Modal>
    );
  }

  return (
    <>
      <Modal
        open={primaryModal}
        setOpen={useCallback((arg: boolean) => {
          setPrimaryModal(arg);
        }, [])}
        title="Modali i pjesemarresve te polices"
        description="Krijoni ose perditesoni listen e klienteve ne Esig"
        width={"min-w-[25%]"}
      >
        <div className="flex flex-col gap-4 mb-4">
          <SortableTable stateKey={stateKey} percentageKey={percentageKey} />
          <Button
            variant="edit"
            onClick={() => {
              openCustomerModal();
              setPrimaryModal(false);
            }}
            className="mx-auto w-full"
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
            <span>Shto pjesemarres tjeter</span>
          </Button>
        </div>
      </Modal>

      <Button
        variant="edit"
        onClick={() => {
          setPrimaryModal(true);
        }}
        className="text-esig hover:bg-sky-50"
      >
        <span>Ndrysho</span>
      </Button>
    </>
  );
};

export default ParticipantModal;
