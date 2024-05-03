"use client";

import { Separator } from "@/components/ui/separator";
import CurrencyType from "./components/Fields/CurrenyType";
import DistributionChannel from "./components/Fields/DistributionChannel";
import EndDate from "./components/Fields/EndDate";
import IssueDate from "./components/Fields/IssuedDate";
import PaymentType from "./components/Fields/PaymentType";
import Serial from "./components/Fields/Serial";
import StartDate from "./components/Fields/StartDate";
import { SaleProvider } from "@/context/SaleContext";
import TemplateRenderer from "./components/Participants/TemplateRenderer";

export default function Sale() {
  return (
    <SaleProvider>
      <div className="grid grid-cols-4 gap-6 mt-6">
        <Serial />
        <StartDate />
        <EndDate />
        <IssueDate />
        <DistributionChannel />
        <PaymentType />
        <CurrencyType />
      </div>

       <Separator className="my-6" />
      <TemplateRenderer />
    </SaleProvider>
  );
}
