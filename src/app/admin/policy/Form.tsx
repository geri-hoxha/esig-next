"use client";

import { useFormContext } from "react-hook-form";
import Input from "./components/Input";
import { IFormContext } from "./context/FormProvider";
import Section from "./Section";
import Select from "./components/Select";
import MaskedInput from "react-text-mask";

const Form = () => {
  const { register } = useFormContext<IFormContext>();

  return (
    <>
      <Section
        items={[
          {
            title: "Te pergjithshme",
            children: (
              <>
                <div id="tutorial_step1">
                  <Input {...register("serial")} label="Serial" />
                </div>
                <Select
                  {...register("currencyType")}
                  label="Monedha"
                  options={[
                    {
                      key: "EUR",
                      value: "EUR",
                    },
                    {
                      key: "USD",
                      value: "USD",
                    },
                    {
                      key: "LEK",
                      value: "LEK",
                    },
                  ]}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  }
                />
                <Select
                  {...register("paymentType")}
                  label="Lloji i pageses"
                  options={[
                    {
                      key: "CASH",
                      value: "CASH",
                    },
                    {
                      key: "UXH",
                      value: "UXH",
                    },
                  ]}
                />
              </>
            ),
          },
          {
            title: "Data",
            children: (
              <>
                <Input
                  {...register("startDateUtc")}
                  label="Data e fillimit"
                  type="date"
                />
                <Input
                  {...register("endDateUtc")}
                  label="Data e perfundimit"
                  type="date"
                />
                <Input
                  {...register("issueDateUtc")}
                  label="Data e leshimit"
                  type="date"
                />
                <Input
                  {...register("retroactiveDateUtc")}
                  label="Data e retroaktive"
                  type="date"
                />

                <MaskedInput
                  mask={[
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                  ]}
                  className="form-control"
                  placeholder="DD/MM/YYYY"
                  guide={false}
                  showMask={true}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
};

export default Form;
