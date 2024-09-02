import { useState } from "react";
import { useCoreContext } from "../context";
import { CustomerModel } from "../type";
import PolicyItemController from "../context/PolicyItemController";
import ObjectModal from "./ObjectModal";
import Button from "../components/Button";
import { useToast } from "@/components/ui/use-toast";

const AddObject = ({ itemIndex }: { itemIndex: number }) => {
  const [open, setOpen] = useState<boolean>(false);

  const { data, dispatch } = useCoreContext();

  const { toast } = useToast();

  const onOkHandler = (values: CustomerModel) => {
    try {
      const controller = new PolicyItemController(data.items[itemIndex]);

      dispatch(controller.createInsuredObject(values));
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error.message,
      });
    }
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={openModal} variant="edit">
        Shto
      </Button>
      <ObjectModal
        open={open}
        setOpen={setOpen}
        onOkHandler={onOkHandler}
        itemIndex={itemIndex}
      />
    </>
  );
};

export default AddObject;
