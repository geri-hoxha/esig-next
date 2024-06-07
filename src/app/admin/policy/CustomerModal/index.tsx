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
import { Address, CustomerModel } from "../type";
import Button from "../components/Button";
import Select, { IOptions } from "../components/Select";
import { token } from "@/components/esig/Navbar/Currencies";
import useOrganizationEnums from "./useOrganizationEnums";
import dynamic from "next/dynamic";
import { plainToClass } from "class-transformer";
import ComputeCustomerCommand_Request_Model from "./dto";

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false,
});
export const getFormSchemaCustomer = (argSchema: ZodRawShape) => {
  return z.object({
    taxNumber: z.string().min(1, "NUID eshte i detyrueshem!"),
    displayName: z.string().min(1, "Emri eshte i detyrueshem!"),
    contactType: z.string().min(1, "Lloji i kontaktit eshte i detyrueshem!"),
    ...argSchema,
  });
};

const CustomerModal: React.FC<{ entityId: string }> = ({ entityId }) => {
  const {
    watch,
    register,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { isSubmitted, errors },
  } = useFormContext<CustomerModel>();

  const [contactTypeOptions, setContactTypeOptions] = useState<IOptions[]>([]);

  const { optionsList, loading } = useOrganizationEnums();

  const [showMap, setShowMap] = useState<boolean>(false);

  const [address, setAddress] = useState<{
    value: string;
    model: Address | null;
  }>({
    value: "",
    model: null,
  });

  useEffect(() => {
    getOptions();

    setCustomerData();

    return () => {
      updateCustomer();
    };
  }, []);

  const updateCustomer = async () => {
    const valid = await trigger(); // triggers validation for all fields

    if (!valid) return;

    const values: CustomerModel = watch();

    const response = await _request(`/customer/${values.id}`, token, {
      method: "POST",
      body: JSON.stringify(
        plainToClass(ComputeCustomerCommand_Request_Model, values)
      ),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
  };

  const setCustomerData = async () => {
    if (!entityId) return;

    const response = await _request(`/customer/${entityId}`, token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { address } = response.data as CustomerModel;

    const { city, country, postalCode, streetAddress } = address;

    let addressString = "";

    !!city ? (addressString += `${city} `) : "";
    !!country ? (addressString += `${country} `) : "";
    !!postalCode ? (addressString += `${postalCode} `) : "";
    !!streetAddress ? (addressString += `${streetAddress} `) : "";

    setAddress({
      value: addressString,
      model: address,
    });

    reset(response.data);
  };

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

    setValue("contactType", data.at(0)?.value ?? "");
  };

  const customerId = watch("id");

  const contactType = watch("contactType");

  console.log(watch());

  if (showMap) {
    return (
      <div className="relative" style={{ height: 508 }}>
        <div
          className="flex items-end ml-auto gap-x-2 absolute bg-white top-full w-full right-0 z-20 "
          style={{ height: 48 }}
        >
          <Button
            variant="danger"
            className="border border-dashed border-esig-error py-1 ml-auto"
            onClick={() => {
              setShowMap(false);
              setAddress({
                value: "",
                model: null,
              });
            }}
          >
            Fshije adresen
          </Button>
          <Button
            iconSrc="/svg/check_no_border.svg"
            className="border border-dashed border-esig"
            variant="edit"
            onClick={() => {
              if (address.model !== null) {
                setValue("address", address.model);
              }
              setShowMap(false);
            }}
          >
            Ruaj adresen
          </Button>
        </div>
        <div className="z-10  bg-white relative flex flex-col h-full">
          <MapWithNoSSR
            position={{
              latitude: address.model?.latitude || 0,
              longitude: address.model?.longitude || 0,
            }}
            setPosition={(value, model) => {
              setAddress({
                value,
                model: {
                  ...address.model,
                  country: model?.country || "AL",
                  ...model,
                },
              });
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {!!entityId ? null : (
        <div className="col-span-12 md:col-span-4">
          <Table />
        </div>
      )}
      <div
        className={`col-span-12  md:border-l-2 border-dashed pl-4 ${
          !!entityId ? "col-span-12" : "md:col-span-8"
        }`}
      >
        {!!customerId ? (
          <div className="flex items-center mb-4 h-8">
            <span className="text-lg flex items-center truncate">
              {" "}
              <div className="italic pl-2 truncate ">
                {watch("displayName")}
              </div>
            </span>

            <div className="flex grow shrink-0">
              <Button variant="edit">Shiko te gjitha</Button>
            </div>
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

            <Input
              value={address.value}
              label="Adresa"
              suffix={
                <Button
                  variant="edit"
                  onClick={() => {
                    setShowMap(true);
                  }}
                >
                  Ndrysho
                </Button>
              }
              onChange={() => {}}
            />
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
