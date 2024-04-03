import { createRef, useRef, useState } from "react";
import Zerat from "../Zerat";
import ZeratModal from "../ZeratModal";
import { Geri } from "../page";
import InsuredObjects from "./InsuredObjects";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

const Item: React.FC<{
  item: number;
  deleteItem: (number: number) => void;
}> = ({ item, deleteItem }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const increment = () => {
    setSelected(true);
  };

  return (
    <Geri
      key={item}
      title={
        <div className="flex items-center gap-4">
          <h2 className="text-2xl">Zerat e polices ( zeri {item} )</h2>

          {item !== 1 && (
            <Image
              className="cursor-pointer"
              src="/svg/close.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 25, height: 25 }}
              priority
              onClick={() => deleteItem(item)}
            />
          )}
        </div>
      }
      items={[
        {
          title: "Objektet e siguruara",
          className: "scrollArea max-h-[500px] overflow-y-auto pr-2 pb-2",
          children: <InsuredObjects />,
        },
        {
          title: (
            <div className="flex items-center justify-between">
              <h3 className="text-xl bg-red-0">Mbulimet e objektit / eve</h3>
              <ZeratModal increment={increment} />
            </div>
          ),
          cols: "1",
          className: "scrollArea max-h-[500px] overflow-y-auto pr-2",
          children: (
            <>
              {selected ? (
                <>
                  <Zerat />
                  <Zerat />
                  <Zerat />
                </>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="border-2 border-gray-400 border-dotted text-gray-600 text-sm px-3 py-1 rounded-md mt-20">
                    Asnje pakete / mbulim i perzgjedhur ...
                  </div>
                </div>
              )}
            </>
          ),
        },
      ]}
    />
  );
};

interface IItem {
  serial: number;
  ref: any;
}

const ZeratWrapper = () => {
  const { toast } = useToast();

  const [items, setItems] = useState<IItem[]>([
    {
      serial: 1,
      ref: createRef(),
    },
  ]);

  const addNewItem = () => {
    const ref = createRef();

    setItems([
      ...items,
      {
        serial: items.length + 1,
        ref,
      },
    ]);

    setTimeout(() => {
      const yOffset = -100; // Adjust the offset as per your requirement
      const y =
        ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  };

  const deleteItem = (item: number) => {
    setItems(items.filter((x) => x.serial !== item));

    toast({
      title: `Zeri numer: ${item} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            setItems(items);
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  return (
    <>
      {items.map((item, index) => {
        return (
          <div key={item.serial} ref={item.ref}>
            <Item item={item.serial} deleteItem={deleteItem} />
          </div>
        );
      })}

      <div className="flex items-center ">
        <div className="border-b-2 w-full h-px border-dashed  border-esig"></div>
        <div
          onClick={addNewItem}
          className="cursor-pointer group border-2  w-1/2 mx-auto  py-2 text-esig   h-max border-dashed  border-esig flex items-center justify-center hover:bg-sky-50 hover:shadow-md rounded-sm   transition-all duration-200 relative"
        >
          <div className="flex items-center justify-center gap-2">
            <svg
              className="stroke-esig"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
            </svg>

            <span className="font-semibold">Shto ze police</span>
          </div>
        </div>
        <div className="border-b-2 w-full h-px border-dashed  border-esig"></div>
      </div>
    </>
  );
};

export default ZeratWrapper;
