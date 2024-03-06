"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
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

interface IProps {
  title: string;
  contextProperty: keyof ISaleContext; // key on context
  headerName?: string; // extra property
  children?: (participant: any) => ReactNode; // custom render of the column
  haveLeader?: boolean;
}

const Participants: React.FC<IProps> = ({
  title,
  contextProperty,
  headerName,
  children,
  haveLeader = false,
}) => {
  const { data, rules, dispatch }: IContext = useSale();

  const { toast } = useToast();

  const participantRules = rules[contextProperty];

  const participants = data[contextProperty];

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

  if (participants.length === 0) {
    const theOnlyParticipant = participants.at(0);

    return (
      <Card className="w-full bg-white h-full">
        <CardHeader className="px-4 pt-5 pb-0">
          <CardTitle className="mb-1 flex items-center justify-between text-lg leading-none font-bold">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-3">
          <div
            className={`flex items-center cursor-pointer group rounded-lg h-12  ${
              !!theOnlyParticipant
                ? "border pl-4"
                : "border border-dashed bg-white border-esig"
            }`}
          >
            {theOnlyParticipant ? (
              <>
                <div className={`truncate flex items-center border-r h-full`}>
                  <div className="font-bold text-lg flex items-center pr-3">
                    {theOnlyParticipant.displayName}
                  </div>
                  {haveLeader ? (
                    <Badge className="w-9 h-4">
                      <span className="text-[10px]">Lider</span>
                    </Badge>
                  ) : null}
                </div>
                <div className="ml-3 flex items-center mt-1">
                  <span className="mr-5">{headerName}:</span>
                  <div className="-mt-2">{children?.(theOnlyParticipant)}</div>
                </div>
                <div
                  className="h-full ml-auto px-3 flex items-center mt-1"
                  onClick={() =>
                    removeParticipantHandler(theOnlyParticipant.id)
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="w-6 h-6 stroke-esig-error"
                  >
                    <circle
                      cx="49.9"
                      cy="48.9"
                      r="45.8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="10"
                    />
                    <path
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      strokeWidth="10"
                      d="M74.9 48.9h-50"
                    />
                  </svg>
                </div>
                <div className=" bg-esig text-white h-full rounded-r-md">
                  <Modal
                    title="Modali i klienteve"
                    description="Ketu mund te modikoni klientin e perzgjedhur."
                    body={<CustomerModal />}
                  >
                    <div
                      onClick={() =>
                        viewParticipantDetailsHandler(theOnlyParticipant.id)
                      }
                      className="  mt-1.5 px-2 text-5xl leading-3"
                    >
                      ...
                    </div>
                  </Modal>
                </div>
              </>
            ) : (
              <Modal
                title="Modali i klienteve"
                description="Ketu mund te modikoni klientin e perzgjedhur."
                body={<CustomerModal />}
              >
                <Button
                  className="border-none bg-white hover:bg-white  group-hover:bg-esig-surface-30 h-full"
                  onClick={addParticipantHandler}
                >
                  <div className="flex items-center text-esig  gap-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 100 100"
                      className="h-5 w-5 stroke-esig"
                    >
                      <circle
                        cx="50.6"
                        cy="50.7"
                        r="45.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="10"
                      />
                      <path
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeMiterlimit="10"
                        strokeWidth="10"
                        d="M50.6 25.9v49.6M75.3 50.7H25.8"
                      />
                    </svg>
                    <span className="mt-1 text-base">Shto pjesemarres</span>
                  </div>
                </Button>
              </Modal>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="px-4 pt-5 pb-0">
        <CardTitle className="mb-1">
          <div className="flex items-center justify-between">
            <div className="text-lg leading-none font-bold flex items-center">
              <Image
                src="/svg/user.svg"
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
          {/* <div className="sticky top-0 border left-0 bg-gray-50 rounded-t-md py-2  grid grid-cols-10">
            <div className={`${headerName ? "col-span-4" : "col-span-7"} pl-4`}>
              Name
            </div>
            {headerName ? (
              <div className="col-span-3 pl-6">{headerName}</div>
            ) : null}
            <div className="col-span-3 pl-4">Veprimet</div>
          </div> */}
          <ScrollArea className="h-28 flex flex-col">
            {participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="grid grid-cols-10 cursor-pointer group hover:bg-esig-surface-30"
                >
                  <div
                    className={`mr-5 ${
                      headerName ? "col-span-4" : "col-span-7"
                    } pl-2 relative flex items-center border-l-2 border-l-transparent group-hover:border-l-esig`}
                  >
                    <div className="my-1.5 text-sm flex items-center gap-x-1 ">
                      <span className={`w-3`}>{index + 1}.</span>{" "}
                      <span className="truncate w-20">{participant.displayName}</span>
                    </div>
                    {index === 0 && haveLeader ? (
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
                  {children?.(participant)}
                  <div className="col-span-3 pl-2 flex items-center justify-center gap-1.5 my-1.5">
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
                        variant={"outline"}
                        className="h-6 w-13 border border-dashed border-gray-600 text-xs transition-all duration-300   hover:!bg-esig hover:!text-white group-hover:bg-white"
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
