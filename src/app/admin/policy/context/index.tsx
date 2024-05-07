'use client'

import { Dispatch, createContext, useContext } from "react";
import { IAction, reducer } from "./reducer";
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

export interface IParticipants extends Pick<OverwrittenIssueRequest, 'beneficiaries' | 'insurers' | 'policyHolders' | 'invoiceRecipients' | 'policyUsers'> {
}

const defaultRequest = {
  serial: "",
  text: "",
  currencyType: "",
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

export default function CoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, dispatch] = useReducer(reducer<OverwrittenIssueRequest>, defaultRequest);

  const [rules, dispatchRules] = useReducer(reducer<{}>, {});

  const [ui, dispatchUi] = useReducer(reducer<IUi>, defaultUi);

  return (
    <CoreContext.Provider
      value={{
        data,
        dispatch,
        ui,
        dispatchUi,
      }}
    >
      {children}
    </CoreContext.Provider>
  );
}
