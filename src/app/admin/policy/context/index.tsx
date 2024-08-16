"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
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
  ProductConfiguration,
} from "../type";
import dayjs from "dayjs";
import { useToast } from "@/components/ui/use-toast";
import _request from "@/request";
import { token } from "@/components/esig/Navbar/Currencies";
import Loader, { PageLoader } from "../components/Loader";

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
  rules: {} as any,
  setRules: () => {},
});

export const useCoreContext = () => useContext(CoreContext);

export function isParticipantsArray(
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
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const [data, dispatch] = useReducer(
    reducer<OverwrittenIssueRequest>,
    defaultRequest
  );

  const [rules, setRules] = useState<ProductConfiguration>();

  const [ui, setUi] = useState<IUi>(defaultUi);

  const { toast } = useToast();

  useEffect(() => {
    console.log(data);
  }, [JSON.stringify(data)]);

  useEffect(() => {
    initBusinessRules();
  }, []);

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

  function middleware(action: IAction<OverwrittenIssueRequest>) {
    const actionType = action.type;

    // 1.0
    if(action.payload.key === 'items') {
      preparePolicyItemsPayload(action);
    }

    // 2.0
    if (actionType !== ActionTypes.CREATE) return;
   
    validateDuplication(action);
  }

  const validateDuplication = (action: IAction<OverwrittenIssueRequest>) => {
    const selectedArray = data[action.payload.key];

    if (!isParticipantsArray(selectedArray)) return;

    const ids = selectedArray.map((item) => {
      if (item.id) return item.id;
      return {};
    });

    if (ids.includes(action.payload.item?.id)) {
      throw new Error(
        `Error: ${action.payload.item.displayName} eshte ekzistent dhe nuk mund te duplikohet. Veprimi u anullua!`
      );
    }
  };

  const preparePolicyItemsPayload = (action: IAction<OverwrittenIssueRequest>) => {
    // action.payload.item
  }

  if (!rules) {
    return <PageLoader text="Polica po ngarkohet ..." />;
  }

  return (
    <CoreContext.Provider
      value={{
        data,
        dispatch: (action: IAction<OverwrittenIssueRequest>) => {
          try {
            console.log(action)
            middleware(action);

            return dispatch(action);
          } catch (error: any) {
            toast({
              variant: "destructive",
              title: error.message,
            });

            throw error;
          }
        },
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
