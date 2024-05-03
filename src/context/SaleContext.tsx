import React, {
  Dispatch,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { IAction, reducer } from "./reducer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dayjs } from "dayjs";

interface IParticipantsComponent {
  policyUsers: ReactNode;
  beneficiaries: ReactNode;
  policyHolders: ReactNode;
  insurers: ReactNode;
  invoiceRecipients: ReactNode;
}

interface IFormContext {
  serial?: string;
  currencyType?: string;
  paymentType?: string;
  startDateUtc?: Dayjs;
  endDateUtc?: Dayjs;
  issuedDateUtc?: Dayjs;
  retroActiveDateUtc?: Dayjs;
  distributionChannel?: string;
}

interface ISaleContext {
  policyUsers: any[];
  beneficiaries: any[];
  policyHolders: any[];
  insurers: any[];
  invoiceRecipients: any[];
}

interface ParticipantsLimits {
  min: number;
  max: number;
}
interface IRule {
  policyUsers: ParticipantsLimits;
  beneficiaries: ParticipantsLimits;
  policyHolders: ParticipantsLimits;
  insurers: ParticipantsLimits;
  invoiceRecipients: ParticipantsLimits;
}

interface IContext {
  data: ISaleContext;
  dispatch: Dispatch<IAction<ISaleContext>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  rules: IRule;
  setRules: (arg: Partial<IRule>) => void;
}

const defaultLimits = {
  min: 0,
  max: 0,
};

const defaultRules = {
  policyUsers: defaultLimits,
  beneficiaries: defaultLimits,
  policyHolders: defaultLimits,
  insurers: defaultLimits,
  invoiceRecipients: defaultLimits,
};

const saleContext: IContext = {
  data: {
    policyUsers: [],
    beneficiaries: [],
    policyHolders: [],
    insurers: [],
    invoiceRecipients: [],
  },
  dispatch: () => {},
  setLoading: () => {},
  rules: defaultRules,
  setRules: () => {},
};

type Reducer = (
  state: ISaleContext,
  action: IAction<ISaleContext>
) => ISaleContext;

const formSchema = z.object({
  serial: z.string().min(1, "Seriali eshte i detyrueshem!"),
  currencyType:  z.string().min(1, "Monedha eshte i detyrueshem!"),
  paymentType:  z.string().min(1, "Metoda e pageses eshte e detyrueshme!"),
  startDateUtc: z.string().datetime().min(1, "Data e fillimit eshte e detyrueshme!"),
  endDateUtc: z.string().datetime().min(1, "Data e mbarimit eshte e detyrueshme!"),
  issuedDateUtc: z.string().datetime().min(1, "Data e lëshimit eshte e detyrueshme!"),
  retroActiveDateUtc: z.string().datetime().min(1, "Data e retrospektive eshte e detyrueshme!"),
  distributionChannel:  z.string().min(1, "Kanali i shpërndarjes eshte i detyrueshem!"),
});

// Create a context
const SaleContext = createContext<IContext>(saleContext);

// Create a provider component
const SaleProvider = ({ children }: { children: ReactNode }) => {
  // Context state
  const [data, dispatch] = useReducer<Reducer>(
    reducer<ISaleContext>,
    saleContext.data
  );

  const [rules, setRules] = useState<IRule>(saleContext.rules);

  const [loading, setLoading] = useState<boolean>(false);

  const _setRules = useCallback(
    (arg: Partial<IRule>) => {
      return setRules({ ...rules, ...arg });
    },
    [rules]
  );

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IFormContext>({
    defaultValues: {},
    resolver: zodResolver(formSchema),
  });

  return (
    <SaleContext.Provider
      value={{ data, dispatch, setLoading, rules, setRules: _setRules }}
    >
      {/* todo: add a loader wrapper */}
      {children}
    </SaleContext.Provider>
  );
};

const useSale = () => useContext(SaleContext);

export { SaleProvider, useSale, defaultRules };

export type {
  ISaleContext,
  IContext,
  ParticipantsLimits,
  IRule,
  IParticipantsComponent,
  Reducer,
};
