import { useCallback, useState } from "react";
import Modal from "../../components/Modal";
import CustomerModal from "../../CustomerModal";
import { CustomerModel, PolicyItemRequest } from "../../type";
import { FieldValues } from "react-hook-form";
import { useCoreContext } from "../../context";
import { CREATE, UPDATE } from "../../context/reducer";
import PolicyItemController from "../../context/PolicyItemController";

const Empty = ({ itemIndex }: { itemIndex: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, dispatch } = useCoreContext();

  const onOkHandler = (values: CustomerModel) => {

    const controller = new PolicyItemController(data.items[itemIndex]);

    dispatch(controller.createInsuredObject<CustomerModel>(values));
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="cursor-pointer group border   w-full h-full border-dashed sm:min-h-36 border-transparent  hover:border-esig flex items-center justify-center hover:bg-sky-50 hover:shadow-md rounded-xl   transition-all duration-200 relative"
      >
        <div className="flex md:hidden items-center gap-x-1 mx-auto py-2">
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
          <span className="text-esig">Shto pjesemarres tjeter</span>
        </div>

        <svg
          className="stroke-esig hidden md:block"
          width="30"
          height="30"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M14 14v-14h1v14h14v1h-14v14h-1v-14h-14v-1h14z" />
        </svg>
      </div>

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
        <CustomerModal stateKey="policyUsers" entityId={""} />
      </Modal>
    </>
  );
};

export default Empty;
