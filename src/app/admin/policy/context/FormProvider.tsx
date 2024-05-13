"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { IssueRequest } from "../type";

const formSchema = z.object({
  serial: z.string().min(1, "Seriali eshte i detyrueshem!"),
  currencyType: z.string().min(1, "Monedha eshte i detyrueshem!"),
  paymentType: z.string().min(1, "Metoda e pageses eshte e detyrueshme!"),
  startDateUtc: z
    .string()
    .datetime()
    .min(1, "Data e fillimit eshte e detyrueshme!"),
  endDateUtc: z
    .string()
    .datetime()
    .min(1, "Data e mbarimit eshte e detyrueshme!"),
  issuedDateUtc: z
    .string()
    .datetime()
    .min(1, "Data e lëshimit eshte e detyrueshme!"),
  retroactiveDateUtc: z
    .string()
    .datetime()
    .min(1, "Data e retrospektive eshte e detyrueshme!"),
  distributionChannel: z
    .string()
    .min(1, "Kanali i shpërndarjes eshte i detyrueshem!"),
});

export type IFormContext = Pick<
  IssueRequest,
  | "serial"
  | "currencyType"
  | "paymentType"
  | "startDateUtc"
  | "endDateUtc"
  | "issueDateUtc"
  | "retroactiveDateUtc"
  | "distributionChannel"
>;

export default function _FormProvider({ children }: { children: ReactNode }) {
  const form = useForm<IFormContext>({
    defaultValues: {
      //test
      serial: "22342343",
      currencyType: "EUR",
      paymentType: "CASH",
      startDateUtc: dayjs().add(20, "days").format("YYYY-MM-DD"),
      endDateUtc: dayjs().subtract(1, "months").format("YYYY-MM-DD"),
      issueDateUtc: null,
      retroactiveDateUtc: dayjs().format("YYYY-MM-DD"),
      distributionChannel: "",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
}
