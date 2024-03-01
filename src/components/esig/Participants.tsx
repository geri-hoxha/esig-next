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
import { Separator } from "../ui/separator";

interface IParticipant {
  displayName: string;
  id: string;
}

interface IProps {
  title: string;
  contextProperty: keyof ISaleContext;
  customRenderer?: (participants: IParticipant) => ReactNode;
}

const Participants: React.FC<IProps> = ({
  title,
  contextProperty,
  customRenderer,
}) => {
  const { data }: IContext = useSale();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="mb-2">
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
              <Button
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
              <Button
                size={"sm"}
                className="h-7 px-2 w-20"
                icon={
                  <Image
                    src="/svg/remove.svg"
                    alt="remove"
                    width={"0"}
                    height={"0"}
                    style={{ width: 12, height: 12 }}
                    priority
                  />
                }
                variant={"destructive"}
              >
                <span className="text-sm">Delete</span>
              </Button>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Number of clients must be from{" "}
          <span className="text-esig-error font-semibold">1</span> to{" "}
          <span className="text-esig-success font-semibold">4</span> !
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col relative">
          <div className="sticky top-0 border left-0 bg-gray-50 rounded-t-md py-2  grid grid-cols-10">
            <div className="col-span-4 pl-4">Name</div>
            <div className="col-span-3 pl-4">Perqindja</div>
            <div className="col-span-3 pl-4">Veprimet</div>
          </div>
          <ScrollArea className="h-48 rounded-b-md border border-t-0 flex flex-col">
            {data[contextProperty].map((participant, index) => {
              return (
                <div key={participant.id} className="grid grid-cols-10 cursor-pointer">
                  <div className="truncate col-span-4 pl-4 border-r">
                    <div className="mt-3">{participant.displayName}</div>
                  </div>
                  <div className="col-span-3 pl-4 border-r">
                    <div className="mt-3">12.42%</div>
                  </div>
                  <div className="col-span-3 pl-4 flex items-center justify-center gap-3 mt-3 pr-4">
                    <Button size={"sm"} className="h-6 w-15">
                      <div className="mt-1">Details</div>
                    </Button>
                    <Image
                      className="cursor-pointer"
                      src="/svg/remove.svg"
                      alt="remove"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 25 }}
                      priority
                    />
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </div>

        {/* <div className="flex flex-col">
          <ScrollArea className="h-48 rounded-md border py-2  flex flex-col">
            <div className="flex items-center border-b p-1">Name</div>
            {data[contextProperty].map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center gap-x-3 px-4"
                >
                  <span className="flex h-1.5 w-1.5   mb-3 rounded-full bg-esig-fluorite" />
                  <div className="w-28 truncate pb-3 border-r border-gray-300">
                    {participant.displayName}
                  </div>
                  <span className=" pb-3">{customRenderer?.(participant)}</span>
                </div>
              );
            })}
          </ScrollArea>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default Participants;
