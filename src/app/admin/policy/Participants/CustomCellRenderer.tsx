import Image from "next/image";
import { ChangeEvent, ChangeEventHandler, ReactNode, useState } from "react";
import { CustomerModel } from "../type";
import { IRowNode } from "ag-grid-enterprise";
import Input from "../components/Input";
import numeral from "numeral";
import { isPolicyHolder } from ".";
import { IParticipantsList, ParticipantWithPercentage } from "./List";
import { useCoreContext } from "../context";
import { DELETE } from "../context/reducer";
import { Toast } from "@/components/ui/use-toast";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

interface IProps extends IParticipantsList {
  node: IRowNode<CustomerModel>;
  data: CustomerModel;
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}
}

const CustomCellRenderer: React.FC<IProps> = ({
  node,
  data,
  percentageKey,
  stateKey,
  toast,
  ...others
}) => {

  const { data: coreData, dispatch } = useCoreContext();

  const [percentage, setPercentage] = useState<number>(
    (data as ParticipantWithPercentage)[percentageKey]
  );
  console.log(others)

 
  const deleteParticipant = (data: any) => {
    dispatch({
      type: DELETE,
      payload: {
        key: stateKey,
        identifier: { value: data.id },
      },
    });

    const leaderParticipant = rowData.at(0);

    const x = [...rowData].filter((item) => item.id !== data.id);

    toast({
      title: `Pjesemarresi: ${data.displayName} u fshi nga lista!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={() => {
            // using the power of closures
            dispatch({
              type: SET,
              payload: { key: stateKey, item: baseUsers },
            });

            setRowData(rowData);
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });

    const sum = x.reduce((accumulator, currentValue, index) => {
      if (index === 0) return 0;
      return accumulator + currentValue[percentageKey];
    }, 0);

    const users2 = x.map((item: any) => {
      if (item.id === leaderParticipant.id) {
        return {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        };
      }

      return item;
    });

    dispatch({
      type: UPDATE,
      payload: {
        key: stateKey,
        item: {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        },
        identifier: { value: leaderParticipant.id },
      },
    });

    setRowData(users2);
  };
  


  const onPercentageChange = (event: ChangeEvent<HTMLInputElement>) => {
    

    const value = Number(e.target.value ?? 0) / 100;

    const leaderParticipant = rowData.at(0);

    if (value > leaderParticipant?.[percentageKey]) {
      return toast({
        variant: "destructive",
        title: `Perqindja nuk mund te jete me e madhe se perqindja e liderit!`,
      });
    }

    const users = rowData.map((item: any) => {
      if (item.id === data.id) {
        return {
          ...item,
          [percentageKey]: value,
        };
      }

      return item;
    });

    const sum = users.reduce((accumulator, currentValue, index) => {
      if (index === 0) return 0;
      return accumulator + currentValue[percentageKey];
    }, 0);

    const users2 = users.map((item: any) => {
      if (item.id === leaderParticipant.id) {
        return {
          ...leaderParticipant,
          [percentageKey]: 1 - sum,
        };
      }

      return item;
    });

    setRowData(users2);

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item: users2,
      },
    });




    // Remove all non-digit characters from the input for robustness
    const rawNumbers = event.target.value.replace(/\D/g, "");
    // Format the number with commas
    const formattedNumber = rawNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    console.log(formattedNumber);
    setPercentage(Number(formattedNumber));
  };

  return (
    <>
      <div className={`flex flex-col  border-l  pb-5 pl-5 `}>
        {node.rowIndex === 0 && isPolicyHolder(data) && (
          <div className="mt-2 flex items-center" style={{ lineHeight: 0 }}>
            <Image
              src="/svg/info.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span className="text-esig font-bold pl-2">Lider</span>
          </div>
        )}

        <div className="flex items-center justify-between gap-4  mt-2 mb-4 ">
          <span className="font-bold text-lg text-gray-600 truncate w-3/5">
            {data.displayName}
          </span>

          {node.rowIndex !== 0 && (
            <button
              onClick={() => deleteParticipant(data.id)}
              className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100"
            >
              <div className="flex items-center gap-x-1">
                <Image
                  src="/svg/close.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span>Fshij</span>
              </div>
            </button>
          )}
        </div>
        <Input
          label="Perqindja"
          placeholder="Perqindja"
          value={numeral(Number((percentage ?? 0) * 100)).format("0.00")}
          suffix={"%"}
          readOnly={node.rowIndex === 0}
          onChange={onPercentageChange}
        />
      </div>
    </>
  );
};

export default CustomCellRenderer;
