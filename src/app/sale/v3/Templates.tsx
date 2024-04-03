import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Templates({ items, onChange }: any) {
  const [selectedMailingLists, setSelectedMailingLists] = useState( );


   return (
    <RadioGroup
      value={selectedMailingLists}
      onChange={(e) => {
        setSelectedMailingLists(e);
        onChange(e);
      }}
      className={"p-1"}
    >
      {/* <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
        Zgjidh paketen
      </RadioGroup.Label> */}

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {items.map((mailingList: any) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList}
            className={({ checked }) =>
              classNames(
                checked ? "border-esig ring-2 ring-esig" : "border-gray-300",
                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {mailingList.title}
                    </RadioGroup.Label>
                    {mailingList.description && (
                      <RadioGroup.Description
                        as="span"
                        className="mt-1 flex items-center text-sm text-gray-500"
                      >
                        {mailingList.description}
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
