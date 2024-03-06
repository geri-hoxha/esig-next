"use client";

import Participants from "@/components/esig/Participants";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { IContext, useSale } from "@/context/SaleContext";
import { SET } from "@/context/reducer";
import { toCurrencyStandardFormatCurrency } from "@/lib/helpers";
import Image from "next/image";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";

const fakeData = [
  {
    id: "1",
    displayName: "Agim Molla",
    invoiceSplitPercentage: 12,
  },
  {
    id: "2",
    displayName: "Filan Fisteku",
    invoiceSplitPercentage: 4,
  },
  {
    id: "3",
    displayName: "Fiqiri Bobi",
    invoiceSplitPercentage: 9.3,
  }
];

export default function InvoiceRecipients() {
  const { data, dispatch }: IContext = useSale();

  const { toast } = useToast();

  const [editing, setEditing] = useState<{
    id: string;
    percentage?: string;
  } | null>(null);

  const participants = data['invoiceRecipients'];

  useEffect(() => {
    dispatch({ type: SET, payload: { key: 'invoiceRecipients', item: fakeData } });
  }, []);

  const inputPercentageRef: RefObject<HTMLInputElement> = useRef(null);

  const updateParticipantPercentage = () => {
    if (editing === null) return;

    const updatedParticipants = participants.map((participant) => {
      if (participant.id === editing.id) {
        return {
          ...participant,
          invoiceSplitPercentage: editing.percentage,
        };
      }
      return participant;
    });

    dispatch({
      type: SET,
      payload: { key: 'invoiceRecipients', item: updatedParticipants },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        editing !== null &&
        inputPercentageRef.current &&
        !inputPercentageRef.current.contains(event.target)
      ) {
        setEditing(null);
        if (Number(editing.percentage)) {
          if (Number(editing.percentage) > 100) {
            return toast({
              variant: "destructive",
              title: `Perqindja nuk mund te jete me e madhe se 100%`,
            });
          }

          updateParticipantPercentage();
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editing]);

  const editPercentageHandler = (participant: any) => {
    setEditing({
      id: participant.id,
      percentage: participant['invoiceSplitPercentage' ?? ""] ?? 0,
    });
    // delay focus since input is not yet mounted
    setTimeout(() => {
      inputPercentageRef.current?.focus();
    }, 200);
  };

  const onPercentageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditing({
      id: editing?.id ?? "",
      percentage: event.target.value,
    });
  };

  const handlePercentageEnter = (event: any) => {
    if (event.key !== "Enter") return;

    const value = Number(event.target.value);

    if (typeof value === "number") {
      if (value > 100) {
        return toast({
          variant: "destructive",
          title: `Perqindja nuk mund te jete me e madhe se 100%`,
        });
      }
      updateParticipantPercentage();
    }

    setEditing(null);
  };

  return (
    <Participants
      title="Faturuesit"
      contextProperty={'invoiceRecipients'}
      headerName={"Perqindja %"}
    >
      {(participant) => {
        return (
          <div className="col-span-2 px-2 -ml-5">
            <div className="my-1.5 flex items-center h-4 pt-2">
              {editing?.id === participant.id ? (
                <Input
                  onKeyDown={handlePercentageEnter}
                  onChange={onPercentageChange}
                  className="h-6"
                  ref={inputPercentageRef}
                  value={editing?.percentage}
                  onFocus={(event) => event.target.select()}
                />
              ) : (
                <div
                  className="flex items-center group gap-x-1"
                  onClick={() => editPercentageHandler(participant)}
                >
                  <Image
                    className="cursor-pointer border-b-2 border-transparent group-hover:border-black"
                    src="/svg/edit.svg"
                    alt="edit"
                    width={"0"}
                    height={"0"}
                    style={{ width: 20, height: 20 }}
                    priority
                  />
                  <span>
                    {toCurrencyStandardFormatCurrency(
                      participant.invoiceSplitPercentage
                    )}{" "}
                    %
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      }}
    </Participants>
  );
}
