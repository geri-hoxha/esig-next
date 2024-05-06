import Section from "../Section";
import { useCoreContext } from "../context";
import { useReducer } from "react";
import { CustomerModel } from "../type";
import { IAction, reducer } from "../context/reducer";

export interface IParticipants {
  policyUsers: CustomerModel[];
  beneficiaries: CustomerModel[];
  policyHolders: CustomerModel[];
  invoiceRecipients: CustomerModel[];
}

type Reducer = (
  state: IParticipants,
  action: IAction<IParticipants>
) => IParticipants;

const Participants = () => {
  // const [localParticipants, dispatch] = useReducer<Reducer>(
  //   reducer<IParticipants>,
  //   {
  //     policyUsers: [],
  //     beneficiaries: [],
  //     policyHolders: [],
  //     invoiceRecipients: [],
  //   }
  // );

  return (
    <Section
      items={[
        {
          cols: "1",
          title: "Perdoruesit e polices",
          children: (
            <PolicyUsers  />
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

export default Participants;
