"use client";

import { IRule, ParticipantsLimits, useSale } from "@/context/SaleContext";
import { useEffect, useMemo } from "react";
import PolicyUsers from "./PolicyUsers";
import Beneficiaries from "./Beneficiaries";
import LimitsAsker from "./LimitsAsker";
import PolicyHolders from "./PolicyHolders";
import Insurers from "./Insurers";
import InvoiceRecipients from "./InvoiceRecipients";

const TemplateRenderer: React.FC = () => {
  const { data, rules } = useSale();

  const participantsSorted = useMemo(() => {
    const singleParticipants: string[] = [];

    const multiParticipants: string[] = [];

    Object.keys(rules).forEach((key: string) => {
      const limits: ParticipantsLimits = rules[key as keyof IRule];
      if (limits.max === 1) {
        return singleParticipants.push(key);
      }

      multiParticipants.push(key);
    });

    return {
      single: singleParticipants,
      multi: multiParticipants,
    };
  }, [data]);

  return (
    <>
      <div className="grid grid-cols-3 gap-6 mt-6">
        <PolicyUsers />
        <Beneficiaries />
        <PolicyHolders />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <Insurers />
        <InvoiceRecipients />
      </div>
      <LimitsAsker />
    </>
  );
};

export default TemplateRenderer;
