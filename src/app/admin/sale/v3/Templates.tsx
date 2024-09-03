import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Templates({
  items,
  onChange,
  selected,
  withDesciption,
  noRing = false,
}: any) {
  const [selectedMailingLists, setSelectedMailingLists] = useState(selected);

  return (
    <RadioGroup
      value={selectedMailingLists}
      onChange={(e) => {
        setSelectedMailingLists(e);
        onChange?.(e);
      }}
      className={"p-1"}
    >
      <div
        className={`grid ${
          withDesciption ? "grid-cols-1" : "grid-cols-2"
        }  gap-y-4 md:gap-y-6 sm:grid-cols-3 gap-x-4`}
      >
        {items.map((mailingList: any) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList}
            className={({ checked }) =>
              classNames(
                checked
                  ? `border-esig ${noRing ? "" : "ring-1 sm:ring-2 ring-esig"} `
                  : "border-gray-300",
                "relative flex cursor-pointer rounded-md border bg-white p-3 md:p-4 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900 truncate w-full"
                    >
                      {mailingList.title}
                    </RadioGroup.Label>
                    {mailingList.description && withDesciption && (
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
                    "pointer-events-none absolute -inset-px rounded-md"
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
