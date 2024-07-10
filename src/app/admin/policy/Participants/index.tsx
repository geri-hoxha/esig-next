"use client";

import { CustomerModel } from "@/types";
import Section from "../Section";
import { IParticipants, useCoreContext } from "../context";
import List from "./List";
import PolicyUsers from "./PolicyUser";

export function isPolicyHolder(
  user: any
): user is IParticipants["policyUsers"] {
  return "isLeader" in user;
}

const Participants = () => {
  const { data } = useCoreContext();

  const { policyHolders, beneficiaries, invoiceRecipients } = data;

  const checkIfPariticipantsArrayEmpty = (
    participantsData: CustomerModel[]
  ) => {
    return (
      participantsData.filter((participant) => participant.id).length === 0
    );
  };

  return (
    <Section
      items={[
        {
          cols: "1",
          title: "Perdoruesit e polices",
          children: <PolicyUsers />,
        },
        ...(checkIfPariticipantsArrayEmpty([
          ...policyHolders,
          ...beneficiaries,
          ...invoiceRecipients,
        ])
          ? []
          : [
              {
                cols: "1",
                title: "Palet pjesemarrese ne police",
                className: "scrollArea  overflow-x-auto pb-2",
                children: (
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-max"
                    key={data.policyUsers.length}
                  >
                    <List
                      title="Policembajtesit"
                      percentageKey="ownershipPercentage"
                      stateKey="policyHolders"
                    />
                    <List
                      title="Perfituesit"
                      stateKey="beneficiaries"
                      percentageKey="ownershipPercentage"
                    />
                    <List
                      title="Te faturarit"
                      stateKey="invoiceRecipients"
                      percentageKey="invoiceSplitPercentage"
                    />
                  </div>
                ),
              },
            ]),
      ]}
    />
  );
};

export default Participants;
