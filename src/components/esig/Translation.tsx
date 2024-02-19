import { Globe2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Separator } from "../ui/separator";

const Translation: React.FC = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Globe2 />
        </PopoverTrigger>
        <PopoverContent className="w-36 mt-4">
          <RadioGroup defaultValue="ALL">
            <div className="flex items-center space-x-2">
              <RadioGroupItem className="h66-" value="ALL" id="ALL" />
              <Label
                htmlFor="ALL"
                className="flex items-center cursor-pointer gap-x-2"
              >
                Shqip{" "}
                <Image
                  src="/al.svg"
                  alt="al"
                  width={30}
                  height={16}
                  style={{ width: 30, height: 16 }}
                  priority
                />
              </Label>
            </div>
            <Separator className="my-1.5"/>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="EN" id="EN" />
              <Label
                htmlFor="EN"
                className="flex items-center cursor-pointer gap-x-2"
              >
                English
                <Image
                  src="/en.svg"
                  alt="en"
                  width={30}
                  height={16}
                  style={{ width: 30, height: 16 }}
                  priority
                />
              </Label>
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Translation;
