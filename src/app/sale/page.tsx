'use client'

import { Separator } from "@/components/ui/separator";
import CurrencyType from "./components/CurrenyType";
import DistributionChannel from "./components/DistributionChannel";
import EndDate from "./components/EndDate";
import IssueDate from "./components/IssuedDate";
import PaymentType from "./components/PaymentType";
import Serial from "./components/Serial";
import StartDate from "./components/StartDate";
import PolicyUsers from "./components/PolicyUsers";
import { IContext, SaleProvider, useSale } from "@/context/SaleContext";
import { useEffect } from "react";
import Beneficiaries from "./components/Beneficiaries";

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
      <Separator className="mt-6" />
      <div className="grid grid-cols-3 gap-6 mt-6">
        <PolicyUsers />
        <Beneficiaries />
      </div>
    </SaleProvider>
  );
}
