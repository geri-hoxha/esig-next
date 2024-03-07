"use client";

import { SaleProvider } from "@/context/SaleContext";
import Serial from "../components/Fields_v2/Serial";
import StartDate from "../components/Fields_v2/StartDate";
import EndDate from "../components/Fields_v2/EndDate";
import IssueDate from "../components/Fields_v2/IssuedDate";
import DistributionChannel from "../components/Fields_v2/DistributionChannel";
import PaymentType from "../components/Fields_v2/PaymentType";
import CurrencyType from "../components/Fields_v2/CurrenyType";
import Section from "../components/Section";
import RetroactiveDate from "../components/Fields_v2/RetroactiveDate";
import Preview from "../components/Preview";

export default function PropertySale() {
  return (
    <SaleProvider>
      <div className="grid grid-cols-7 gap-4 h-full">
        <div className="col-span-4">
          
          <Section
            title="Te pergjithshme"
            items={[
              {
                title: "Kryesore",
                children: (
                  <div className="grid grid-cols-1 gap-y-3 pl-3">
                    <Serial />
                    <Serial />
                    <Serial />
                    <Serial />

                    {/* <PaymentType />
                    <CurrencyType />
                    <DistributionChannel /> */}
                  </div>
                ),
              },
              {
                title: "Datat",
                children: (
                  <div className="grid grid-cols-1 gap-y-3 pl-3">
                    <StartDate />
                    <IssueDate />
                    <EndDate />
                    <RetroactiveDate />
                  </div>
                ),
              },
            ]}
          />
        </div>
        <div className="col-span-3">
          <Preview />
        </div>
      </div>
    </SaleProvider>
  );
}
