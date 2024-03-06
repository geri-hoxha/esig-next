"use client";

import { IParticipantsComponent, IRule, ParticipantsLimits, useSale } from "@/context/SaleContext";
import { Fragment, ReactNode, useMemo } from "react";
import PolicyUsers from "./PolicyUsers";
import Beneficiaries from "./Beneficiaries";
import LimitsAsker from "./LimitsAsker";
import PolicyHolders from "./PolicyHolders";
import Insurers from "./Insurers";
import InvoiceRecipients from "./InvoiceRecipients";

const participantsComponents: IParticipantsComponent = {
  'policyUsers': <PolicyUsers />,
  'beneficiaries': <Beneficiaries />,
  'policyHolders': <PolicyHolders />,
  'insurers': <Insurers />,
  'invoiceRecipients': <InvoiceRecipients />,
}

const TemplateRenderer: React.FC = () => {
  const { data, rules } = useSale();

  const participantsSorted = useMemo(() => {
    const singleParticipants: (keyof IParticipantsComponent)[] = [];

    const multiParticipants: (keyof IParticipantsComponent)[] = [];

    Object.keys(rules).forEach((key: string) => {
      const limits: ParticipantsLimits = rules[key as keyof IRule];
      if (limits.max === 1) {
        return singleParticipants.push(key as keyof IParticipantsComponent);
      }

      multiParticipants.push(key as keyof IParticipantsComponent);
    });

    return [...singleParticipants, ...multiParticipants];
  }, [data]);


  return (
    <>
      <div className="grid grid-rows-2 grid-flow-col mt-5 gap-4">
        {
          participantsSorted.map((key) => {
            return <Fragment key={key}>{participantsComponents[key]}</Fragment>
          })
        }
      </div>
      <LimitsAsker />
    </>
  );
};

export default TemplateRenderer;
