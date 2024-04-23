"use client";

import {
  IParticipantsComponent,
  IRule,
  ParticipantsLimits,
  useSale,
} from "@/context/SaleContext";
import { useMemo } from "react";
import PolicyUsers from "./PolicyUsers";
import Beneficiaries from "./Beneficiaries";
import LimitsAsker from "./LimitsAsker";
import PolicyHolders from "./PolicyHolders";
import Insurers from "./Insurers";
import InvoiceRecipients from "./InvoiceRecipients";

const participantsComponents: IParticipantsComponent = {
  policyUsers: <PolicyUsers />,
  beneficiaries: <Beneficiaries />,
  policyHolders: <PolicyHolders />,
  insurers: <Insurers />,
  invoiceRecipients: <InvoiceRecipients />,
};

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

    return {
      multi: multiParticipants,
      single: singleParticipants,
    };
  }, [rules]);

  const tables = participantsSorted.multi;

  const fields = participantsSorted.single;

  const tablesCount = tables.length;

  const Renderer = () => { 
    if (tablesCount === 5)  {
      return (
        <div className="grid grid-cols-6 gap-6">
          {tables.map((key, index) => {
            return (
              <div
                key={key}
                className={`h-max ${index > 2 ? "col-span-3" : "col-span-2"}`}
              >
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }

    if (tablesCount === 4) {
      return (
        <div className="grid grid-cols-6 gap-6">
          {tables.map((key, index) => {
            return (
              <div
                key={key}
                className={`h-max  ${
                  index + 1 === tablesCount ? "col-span-4" : "col-span-2"
                }`}
              >
                {participantsComponents[key]}
              </div>
            );
          })}
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max col-span-2`}>
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }

    if (tablesCount === 4) {
      return (
        <div className="grid grid-cols-6 gap-6">
          {tables.map((key, index) => {
            return (
              <div
                key={key}
                className={`h-max  ${
                  index + 1 === tablesCount ? "col-span-4" : "col-span-2"
                }`}
              >
                {participantsComponents[key]}
              </div>
            );
          })}
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max col-span-2`}>
                {participantsComponents[key]}
              </div>
            ); 
          })}
        </div>
      );
    }

    if (tablesCount === 3) {
      return (
        <div className="grid grid-cols-6 gap-6">
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max col-span-3`}>
                {participantsComponents[key]}
              </div>
            );
          })}

          {tables.map((key) => {
            return (
              <div key={key} className={`h-max  col-span-2`}>
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }

    if (tablesCount === 2) {
      return (
        <div className="grid grid-cols-6 gap-6">
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max col-span-2`}>
                {participantsComponents[key]}
              </div>
            );
          })}

          {tables.map((key) => {
            return (
              <div key={key} className={`h-max  col-span-3`}>
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }

    if (tablesCount === 1) {
      return (
        <div className="grid grid-rows-2 grid-flow-col gap-6">
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max  `}>
                {participantsComponents[key]}
              </div>
            );
          })}

          {tables.map((key) => {
            return (
              <div key={key} className={`h-max row-span-2`}>
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }

    if (tablesCount === 0) {
      return (
        <div className="grid grid-cols-3 gap-6">
          {fields.map((key) => {
            return (
              <div key={key} className={`h-max  `}>
                {participantsComponents[key]}
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      {Renderer()}
      <LimitsAsker />
    </>
  );
};

export default TemplateRenderer;
