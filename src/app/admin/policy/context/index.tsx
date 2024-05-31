"use client";

import { Dispatch, createContext, useContext, useEffect } from "react";
import { ActionTypes, IAction, reducer } from "./reducer";
import { ReactNode, useReducer } from "react";
import {
  CustomerModel,
  IUi,
  IssueRequest,
  PolicyParticipantBeneficiaryRequest,
  PolicyParticipantInsurerRequest,
  PolicyParticipantInvoiceRecipientRequest,
  PolicyParticipantPolicyHolderRequest,
  PolicyParticipantPolicyUserRequest,
} from "../type";
import dayjs from "dayjs";

export interface OverwrittenIssueRequest extends IssueRequest {
  beneficiaries: (PolicyParticipantBeneficiaryRequest & CustomerModel)[];
  insurers: (PolicyParticipantInsurerRequest & CustomerModel)[];
  policyHolders: (PolicyParticipantPolicyHolderRequest & CustomerModel)[];
  invoiceRecipients: (PolicyParticipantInvoiceRecipientRequest &
    CustomerModel)[];
  policyUsers: (PolicyParticipantPolicyUserRequest & CustomerModel)[];
}

export interface IParticipants
  extends Pick<
    OverwrittenIssueRequest,
    | "beneficiaries"
    | "insurers"
    | "policyHolders"
    | "invoiceRecipients"
    | "policyUsers"
  > {}

const defaultRequest = {
  serial: "",
  text: "",
  currencyType: "EUR",
  issueDateUtc: dayjs(),
  startDateUtc: dayjs(),
  endDateUtc: dayjs(),
  retroactiveDateUtc: dayjs(),
  durationId: "",
  bonusCommissionRate: 0,
  agencyCommissionRate: 0,
  intermediaryCommissionRate: 0,
  adjustedPremium: 0,
  agencyId: "",
  underwriterId: "",
  intermediaryId: "",
  items: [],
  beneficiaries: [],
  insurers: [],
  policyHolders: [],
  invoiceRecipients: [],
  policyUsers: [],
  paymentType: "",
  distributionChannel: "",
  productId: "",
  metadata: {},
  policyInstallments: [],
  policyRenewalRequests: [],
} as OverwrittenIssueRequest;

const defaultUi = {
  premium: 0,
  loading: false,
  disabled: false,
  premiumMethod: async () => {},
};

interface ICoreContext {
  data: OverwrittenIssueRequest;
  dispatch: Dispatch<IAction<OverwrittenIssueRequest>>;
  ui: IUi;
  dispatchUi: Dispatch<IAction<IUi>>;
}

const CoreContext = createContext<ICoreContext>({
  data: defaultRequest,
  dispatch: () => {},
  ui: defaultUi,
  dispatchUi: () => {},
});

export const useCoreContext = () => useContext(CoreContext);

export function isParticipantCVArray(
  participants: any
): participants is Array<{ id: string }> {
  // Check if it's an array and all elements in the array have an 'id' property
  return (
    Array.isArray(participants) &&
    participants.every(
      (participant) => typeof participant === "object" && "id" in participant
    )
  );
}

export default function CoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, dispatch] = useReducer(
    reducer<OverwrittenIssueRequest>,
    defaultRequest
  );

  const [rules, dispatchRules] = useReducer(reducer<{}>, {});

  const [ui, dispatchUi] = useReducer(reducer<IUi>, defaultUi);

  useEffect(() => {
    console.log(data);
  }, [JSON.stringify(data)]);

  function validateDuplication(action: IAction<OverwrittenIssueRequest>) {
    const actionType = action.type;

    if (actionType !== ActionTypes.CREATE) return;

    const selectedArray = data[action.payload.key];

    if (!isParticipantCVArray(selectedArray)) return;

    const ids = selectedArray.map((item) => {
      if (item.id) return item.id;
      return {};
    });

    if (ids.includes(action.payload.item?.id)) {
      throw new Error(
        "Error: Entiteti qe po kerkoni te shtoni eshte ekzistent dhe nuk mund ta duplikoni!"
      );
    }
  }

  return (
    <CoreContext.Provider
      value={{
        data,
        dispatch: (action: IAction<OverwrittenIssueRequest>) => {
          try {
            validateDuplication(action);

            return dispatch(action);
          } catch (error) {
            throw error;
          }
        },
        ui,
        dispatchUi,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
}
