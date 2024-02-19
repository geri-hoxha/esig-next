import { Button } from "@/components/ui/button";
import { LockKeyhole, LogOut, UserCog } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function UserActions() {
  return (
    <Popover>
      <PopoverTrigger>
      <UserCog />
      </PopoverTrigger>
      <PopoverContent className="w-56 space-y-2 mt-4">
        <Button icon={<LockKeyhole size={18} />} size={"sm"}>
          Ndrysho fjalekalimin
        </Button>
        <Button
          icon={<LogOut size={18} />}
          size={"sm"}
          className="w-full"
          variant={"destructive"}
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
