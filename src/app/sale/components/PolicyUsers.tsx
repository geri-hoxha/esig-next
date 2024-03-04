"use client";

import Participants from "@/components/esig/Participants";
import { IContext, useSale } from "@/context/SaleContext";
import { SET } from "@/context/reducer";
import { useEffect } from "react";

const fakeData = [
  {
    id: "1",
    displayName: "Agim Molla",
  },
  {
    id: "2",
    displayName: "Filan Fisteku",
  },
  {
    id: "3",
    displayName: "Fiqiri Bobi",
  },
  {
    id: "4",
    displayName: "Agim Molla",
  },
  {
    id: "5",
    displayName: "Filan Fisteku",
  },
  {
    id: "6",
    displayName: "Fiqiri Bobi",
  },
  {
    id: "7",
    displayName: "Agim Molla",
  },
  {
    id: "8",
    displayName: "Filan Fisteku",
  },
  {
    id: "9",
    displayName: "Fiqiri Bobi",
  },
  {
    id: "10",
    displayName: "Agim Molla",
  },
  {
    id: "11",
    displayName: "Filan Fisteku",
  },
  {
    id: "12",
    displayName: "Fiqiri Bobi",
  },
];

export default function PolicyUsers() {
  
  const { dispatch, setRules }: IContext = useSale();

  useEffect(() => {
    dispatch({ type: SET, payload: { key: "policyUsers", item: fakeData } });

    setRules({
      policyUsers: {
        min: 1,
        max: 3
      }
    })

  }, []);
 
  return (
    <Participants
      title="Policy Users"
      contextProperty={"policyUsers"}
    />
  );
}
