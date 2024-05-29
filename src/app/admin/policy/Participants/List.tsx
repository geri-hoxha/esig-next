"use client";

import numeral from "numeral";
import { useEffect, useState } from "react";
import { IParticipants, useCoreContext } from "../context";
import { SET } from "../context/reducer";
import Image from "next/image";
import {
  CustomerModel,
  PolicyParticipantBeneficiaryRequest,
  PolicyParticipantInvoiceRecipientRequest,
  PolicyParticipantPolicyHolderRequest,
  PolicyParticipantPolicyUserRequest,
} from "../type";
import ParticipantModal from "./ParticipantModal";
import { isPolicyHolder } from ".";
import Button from "../components/Button";

export interface IParticipantsList {
  stateKey: keyof IParticipants;
  percentageKey: "ownershipPercentage" | "invoiceSplitPercentage";
}

// Type Assertions - aggressive
export interface ParticipantWithPercentage
  extends PolicyParticipantBeneficiaryRequest,
    PolicyParticipantPolicyHolderRequest,
    PolicyParticipantInvoiceRecipientRequest,
    PolicyParticipantPolicyUserRequest,
    CustomerModel {
  ownershipPercentage: number;
  invoiceSplitPercentage: number;
}

let outsideToggle: boolean = false;

const List: React.FC<IParticipantsList & { title: string }> = ({
  title,
  percentageKey,
  stateKey,
}) => {
  const { data: coreData, dispatch } = useCoreContext();

  const [splitPercentage, setSplitPercentage] = useState<boolean>(false);

  const data = coreData[stateKey];

  useEffect(() => {
    setSplitPercentage(outsideToggle);

    if (outsideToggle) {
      return distributePercentage();
    }

    allPecentageTotheLeader();
  }, []);

  const onToggle = () => {
    setSplitPercentage(!splitPercentage);

    outsideToggle = !splitPercentage;

    // it was false
    if (splitPercentage === false) {
      return distributePercentage();
    }

    allPecentageTotheLeader();
  };

  const distributePercentage = () => {
    const splitPercentage = 1 / data.length;

    const item = data.map((user) => {
      return {
        ...user,
        [percentageKey]: splitPercentage * 100,
      };
    });

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item,
      },
    });
  };

  const allPecentageTotheLeader = () => {
    const item = data.map((user, index: number) => {
      if (index === 0) {
        return {
          ...user,
          [percentageKey]: 100,
        };
      }

      return {
        ...user,
        [percentageKey]: 0,
      };
    });

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item,
      },
    });
  };

  return (
    <div className="flex flex-col min-w-60 ">
      <div className="flex items-center  font-semibold text-gray-700">
        {title}
        <ParticipantModal percentageKey={percentageKey} stateKey={stateKey} />
      </div>
      {data.length > 1 && (
        <Button
          className="w-max mx-0"
          iconSrc="/svg/refresh.svg"
          variant="edit"
          onClick={onToggle}
        >
          <span className="ml-0">
            {splitPercentage ? "Vetem lideri" : "Ne menyre te barabarte"}
          </span>
        </Button>
      )}
      <ul>
        {data.map((user, index: number) => {
          return (
            <li key={index} className="flex items-center gap-2 mb-1">
              {index === 0 && isPolicyHolder(user) ? (
                <Image
                  src="/svg/star.svg"
                  alt="users_group"
                  width={"0"}
                  height={"0"}
                  style={{ width: 15, height: 15 }}
                  className=""
                  priority
                />
              ) : (
                <div>&#x2022;</div>
              )}{" "}
              <span className="truncate max-w-32"> {user?.displayName}</span>
              {percentageKey in user && !!percentageKey && (
                <span>
                  {numeral(
                    (user as ParticipantWithPercentage)[percentageKey] ?? 0
                  ).format(
                    `0${
                      (user as ParticipantWithPercentage)[percentageKey] === 0
                        ? ""
                        : ".00"
                    }`
                  )}%
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
