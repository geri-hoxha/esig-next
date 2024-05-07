'use client';

import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import _request from "@/request";
import { useFormContext } from "react-hook-form";
import { ZodRawShape, z } from "zod";
import Table from "./Table";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import CustomerDonut from "../../sale/v3/CustomerDonut";
import {
  CustomerModel,
} from "../type";

interface IProps {
  id: string;
  children: ReactNode;
}

export const getFormSchemaCustomer = (argSchema: ZodRawShape) => {
  return z.object({
    taxNumber: z.string().min(1, "NUID eshte i detyrueshem!"),
    displayName: z.string().min(1, "Emri eshte i detyrueshem!"),
    contactType: z.string().min(1, "Lloji i kontaktit eshte i detyrueshem!"),
    ...argSchema,
  });
};
const CustomerModal: React.FC<IProps> = ({ id, children }) => {
  console.log(useFormContext)
  const { watch, register } = useFormContext<CustomerModel>();

  console.log(watch)
  const customerId = watch("id");

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-4">
        <Table />
      </div>

      <div className="col-span-12 md:col-span-8 md:border-l-2 border-dashed pl-4">
        {!!customerId ? (
          <div className="flex items-center mb-4 h-8">
            <span className="text-lg flex items-center ">
              {" "}
              Te dhenat e klientit:{" "}
              <div className="italic pl-2 truncate max-w-40">
                {watch("displayName")}
              </div>
            </span>

            <Button className="text-esig hover:bg-sky-50">
              <div className="flex items-center gap-x-1">
                <Image
                  className="cursor-pointer"
                  src="/svg/edit.svg"
                  alt="edit"
                  width={"0"}
                  height={"0"}
                  style={{ width: 20, height: 20 }}
                  priority
                />
                <span>Shiko te gjitha</span>
              </div>
            </Button>
          </div>
        ) : (
          <div className="mb-4 h-8 text-sm text-gray-600 flex items-center gap-2">
            <Image
              src="/svg/info.svg"
              alt="edit"
              width={"0"}
              height={"0"}
              style={{ width: 17, height: 17 }}
              priority
            />
            <span>(Zgjidh klientin ne tabelen ne te majte)</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Input {...register("taxNumber")} label="Nipt i klientit" />
          <Input {...register("displayName")} label="Emri i plote" />
          <Input {...register("contactType")} label="Lloji i kontaktit" />
          <Input {...register("phoneNumber")} label="Numri i telefonit" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid col-span-2 md:col-span-1 grid-cols-2 md:grid-cols-1 gap-4">
            <Input {...register("email")} label="Email" />
            <Input {...register("genderType")} label="Gjinia" />
            <Input {...register("contactType")} label="Lloji i kontaktit" />
            <Input {...register("phoneNumber")} label="Numri i telefonit" />
            <Input {...register("fathersName")} label="Atesia" />
            <Input {...register("birthday")} label="Ditelindja" type="date" />

            <Checkbox {...register("isLocal")}>
              <>{watch("isLocal") ? "Shqiptar" : "I huaj"}</>
            </Checkbox>
          </div>
          <div className="hidden md:block h-72">
            <CustomerDonut />
          </div>
        </div>
      </div>

      <div className="col-span-12  border-t-2 border-dashed">{children}</div>
    </div>
  );
};

export default CustomerModal;
