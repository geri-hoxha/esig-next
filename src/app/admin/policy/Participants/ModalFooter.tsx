"use client";

import { useFormContext } from "react-hook-form";
import { CustomerModel, PolicyParticipantPolicyUserRequest } from "../type";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { ParticipantWithPercentage } from "./List";
import { useCoreContext } from "../context";

const ExtraChargeFooter = ({}) => {
  const { data } = useCoreContext();
  const { register } = useFormContext<
    CustomerModel & PolicyParticipantPolicyUserRequest
  >();

  return (
    <div className="flex items-center  h-full pl-4">
      <div className="list-item mr-4 text-esig font-semibold text-base  ">
        Tarife shtese{" "}
       </div>
      <div className="flex items-center gap-4">
        <Checkbox id="yes" type="radio" {...register("extraCharge")}>
          <>PO</>
        </Checkbox>
        <Checkbox id="no" type="radio" {...register("extraCharge")}>
          <>JO</>
        </Checkbox>
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
