import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Image from "next/image";

const mailingLists = [
  {
    id: 1,
    title: "Paketa Full",
    description: "Paketa standarde e garancise se ofertes",
  },
  {
    id: 2,
    title: "Paketa Variant 20%",
    description: "Paketa standarde e garancise se ofertes",
  },
  {
    id: 3,
    title: "Paketa Variant 40%",
    description: "Paketa standarde e garancise se ofertes",
  },
  {
    id: 4,
    title: "Variant 2",
    description: "Paketa standarde e garancise se ofertes",
  },
  {
    id: 5,
    title: "Variant 3",
    description: "Paketa standarde e garancise se ofertes",
  },
  {
    id: 6,
    title: "Variant 4",
    description: "Paketa standarde e garancise se ofertes",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Templates() {
  const [selectedMailingLists, setSelectedMailingLists] = useState(
    mailingLists[0]
  );

  return (
    <RadioGroup value={selectedMailingLists} onChange={setSelectedMailingLists} className={'p-1'}>
      {/* <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
        Zgjidh paketen
      </RadioGroup.Label> */}

      <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
        {mailingLists.map((mailingList) => (
          <RadioGroup.Option
            key={mailingList.id}
            value={mailingList}
            className={({ active }) =>
              classNames(
                active
                  ? "border-esig ring-2 ring-esig"
                  : "border-gray-300",
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
                    <RadioGroup.Description
                      as="span"
                      className="mt-1 flex items-center text-sm text-gray-500"
                    >
                      {mailingList.description}
                    </RadioGroup.Description>
                  </span>
                </span>
                <Image
                  src="/svg/check.svg"
                  className={`${checked ? '' : 'invisible pointer-events-none'}`}
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-esig" : "border-transparent",
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
