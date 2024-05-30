import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CustomerModel } from "../type";
import { IRowNode } from "ag-grid-enterprise";
import Input from "../components/Input";
import { isPolicyHolder } from ".";
import { IParticipantsList, ParticipantWithPercentage } from "./List";
import { useCoreContext } from "../context";
import { DELETE, SET, UPDATE } from "../context/reducer";
import { Toast } from "@/components/ui/use-toast";
import { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { ToastAction } from "@/components/ui/toast";
import { SortableParticipant } from "./SortableTable";

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

interface IProps extends IParticipantsList {
  node: IRowNode<CustomerModel>;
  data: CustomerModel;
  toast: ({ ...props }: Toast) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
  };
  rowData: SortableParticipant[];
  setRowData: React.Dispatch<React.SetStateAction<SortableParticipant[]>>;
  rowIndex: number;
}

const roundTwoDigits = (number: number = 0) => {
  return Math.round((Number(number) + Number.EPSILON) * 100) / 100;
};

// components remounts each time we change input percentage because of Ag-grid. Save the index being updated outside react tree, so we can compare later which input to autofocus
let autoFocus = -1;

const CustomCellRenderer: React.FC<IProps> = ({
  data,
  percentageKey,
  stateKey,
  toast,
  rowData,
  setRowData,
  rowIndex,
  ...props
}) => {
  const { data: coreData, dispatch } = useCoreContext();

  const [percentage, setPercentage] = useState<number>(
    roundTwoDigits((data as ParticipantWithPercentage)[percentageKey])
  );

  const deleteParticipant = (data: CustomerModel) => {
    dispatch({
      type: DELETE,
      payload: {
        key: stateKey,
        identifier: { value: data.id },
      },
    });

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
              payload: { key: stateKey, item: coreData[stateKey] },
            });

            setRowData(rowData);
          }}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });

    const leaderParticipant = rowData.at(0);

    // find the new sum
    const sum = rowData.reduce((accumulator, currentValue, index) => {
      if (index === 0) return 0;

      if (currentValue.id === data.id) return accumulator;

      return accumulator + (currentValue[percentageKey] || 0);
    }, 0);

    // calculate percentage for leader
    const updatedParticipants: SortableParticipant[] = [];

    rowData.forEach((item: SortableParticipant) => {
      if (item.id === data.id) return;

      if (item.id === leaderParticipant?.id) {
        return updatedParticipants.push({
          ...leaderParticipant,
          [percentageKey]: 100 - sum,
        });
      }

      updatedParticipants.push(item);
    });

    // update first participant (leader) on context
    dispatch({
      type: UPDATE,
      payload: {
        key: stateKey,
        item: {
          ...leaderParticipant,
          [percentageKey]: 100 - sum,
        },
        identifier: { value: leaderParticipant?.id ?? "" },
      },
    });

    // update local state
    setRowData(updatedParticipants);
  };

  const onPercentageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value ?? 0);

    const leaderParticipant = rowData.at(0);

    // calculate the sum of percentages of participants who are not leader
    const sum = [...rowData].reduce(
      (accumulator, currentValue: SortableParticipant, index) => {
        // dont calculate the leader (the one who holds the remain percentage)
        if (index === 0) return 0;

        // new value to calculate
        if (currentValue["id"] === data.id) {
          return accumulator + value;
        }

        // old values
        return accumulator + (currentValue?.[percentageKey] || 0);
      },
      0
    );

    const leftOverLeaderPercentage = 100 - sum;

    // validate
    if (leftOverLeaderPercentage < 0) {
      return toast({
        variant: "destructive",
        title: `Perqindja e liderit nuk mund te jete me e vogel se 0: Kontrollo perqindjet!`,
      });
    }

    const updatedParticipant = rowData.map((item: any) => {
      // the one who was edited
      if (item.id === data.id) {
        return {
          ...item,
          [percentageKey]: value,
        };
      }

      // update leader percentge
      if (item.id === leaderParticipant?.id) {
        return {
          ...leaderParticipant,
          [percentageKey]: leftOverLeaderPercentage,
        };
      }

      return item;
    });

    setRowData(updatedParticipant);

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item: updatedParticipant,
      },
    });

    setPercentage(roundTwoDigits(value));

    autoFocus = rowIndex;
  };

  return (
    <>
      <div className={`flex flex-col  border-l  pb-5 pl-5 `}>
        {rowIndex === 0 && isPolicyHolder(data) && (
          <div className="mt-2 flex items-center" style={{ lineHeight: 0 }}>
            <Image
              src="/svg/info.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 20, height: 20 }}
              priority
            />
            <span className="text-esig text-lg font-bold pl-2">Lider</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-4  mt-2 mb-4 ">
          <span className="font-bold text-lg text-gray-600 truncate w-4/5">
            {data.displayName}
          </span>

          {rowIndex !== 0 && (
            <button
              onClick={() => deleteParticipant(data)}
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
          key={data.id}
          label="Perqindja"
          placeholder="Perqindja"
          value={percentage}
          type="number"
          autoFocus={rowIndex !== 0 && autoFocus === rowIndex}
          suffix={<span className="font-bold">%</span>}
          readOnly={rowIndex === 0}
          onChange={onPercentageChange}
        />
      </div>
    </>
  );
};

export default CustomCellRenderer;
