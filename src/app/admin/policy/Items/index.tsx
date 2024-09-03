"use client";
import { useToast } from "@/components/ui/use-toast";
import Section, { ISectionItemProps } from "../Section";
import { LegacyRef, ReactNode, createRef, useEffect, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import Image from "next/image";
import Popconfirm from "../components/PopConfirm";
import PolicyItemController from "../context/PolicyItemController";
import { useCoreContext } from "../context";
import Button from "../components/Button";
import Templates from "./Templates";
import Coverages from "./Coverages";

interface IItem {
  id: number;
  ref: LegacyRef<HTMLDivElement> | undefined;
}

const Items = ({
  children = () => ({
    title: "",
    children: null,
  }),
}: {
  children: (itemIndex: number) => ISectionItemProps;
}) => {
  const { data, dispatch } = useCoreContext();

  const { toast } = useToast();

  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    const id = items.length + 1;

    dispatch(PolicyItemController.createItem(id));

    setItems([
      ...items,
      {
        id,
        ref: createRef(),
      },
    ]);
  }, []);

  const addNewItem = () => {
    const ref: LegacyRef<HTMLDivElement> | undefined = createRef();

    setItems([
      ...items,
      {
        id: items.length + 1,
        ref,
      },
    ]);

    setTimeout(() => {
      const boundingRect = ref.current?.getBoundingClientRect();

      const yOffset = -100; // Adjust the offset as per your requirement

      const y = (boundingRect?.top || 0) + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));

    toast({
      title: `Zeri numer: ${id} u fshi nga lista!`,
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

  const allItemsCoverages = data.items
    .map((item) => {
      return item.coverages;
    })
    .filter((coverages) => coverages?.length > 0);

  const canAddNewItem = allItemsCoverages.length === data.items.length;

  return (
    <>
      {items.map((item) => {
        return (
          <div ref={item.ref} key={item.id}>
            <Section
              title={
                <div className="flex items-center gap-4">
                  <h2 className="text-xl md:text-2xl flex items-center gap-2">
                    <span className="text-white bg-esig font-bold rounded-full flex items-center justify-center text-base px-2.5">
                      {item.id}
                    </span>
                    <span> Zerat e polices</span>
                  </h2>

                  {item.id !== 1 && (
                    <Popconfirm
                      title="Fshi zerin?"
                      description="A jeni i sigurte qe doni te fshini zerin?"
                      onConfirm={() => deleteItem(item.id)}
                    >
                      <div className="w-10 h-10 hover:bg-red-100 flex items-center rounded-full justify-center cursor-pointer">
                        <Image
                          className="cursor-pointer"
                          src="/svg/close.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 25, height: 25 }}
                          priority
                        />
                      </div>
                    </Popconfirm>
                  )}
                </div>
              }
              items={[
                children(item.id - 1) || {},
                {
                  title: (
                    <div className="flex items-center">
                      <span className="text-xl">Paketa & Mbulime</span>
                      <Templates />
                    </div>
                  ),
                  cols: "1",
                  className: "scrollArea max-h-[500px] overflow-y-auto pr-2",
                  children: <Coverages />,
                },
                // {
                //   title: (
                //     <div className="flex items-center justify-between border-gray-400 border-dashed pt-4 sm:pt-0 border-t sm:border-none">
                //       <h3 className="hidden sm:block text-lg md:text-xl bg-red-0">
                //         Mbulimet e objektit / eve
                //       </h3>
                //       {/* {selected && <ZeratModal increment={increment} />} */}
                //     </div>
                //   ),
                //   cols: "1",
                //   className: "scrollArea max-h-[500px] overflow-y-auto pr-2",
                //   children: (
                //     <>
                //       {selected ? (
                //         <>
                //           <Zerat />
                //           <Zerat />
                //           <Zerat />
                //         </>
                //       ) : (
                //         <ZeratModal increment={increment}>
                //           <div className="cursor-pointer group border   w-full h-full border-dashed sm:min-h-36 border-transparent  hover:border-esig flex items-center justify-center hover:bg-sky-50 hover:shadow-md rounded-xl   transition-all duration-200 relative">
                //             <div className="flex md:hidden items-center gap-x-1 mx-auto py-2">
                //               <svg
                //                 className="stroke-esig"
                //                 width="14"
                //                 height="14"
                //                 xmlns="http://www.w3.org/2000/svg"
                //                 fillRule="evenodd"
                //                 clipRule="evenodd"
                //               >
                //                 <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
                //               </svg>
                //               <span className="text-esig">
                //                 Shto pjesemarres tjeter
                //               </span>
                //             </div>

                //             <svg
                //               className="stroke-esig hidden md:block"
                //               width="30"
                //               height="30"
                //               xmlns="http://www.w3.org/2000/svg"
                //               fillRule="evenodd"
                //               clipRule="evenodd"
                //             >
                //               <path d="M14 14v-14h1v14h14v1h-14v14h-1v-14h-14v-1h14z" />
                //             </svg>
                //           </div>
                //         </ZeratModal>
                //       )}
                //     </>
                //   ),
                // },
              ]}
            />
          </div>
        );
      })}

      {canAddNewItem && (
        <div className="flex items-center">
          <div className="border-b-2 w-full  border-sky-100  border-esig"></div>

          <Button
            variant="edit"
            className="w-full mx-auto bg-sky-100 hover:!bg-sky-100"
            onClick={addNewItem}
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
            <span className="text-xl">Shto ze police</span>
          </Button>

          <div className="border-b-2 w-full  border-sky-100  border-esig"></div>
        </div>
      )}
    </>
  );
};

export default Items;
