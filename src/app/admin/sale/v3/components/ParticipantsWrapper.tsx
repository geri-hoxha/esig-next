import { useReducer } from "react";
import { Geri } from "../page";
import Participants from "./Participants";
import { IAction, reducer } from "@/context/reducer";
import PolicyUsers from "./PolicyUsers";

export interface IParticipants {
  policyUsers: any[];
  beneficiaries: any[];
  policyHolders: any[];
  invoiceRecipients: any[];
}

type Reducer = (
  state: IParticipants,
  action: IAction<IParticipants>
) => IParticipants;

const ParticipantsWrapper = () => {
  const [data, dispatch] = useReducer<Reducer>(reducer<IParticipants>, {
    policyUsers: [],
    beneficiaries: [],
    policyHolders: [],
    invoiceRecipients: [],
  });

  return (
    <Geri
      items={[
        {
          cols: "1",
          title: "Perdoruesit e polices",
          children: (
            <PolicyUsers dispatch={dispatch} data={data["policyUsers"]} />
          ),
        },
        ...(data.policyUsers.length === 0
          ? []
          : [
              {
                cols: "1",
                title: "Palet pjesemarrese ne police",
                className: "scrollArea  overflow-x-auto pb-2",
                children: (
                  <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-max"
                    key={data["policyUsers"].length}
                  >
                    <Participants
                      title="Policembajtesit"
                      data={data["policyHolders"]}
                      dispatch={dispatch}
                      percentageKey="ownershipPercentage"
                      haveLeader
                      stateKey="policyHolders"
                    />
                    <Participants
                      title="Perfituesit"
                      dispatch={dispatch}
                      data={data["beneficiaries"]}
                      stateKey="beneficiaries"
                      percentageKey="ownershipPercentage"
                    />
                    <Participants
                      title="Te faturarit"
                      dispatch={dispatch}
                      data={data["invoiceRecipients"]}
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

export default ParticipantsWrapper;
