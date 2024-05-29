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
          id="true"
          type="radio"
          value="true"
          {...register("extraCharge")}
        >
          <>PO</>
        </Checkbox>
        <Checkbox
          noErrorMessage
          id="false"
          type="radio"
          value="false"
          {...register("extraCharge")}
        >
          <>JO</>
        </Checkbox>
      </div>
      {errors.extraCharge && (
        <span className="text-esig-error text-sm font-semibold animate-bounce">
          <>...zgjidhni nje opsion!</>
        </span>
      )}
    </div>
  );
};

const PercentageFooter: React.FC<{
  percentageKey: "ownershipPercentage" | "invoiceSplitPercentage";
}> = ({ percentageKey }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerModel & ParticipantWithPercentage>();

  return (
    <div className="flex items-center  h-full pl-4 gap-4">
      <div className="flex items-center grow shrink-0 gap-4">
        <Input
          noErrorMessage
          label="Perqindja"
          {...register(percentageKey)}
          suffix={"%"}
        />
        {errors[percentageKey] && (
          <span className="text-esig-error text-sm font-semibold animate-bounce  grow shrink-0">
            {errors[percentageKey]?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export { ExtraChargeFooter, PercentageFooter };
