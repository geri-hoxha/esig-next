"use client";

import Participants from "@/components/esig/Participants";
import { IContext, useSale } from "@/context/SaleContext";
import { SET, UPDATE } from "@/context/reducer";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox"

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
  }
];

export default function PolicyUsers() {
  const { data, dispatch }: IContext = useSale();

  useEffect(() => {
    dispatch({ type: SET, payload: { key: "policyUsers", item: fakeData } });
  }, []);

  const onCheckboxClick = (checked: boolean | string,id: string) => {
    const updatedPolicyUsers = data.policyUsers.map((policyUser) => {
      if(id === policyUser.id) {
        return {
          ...policyUser,
          extraCharge: !!checked
        }
      }
      return policyUser
    })

    dispatch({type: SET, payload: {key: 'policyUsers', item: updatedPolicyUsers}})
  }

  return <Participants title="Te siguruarit" contextProperty={"policyUsers"} headerName={"Tarife shtese"}  >
    {(participant) => {
      return (
        <div className="col-span-2 px-2 -ml-5">
          <div className="my-1.5 flex items-center h-4 pt-2 justify-center">
            <Checkbox onCheckedChange={(checked) => onCheckboxClick(checked, participant.id)} />
          </div>
        </div>
      )
    }}
  </Participants>
}
