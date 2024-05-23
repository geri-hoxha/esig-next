"use client";

import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import _request from "@/request";
import { useFormContext } from "react-hook-form";
import { ZodRawShape, z } from "zod";
import Table from "./Table";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import CustomerDonut from "../../sale/v3/CustomerDonut";
import { CustomerModel } from "../type";
import Button from "../components/Button";
import { DrawerClose } from "@/components/ui/drawer";
import Select, { IOptions } from "../components/Select";
import { token } from "@/components/esig/Navbar/Currencies";
import useOrganizationEnums from "./useOrganizationEnums";

interface IProps {
  id: string;
  children?: ReactNode;
}

export const getFormSchemaCustomer = (argSchema: ZodRawShape) => {
  return z.object({
    taxNumber: z.string().min(1, "NUID eshte i detyrueshem!"),
    displayName: z.string().min(1, "Emri eshte i detyrueshem!"),
    contactType: z.string().min(1, "Lloji i kontaktit eshte i detyrueshem!"),
    ...argSchema,
  });
};
const CustomerModal: React.FC<IProps> = ({ id }) => {
  const { watch, register, setValue } = useFormContext<CustomerModel>();

  const [contactTypeOptions, setContactTypeOptions] = useState<IOptions[]>([]);

  const { optionsList, loading } = useOrganizationEnums();

  useEffect(() => {
    getOptions();
  }, []);

  const getOptions = async () => {
    const data: IOptions[] = await _request("/enum/ContactType", token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setContactTypeOptions(data);

    setValue('contactType', data.at(0)?.value ?? '' )
  };

  const customerId = watch("id");

  const contactType = watch("contactType");

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

            <Button variant="edit">Shiko te gjitha</Button>
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
          <Input {...register("phoneNumber")} label="Numri i telefonit" />
          <Input {...register("displayName")} label="Emri i plote" />
          <Input {...register("email")} label="Email" />
          <Select
            {...register("contactType")}
            label="Lloji i kontaktit"
            options={contactTypeOptions}
          />
          <Checkbox {...register("isLocal")}>
            <>{watch("isLocal") ? "Shqiptar" : "I huaj"}</>
          </Checkbox>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="grid col-span-2 md:col-span-1 grid-cols-2 md:grid-cols-1 gap-4 h-max">
            {contactType === "Person" ? (
              <>
                <Input {...register("genderType")} label="Gjinia" />
                <Input {...register("fathersName")} label="Atesia" />
                <Input
                  {...register("birthday")}
                  label="Ditelindja"
                  type="date"
                />
              </>
            ) : contactType === "Organization" ? (
              <>
                <Input
                  {...register("businessDescription")}
                  label="Përshkrimi i biznesit"
                />
                <Input {...register("administrator")} label="Administratori" />

                <hr className="my-3" />
                <div className="grid grid-cols-2 gap-4 ">
                  <Select
                    {...register("organizationLegalFormType")}
                    options={optionsList.LegalFormType}
                    label="Lloji i formës ligjore"
                  />
                  <Select
                    {...register("organizationBusinessSizeType")}
                    options={optionsList.BusinessSizeType}
                    label="Lloji i madhësisë së biznesit"
                  />

                  <Select
                    {...register("organizationOwnershipType")}
                    options={optionsList.OwnershipType}
                    label="Lloji i pronarit"
                  />
                  <Select
                    {...register("organizationSectorType")}
                    options={optionsList.SectorType}
                    label="Lloji i sektorit"
                  />
                </div>

                <Checkbox {...register("isActive")}>
                  <>{watch("isActive") ? "Aktiv" : "Jo-Aktiv"}</>
                </Checkbox>
              </>
            ) : null}
          </div>
          <div className="hidden md:block h-72">
            <CustomerDonut />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
