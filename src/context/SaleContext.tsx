import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from "react";
import { IAction, reducer } from "./reducer";

interface ISaleContext {
  policyUsers: any[];
}

interface IContext {
  data: ISaleContext;
  dispatch: Dispatch<IAction<ISaleContext>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const saleContext = {
  data: {
    policyUsers: [],
  },
  dispatch: () => {},
  setLoading: () => {},
};

type Reducer = (
  state: ISaleContext,
  action: IAction<ISaleContext>
) => ISaleContext;

// Create a context
const SaleContext = createContext<IContext>(saleContext);

// Create a provider component
const SaleProvider = ({ children }: { children: ReactNode }) => {
  // Context state
  const [data, dispatch] = useReducer<Reducer>(
    reducer<ISaleContext>,
    saleContext.data
  );

  const [loading, setLoading] = useState<boolean>(false);

  // todo: create a form instance

  return (
    <SaleContext.Provider value={{ data, dispatch, setLoading }}>
      {/* todo: add a loader wrapper */}
      {children}
    </SaleContext.Provider>
  );
};

const useSale = () => useContext(SaleContext);

export { SaleProvider, useSale };

export type { ISaleContext, IContext };
