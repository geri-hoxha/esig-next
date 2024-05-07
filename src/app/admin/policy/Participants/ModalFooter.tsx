'use client'

import { useFormContext } from "react-hook-form";
import { CustomerModel, PolicyParticipantPolicyUserRequest } from "../type";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { ParticipantWithPercentage } from "./List";

const ExtraChargeFooter = ({}) => {
  const { register } = useFormContext<
    CustomerModel & PolicyParticipantPolicyUserRequest
  >();

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center grow shrink-0">
        <div className="mr-2 text-gray-700 font-semibold text-sm ">
          Tarife shtese:
        </div>
        <div className="">
          <Checkbox id="yes" type="radio" {...register("extraCharge")}>
            <>PO</>
          </Checkbox>
          <Checkbox id="no" type="radio" {...register("extraCharge")}>
            <>JO</>
          </Checkbox>
        </div>
      </div>
    </div>
  );
};

const PercentageFooter: React.FC<{
  percentageKey: "ownershipPercentage" | "invoiceSplitPercentage";
}> = ({ percentageKey }) => {
  const { register } = useFormContext<
    CustomerModel & ParticipantWithPercentage
  >();

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center grow shrink-0">
        <Input label="Perqindja" {...register(percentageKey)} suffix={"%"} />
      </div>
    </div>
  );
};

export { ExtraChargeFooter, PercentageFooter };
