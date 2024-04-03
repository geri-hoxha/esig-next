"use client";

import Image from "next/image";
import GeriHoxha from "../GeriHoxha";
import { Dispatch, useEffect, useState } from "react";
import { ButtonGeri } from "../page";
import { IAction, SET } from "@/context/reducer";
import { IParticipants } from "./ParticipantsWrapper";
import numeral from "numeral";

interface IProps {
  title: string;
  data: any;
  dispatch: Dispatch<IAction<IParticipants>>;
  haveLeader?: boolean;
  stateKey: keyof IParticipants;
  percentageKey?: "ownershipPercentage" | "invoiceSplitPercentage" | "";
}

let toggle: boolean = false;

const Participants: React.FC<IProps> = ({
  title,
  data,
  haveLeader = false,
  percentageKey = "",
  dispatch,
  stateKey,
}) => {
  const [x, setx] = useState(false);

  useEffect(() => {
    setx(toggle);

    if (toggle) {
      const splitPercentage = 1 / data.length;
      const item = [
        ...data.map((user: any) => {
          return {
            ...user,
            [percentageKey]: splitPercentage,
          };
        }),
      ];

      dispatch({
        type: SET,
        payload: {
          key: stateKey,
          item,
        },
      });
    } else {
      if (!percentageKey) return;

      const item = [
        ...data.map((user: any, index: number) => {
          if (index === 0) {
            return {
              ...user,
              [percentageKey]: 1,
            };
          }

          return {
            ...user,
            [percentageKey]: 0,
          };
        }),
      ];

      dispatch({
        type: SET,
        payload: {
          key: stateKey,
          item,
        },
      });
    }
  }, []);

  const onToggle = () => {
    setx(!x);
    toggle = !x;

    if (!percentageKey) return;

    // it was false
    if (x === false) {
      const splitPercentage = 1 / data.length;

      const item = [
        ...data.map((user: any) => {
          return {
            ...user,
            [percentageKey]: splitPercentage,
          };
        }),
      ];

      dispatch({
        type: SET,
        payload: {
          key: stateKey,
          item,
        },
      });

      return;
    }

    const item = [
      ...data.map((user: any, index: number) => {
        if (index === 0) {
          return {
            ...user,
            [percentageKey]: 1,
          };
        }

        return {
          ...user,
          [percentageKey]: 0,
        };
      }),
    ];

    dispatch({
      type: SET,
      payload: {
        key: stateKey,
        item,
      },
    });
  };

  return (
    <div className="flex flex-col min-w-60">
      <div className="flex items-center text-lg font-semibold text-gray-700">
        {title}
        <GeriHoxha haveLeader={haveLeader} baseUsers={data} dispatch={dispatch} stateKey={stateKey} percentageKey={percentageKey}/>
      </div>
      <ButtonGeri className="text-esig hover:bg-sky-50" onClick={onToggle}>
        <div className="flex items-center gap-x-1">
          <Image
            src="/svg/refresh.svg"
            alt="edit"
            width={"0"}
            height={"0"}
            style={{ width: 20, height: 20 }}
            priority
          />
          <span className="ml-0">
            {x ? "Vetem lideri" : "Ne menyre te barabarte"}
          </span>
        </div>
      </ButtonGeri>
      <ul>
        {data.map((user: any, index: number) => {
          return (
            <li key={index} className="flex items-center gap-2">
              {index === 0 && haveLeader ? (
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
                <div>-</div>
              )}{" "}
              <span className="truncate max-w-32"> {user?.displayName},</span>
              {percentageKey && (
                <span>{numeral(user[percentageKey]).format(`0${user[percentageKey] === 0 ? '' : '.0'}%`)}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Participants;
