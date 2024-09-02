import { Dispatch, SetStateAction, useCallback } from "react";
import Modal from "../components/Modal";
import { CustomerModel } from "../type";
import CustomerModal from "../CustomerModal";
import { useCoreContext } from "../context";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOkHandler: ((values: CustomerModel) => void | Promise<void>) | undefined;
  entityId?: string;
  itemIndex: number;
}

const ObjectModal = ({ open, setOpen, onOkHandler, itemIndex, entityId = '' }: IProps) => {
  const { data } = useCoreContext();

  return (
    <Modal<CustomerModel>
      title="Modali i objekteve te siguruara"
      description="Ketu mund te zgjidhni/modikoni objektin e siguruar."
      open={open}
      setOpen={useCallback((arg: boolean) => {
        setOpen(arg);
      }, [])}
      onOk={onOkHandler}
      destroyOnClose
    >
      <CustomerModal
        entityId={entityId}
        duplicationValidationFailed={(values) => {
          return data.items[itemIndex].insuredObjects.map((insuredObjects) => insuredObjects.object.customerId).includes(values?.id)
        }}
      />
    </Modal>
  )
}

export default ObjectModal;