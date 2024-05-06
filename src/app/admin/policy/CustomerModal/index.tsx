import Image from "next/image";
import Base from "../components/Fields_v2/Base";
import RadioGroup from "./RadioGroup";
import AgGrid from "@/components/ag/Ag-grid";
import type { ColDef } from "ag-grid-community";
import { ReactNode, useEffect, useState } from "react";
import CustomerDonut from "./CustomerDonut";
import { Button } from "@/components/ui/button";
import { ButtonGeri } from "./page";
import { DrawerClose } from "@/components/ui/drawer";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import Spinner from "./components/Spinner";
import { useFormContext } from "react-hook-form";
import { CustomerModel } from "@/types";
import { z } from "zod";

interface IProps {
    id: string;
    footer: ReactNode;
};

export const formSchemaCustomer = z.object({
    taxNumber: z.string().min(1, "NUID eshte i detyrueshem!"),
    displayName:z.string().min(1, "Emri eshte i detyrueshem!"),
    contactType:z.string().min(1, "Lloji i kontaktit eshte i detyrueshem!"),  
});
  

const CustomerModal: React.FC<IProps> = ({
    id,
    footer,
}) => {
    const { register, setValue } = useFormContext<CustomerModel>();

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
               
            </div>

            <div className="col-span-12 md:col-span-8 md:border-l-2 border-dashed pl-4">
                {values?.displayName ? (
                    <div className=" flex items-center mb-4  h-8">
                        <span className="text-lg flex items-center ">
                            {" "}
                            Te dhenat e klientit:{" "}
                            <div className="italic pl-2 truncate max-w-40">
                                {values?.displayName}
                            </div>
                        </span>

                        <ButtonGeri className="text-esig hover:bg-sky-50">
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
                        </ButtonGeri>
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
                    <Base
                        label="Nipt i klientit"
                        name="serial"
                        value={values?.taxNumber}
                    />
                    <Base
                        label="Emri i plote"
                        name="serial"
                        value={values?.displayName}
                    />
                    <Base
                        label="Lloji i kontaktit"
                        name="serial"
                        value={values?.contactType}
                    />
                    <Base
                        label="Numri i telefonit"
                        name="serial"
                        value={values?.phoneNumber}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="grid col-span-2 md:col-span-1 grid-cols-2 md:grid-cols-1 gap-4">
                        <Base label="Email" name="serial" value={values?.email} />
                        <Base label="Gjinia" name="serial" value={values?.gender} />
                        <Base
                            label="Shtetesia"
                            name="serial"
                            value={values?.isLocal === true ? "Shqiptar" : "I huaj"}
                        />
                        <Base label="Atesia" name="serial" value={values?.fathersName} />
                        <Base label="Ditelindja" name="serial" value={values?.birthday} />
                        <Base label="Tjeter" name="serial" value={""} />
                    </div>
                    <div className="hidden md:block h-72">
                        <CustomerDonut />
                    </div>
                </div>
            </div>

            <div className="col-span-12  border-t-2 border-dashed">
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pt-4">
                    <div className="flex items-center gap-4 w-full">
                        {throwWarning ? (
                            <>
                                <Image
                                    className="cursor-pointer"
                                    src="/svg/question.svg"
                                    alt="edit"
                                    width={"0"}
                                    height={"0"}
                                    style={{ width: 30, height: 20 }}
                                    priority
                                />
                            </>
                        ) : null}
                        {footer}
                        {throwWarning && (
                            <span className="text-esig-error w-full text-sm">Plotesoni konfigurimin per pjesemarresin!</span>
                        )}
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <DrawerClose asChild>
                            <Button
                                className="w-max sm:w-full"
                                variant="outline"
                                onClick={() => {
                                    setRowData([]);
                                    setValues(null);
                                    setSeachedName(undefined);
                                }}
                            >
                                Anullo veprimin
                            </Button>
                        </DrawerClose>
                        <div
                            onClick={() => {
                                if (throwWarning === false) {
                                    setThrowWarning(true);
                                    return;
                                }
                                onSave(values);
                            }}
                            asChild
                        >
                            <Button variant="default" className="w-max sm:w-full">
                                Ruaj dhe apliko
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerModal;
