"use client";

import { useFormContext } from "react-hook-form";
import { CustomerModel, PolicyParticipantPolicyUserRequest } from "../type";
import Checkbox from "../components/Checkbox";
import Input from "../components/Input";
import { ParticipantWithPercentage } from "./List";

const ExtraChargeFooter = ({}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerModel & PolicyParticipantPolicyUserRequest>();

  return (
    <div className="flex items-center  h-full pl-4 gap-4">
      <div className="list-item  text-esig font-semibold text-base  ">
        Tarife shtese{" "}
      </div>
      <div className="flex items-center gap-4">
        <Checkbox
          noErrorMessage
          value={"true"}
          id="true"
          type="radio"
          {...register("extraCharge")}
        >
          <>PO</>
        </Checkbox>
        <Checkbox
          noErrorMessage
          value={"false"}
          id="false"
          type="radio"
          {...register("extraCharge")}
        >
          <>JO</>
        </Checkbox>
      </div>
      {errors.extraCharge && (
        <span className="text-esig-error text-md font-semibold     ">
          <>...zgjidhni nje opsion!</>
        </span>
      )}
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
