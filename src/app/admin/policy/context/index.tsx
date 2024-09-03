"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAction, MASS_UPDATE, reducer } from "./reducer";
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
  ProductConfiguration,
} from "../type";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import { PageLoader } from "../components/Loader";
import PolicyItemRequestModel from "../models/PolicyItemRequestModel";
import { ObjectModelDTO } from "../page";

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
    "beneficiaries" | "policyHolders" | "invoiceRecipients" | "policyUsers"
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
  setUi: Dispatch<SetStateAction<IUi>>;
  rules: ProductConfiguration;
  setRules: Dispatch<SetStateAction<ProductConfiguration | undefined>>;
}

const CoreContext = createContext<ICoreContext>({
  data: defaultRequest,
  dispatch: () => {},
  ui: defaultUi,
  setUi: () => {},
  rules: {} as ProductConfiguration,
  setRules: () => {},
});

export const useCoreContext = () => useContext(CoreContext);

export default function CoreContextProvider<T>({
  children,
  id,
  objectModelDTO,
}: {
  children: ReactNode;
  id: string;
  objectModelDTO: ObjectModelDTO;
}) {
  const { toast } = useToast();

  const [data, dispatch] = useReducer(
    (
      data: OverwrittenIssueRequest,
      props: IAction<OverwrittenIssueRequest>
    ) => {
      try {
        return reducer<OverwrittenIssueRequest>(data, props);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: error.message,
        });

        return data;
      }
    },
    defaultRequest
  );

  const [rules, setRules] = useState<ProductConfiguration>();

  const [ui, setUi] = useState<IUi>(defaultUi);

  useEffect(() => {
    console.log(data);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    PolicyItemRequestModel.modelParameter = objectModelDTO;
    initPresale();
    initBusinessRules();
  }, []);

  const initPresale = async () => {
    const response = await _request(`/policystandard/presale`, token, {
      method: "POST",
      body: JSON.stringify({
        metadata: {},
        productId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({ type: MASS_UPDATE, payload: { item: response.data, key: "" } });
  };

  const initBusinessRules = async () => {
    const response = await _request(`/policystandard/business-rules`, token, {
      method: "POST",
      body: JSON.stringify({
        metadata: {},
        productId: id,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    setRules(response.data.defaultConfiguration);
  };

  if (!rules) {
    return <PageLoader text="Polica po ngarkohet ..." />;
  }

  return (
    <CoreContext.Provider
      value={{
        data,
        dispatch,
        ui,
        setRules,
        rules,
        setUi,
      }}
    >
      <div className="overflow-hidden h-full">
        <div className="fade-in-right flex flex-col gap-4 md:gap-6">
          {children}
        </div>
      </div>
    </CoreContext.Provider>
  );
}
