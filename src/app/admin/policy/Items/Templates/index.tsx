import { useCallback, useEffect, useState } from "react";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CardsRadioGroup, { IItemProps } from "../../components/CardsRadioGroup";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import { useCoreContext } from "../../context";

const Templates = () => {
  const { data } = useCoreContext();

  useEffect(() => {
    getProductTemplates();
  }, []);

  const [open, setOpen] = useState<boolean>(false);

  const [items, setItems] = useState<IItemProps[]>([]);

  const [selected, setSelected] = useState<string>("");

  const openModal = () => {
    setOpen(true);
  };

  const getProductTemplates = async () => {
    const response = await _request(
      `/product/ag/${data.productId}/templates`,
      token,
      {
        method: "POST",
        body: JSON.stringify({
          startRow: 0,
          endRow: 100,
          sortModel: [],
          filterModel: {},
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setItems(response.data);
  };

  const onChange = (e: string) => {
    setSelected(e);
  };

  return (
    <>
      <Button onClick={openModal} variant="edit">
        Shto
      </Button>
      <Modal
        title="Modali i paketave"
        description="Ketu mund te zgjidhni/modikoni objektin e siguruar."
        open={open}
        setOpen={useCallback((arg: boolean) => {
          setOpen(arg);
        }, [])}
        destroyOnClose
      >
        <div className="scrollArea max-h-48 overflow-y-auto pr-2 py-1">
          <CardsRadioGroup
            items={items}
            selected={selected}
            onChange={onChange}
          />
        </div>
      </Modal>
    </>
  );
};

export default Templates;
