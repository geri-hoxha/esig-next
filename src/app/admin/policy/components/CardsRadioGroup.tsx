import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export interface IItemProps {
  id: string;
  name: string;
  description: string;
}

interface IProps {
  items: IItemProps[];
  selected: string;
  onChange: (id: string) => void;
}

export default function CardsRadioGroup({ items, onChange, selected }: IProps) {
  return (
    <RadioGroup value={selected} onChange={onChange}>
      <div className={`grid grid-cols-2  sm:grid-cols-3 gap-4`}>
        {items.map((item) => (
          <RadioGroup.Option
            key={item.id}
            value={item.id}
            className={({ checked }) =>
              classNames(
                checked ? `border-esig ring-esig ring-2 ` : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border bg-white p-3 md:p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900 truncate w-32 md:w-36"
                    >
                      {item.name}
                    </RadioGroup.Label>
                    {item.description && (
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {item.description}
                      </RadioGroup.Description>
                    )}
                  </span>
                </span>
                <Image
                  src="/svg/check.svg"
                  className={`${
                    checked ? "" : "invisible pointer-events-none"
                  }`}
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span
                  className={classNames(
                    active ? " " : "",
                    checked ? "border-esig border-2" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
