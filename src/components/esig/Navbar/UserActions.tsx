import { Button } from "@/components/ui/button";
import { LockKeyhole, LogOut, UserCog } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function UserActions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          icon={<UserCog size={20} />}
          className="w-full md:w-40 rounded-lg bg-esig-fluorite"
        >
          <span className="text-sm md:text-base">User settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-min	 space-y-2 mt-4">
        <Button icon={<LockKeyhole size={15} />} className="h-7" size={"sm"}>
          <span className="text-sm md:text-base">Ndrysho fjalekalimin</span>
        </Button>
        <Button
          icon={<LogOut size={15} />}
          size={"sm"}
          className="w-full h-7 text-sm md:text-base"
          variant={"destructive"}
        >
          Log out
        </Button>
        <Separator className="my-2" />
        <div className="flex items-center w-full gap-x-3">
          <Button
            icon={
              <Image
                src="/al.svg"
                alt="al"
                width={30}
                height={16}
                style={{ width: 30, height: 16 }}
                priority
              />
            }
            variant={"outline"}
            className="h-7 w-17"
            size={"sm"}
          >
            <span className="text-xs">ALL</span>
          </Button>
          <Button
            icon={
              <Image
                src="/en.svg"
                alt="en"
                width={30}
                height={16}
                style={{ width: 30, height: 16 }}
                priority
              />
            }
            variant={"outline"}
            className="h-7 w-17"
            size={"sm"}
          >
            <span className="text-xs">EN</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
