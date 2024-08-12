import { useCallback, useState } from "react";
import { CustomerModel, PolicyParticipantPolicyUserRequest } from "../type";
import Modal from "../components/Modal";
import CustomerModal, { getFormSchemaCustomer } from "../CustomerModal";
import { useCoreContext } from "../context";
import { CREATE, UPDATE } from "../context/reducer";
import { IParticipantsList } from "./List";
import { PercentageFooter } from "./ModalFooter";
import { z } from "zod";
import _request from "@/request";
import SortableTable, { SortableParticipant } from "./SortableTable";
import Button from "../components/Button";
import { useToast } from "@/components/ui/use-toast";
import { withErrorHandling } from "../helpers";
import { plainToClass } from "class-transformer";
import ParticipantModel from "./dto";

const ParticipantModal: React.FC<IParticipantsList> = ({
  stateKey,
  percentageKey,
}) => {
  const { data, dispatch } = useCoreContext();

  const [selectedParticipantId, setSelectedParticipantId] =
  useState<string>("");

  const [primaryModal, setPrimaryModal] = useState<boolean>(false);

  const [customerModal, setCustomerModal] = useState<boolean>(false);

  const openCustomerModal = () => setCustomerModal(true);

  const closeCustomerModal = () => setCustomerModal(false);

  const { toast } = useToast();

  const onOkHandler = withErrorHandling((values: SortableParticipant) => {
    const leader = data[stateKey].at(0);

    const leaderPercentage: number =
      // @ts-ignore
      (leader?.[percentageKey] || 0) - (values[percentageKey] || 0);

    if (leaderPercentage < 0) {
      toast({
        variant: "destructive",
        title: `Perqindja e liderit nuk mund te jete me e vogel se 0: Kontrollo perqindjet!`,
      });
      return;
    }

    // insert the new participant
    dispatch({
      type: CREATE,
      payload: {
        item: plainToClass(ParticipantModel, values, {
          groups: ['policyHolders'],
        }),
        key: stateKey,
      },
    });

    // update first participant (leader) on context
    dispatch({
      type: UPDATE,
      payload: {
        key: stateKey,
        item: {
          ...leader,
          [percentageKey]: leaderPercentage,
        },
        identifier: { value: leader?.id ?? "" },
      },
    });

    onCancelHandler();
  });

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
        destroyOnClose
        footer={<PercentageFooter percentageKey={percentageKey} />}
      >
        <CustomerModal stateKey={stateKey} entityId={selectedParticipantId} />
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
        noActions
      >
        <div className="flex flex-col gap-4 mb-4">
          <SortableTable stateKey={stateKey} percentageKey={percentageKey} />
          <Button
            variant="edit"
            onClick={() => {
              openCustomerModal();
              setPrimaryModal(false);
            }}
            className="mx-auto w-max"
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
      >
        <span>Ndrysho</span>
      </Button>
    </>
  );
};

export default ParticipantModal;
