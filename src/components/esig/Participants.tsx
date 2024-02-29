'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IParticipant {
  displayName: string;
  id: string;
}

interface IProps {
  title: string;
  participants: IParticipant[];
  customRenderer?: (participants: IParticipant) => ReactNode;
}

const Participants: React.FC<IProps> = ({
  title,
  participants,
  customRenderer,
}) => {
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
          Add / Remove policy users for this policy.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col">
          <ScrollArea className="h-[165px] rounded-md border p-4 flex flex-col">
            {participants.map((participant, index) => {
              return (
                <div
                  key={participant.id}
                  className="flex items-center gap-x-3 "
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
        </div>
      </CardContent>
    </Card>
  );
};

export default Participants;
