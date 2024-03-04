"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChangeEvent, RefObject, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IContext, ISaleContext, useSale } from "@/context/SaleContext";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DELETE, SET, UPDATE } from "@/context/reducer";
import Modal from "./Modal";
import CustomerModal from "./CustomerModal";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { Input } from "../ui/input";
import { toCurrencyStandardFormatCurrency } from "@/lib/helpers";

interface IProps {
  title: string;
  contextProperty: keyof ISaleContext;
  percentage?: {
    headerName: string;
    field: string;
  };
}

const Participants: React.FC<IProps> = ({
  title,
  contextProperty,
  percentage = undefined,
}) => {
  const { data, rules, dispatch }: IContext = useSale();

  const [editing, setEditing] = useState<{
    id: string;
    percentage?: string;
  } | null>(null);

  const { toast } = useToast();

  const participantRules = rules[contextProperty];

  const participants = data[contextProperty];

  const inputPercentageRef: RefObject<HTMLInputElement> = useRef(null);

  const updateParticipantPercentage = () => {
    if (editing === null || !percentage) return;

    const updatedParticipants = participants.map((participant) => {
      if (participant.id === editing.id) {
        return {
          ...participant,
          [percentage.field]: editing.percentage,
        };
      }
      return participant;
    });

    dispatch({
      type: SET,
      payload: { key: contextProperty, item: updatedParticipants },
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

  const addParticipantHandler = () => {};

  const undoDeleteHandler = () => {
    // using the power of closures
    dispatch({
      type: SET,
      payload: { key: contextProperty, item: participants },
    });
  };

  const removeParticipantHandler = (id: string) => {
    dispatch({
      type: DELETE,
      payload: { key: contextProperty, identifier: { value: id } },
    });

    const deletedParticipant = participants.find(
      (participant) => participant.id === id
    );

    toast({
      title: `Klienti: ${deletedParticipant.displayName} u fshi nga polica!`,
      description: "Klikoni 'Undo' nese ishte gabimisht.",
      action: (
        <ToastAction
          className="bg-esig text-white hover:bg-esig-fluorite"
          onClick={undoDeleteHandler}
          altText="Goto schedule to undo"
        >
          Undo
        </ToastAction>
      ),
    });
  };

  const viewParticipantDetailsHandler = (id: string) => {};

  const editPercentageHandler = (participant: any) => {
    setEditing({
      id: participant.id,
      percentage: participant[percentage?.field ?? ""] ?? 0,
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

  const haveColumns = !!percentage?.headerName;

  return (
    <Card className="w-full">
      <CardHeader className="px-4 pt-5 pb-0">
        <CardTitle className="mb-1">
          <div className="flex items-center justify-between">
            <div className="text-lg leading-none font-bold flex items-center">
              <Image
                src="/svg/users_group.svg"
                alt="users_group"
                width={"0"}
                height={"0"}
                style={{ width: 28, height: 28 }}
                priority
              />
              <span className="ml-3">{title}</span>
            </div>
            <div className="flex items-center gap-x-2">
              <Modal
                title="Modali i klienteve"
                description="Ketu mund te modikoni klientin e perzgjedhur."
                body={<CustomerModal />}
              >
                <Button
                  onClick={addParticipantHandler}
                  className="h-7 px-2 w-16"
                  size={"sm"}
                  icon={
                    <Image
                      src="/svg/add_plus.svg"
                      alt="add"
                      width={"0"}
                      height={"0"}
                      style={{ width: 12, height: 12 }}
                      priority
                    />
                  }
                >
                  <span className="text-sm">Add</span>
                </Button>
              </Modal>
            </div>
          </div>
        </CardTitle>
        <CardDescription className="text-sm">
          Number of clients must be from{" "}
          <span className="text-esig-error font-semibold">
            {participantRules.min}
          </span>{" "}
          to{" "}
          <span className="text-esig-success font-semibold">
            {participantRules.max}
          </span>{" "}
          !
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="flex flex-col relative w-full">
          <div className="sticky top-0 border left-0 bg-gray-50 rounded-t-md py-2  grid grid-cols-10">
            <div
              className={`${haveColumns ? "col-span-4" : "col-span-7"} pl-4`}
            >
              Name
            </div>
            {haveColumns ? (
              <div className="col-span-3 pl-6">{percentage.headerName}</div>
            ) : null}
            <div className="col-span-3 pl-4">Veprimet</div>
          </div>
          <ScrollArea className="h-48 rounded-b-md border border-t-0 flex flex-col">
            {participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="grid grid-cols-10 cursor-pointer group hover:bg-esig-surface-30"
                >
                  <div
                    className={`truncate mr-5 ${
                      haveColumns ? "col-span-5" : "col-span-7"
                    } pl-2 border-r relative flex items-center border-l-2 border-l-transparent group-hover:border-l-esig`}
                  >
                    <div className="my-1.5 text-sm flex items-center gap-x-1">
                      <span className={`w-3`}>{index + 1}.</span>{" "}
                      {participant.displayName}
                    </div>
                    {index === 0 ? (
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge className="w-9 h-4 my-1.5 ml-1.5">
                            <span className="text-[10px] mt-0.5">Lider</span>
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className="border border-black">
                          <p>Lider eshte gjithmone pjesemarresi i pare!</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : null}
                  </div>

                  {haveColumns ? (
                    <div className="col-span-2 px-2 border-r -ml-5">
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
                            className="flex items-center  gap-x-1"
                            onClick={() => editPercentageHandler(participant)}
                          >
                            <Image
                              className="cursor-pointer border-b-2 border-transparent hover:border-black"
                              src="/svg/edit.svg"
                              alt="edit"
                              width={"0"}
                              height={"0"}
                              style={{ width: 20, height: 20 }}
                              priority
                            />
                            <span>
                              {toCurrencyStandardFormatCurrency(
                                participant[percentage.field]
                              )}{" "}
                              %
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}

                  <div className="col-span-3 pl-2 flex items-center justify-center gap-1.5 my-1.5 pr-3">
                    <Modal
                      title="Modali i klienteve"
                      description="Ketu mund te modikoni klientin e perzgjedhur."
                      body={<CustomerModal />}
                    >
                      <Button
                        size={"sm"}
                        onClick={() =>
                          viewParticipantDetailsHandler(participant.id)
                        }
                        variant={"secondary"}
                        className="h-6 w-12 text-xs transition-all duration-300   hover:!bg-esig hover:!text-white group-hover:bg-white"
                      >
                        Details
                      </Button>
                    </Modal>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          className="cursor-pointer hover:scale-110 transition-all duration-300"
                          src="/svg/remove.svg"
                          alt="remove"
                          width={"0"}
                          height={"0"}
                          style={{ width: 16, height: 16 }}
                          priority
                          onClick={() =>
                            removeParticipantHandler(participant.id)
                          }
                        />
                      </TooltipTrigger>
                      <TooltipContent className="bg-red-400 text-white">
                        <p>Fshi klientin</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default Participants;
