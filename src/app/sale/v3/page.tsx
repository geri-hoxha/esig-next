"use client";

import Base from "../components/Fields_v2/Base";
import Image from "next/image";
import Zerat from "./Zerat";
import { ReactNode, useState } from "react";
import Cards, { EmptyCard } from "./Cards";
import History from "./History";
import Comments from "./Comments";
import Modal from "@/components/esig/Modal";
import CustomerModal from "./CustomerModal";
import { beneficiaries } from "./ParticipantModal";
import GeriHoxha from "./GeriHoxha";
import ZeratModal from "./ZeratModal";
import PolicyUsers from "./components/PolicyUsers";
import GeneralFields from "./components/GeneralFields";
import DatesFields from "./components/DatesFields";
import Participants from "./components/Participants";
import InsuredObjects from "./components/InsuredObjects";

interface IProps {
  title: string;
  items: {
    title: ReactNode;
    children: ReactNode;
    cols?: string;
    className?: string;
  }[];
}

const Geri: React.FC<Partial<IProps>> = ({ title, items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {typeof title === "string" ? (
        <h2 className="text-2xl bg-red-0">{title}</h2>
      ) : (
        title
      )}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8`}>
        {items.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              <h3 className="text-xl bg-red-0">{item.title}</h3>
              <div
                className={`grid grid-cols-${item?.cols ?? "2"} gap-4 ${item.className ?? ""
                  }`}
              >
                {item.children}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Toggle = () => {
  const [x, setx] = useState(false);

  const onToggle = () => {
    setx(!x);
  };

  return (
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
  );
};

export const ButtonGeri: React.FC<{
  children: ReactNode;
  className: string;
  onClick?: any;
}> = ({ children, className, onClick }) => {
  return (
    <button
      className={`w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none transition-all duration-100 ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-1">{children}</div>
    </button>
  );
};

export default function Sale() {
  const [baseUsers, setBaseUsers] = useState([])


  return (
    <>
      <div className="flex flex-col  justify-center">
        <h1 className="text-3xl font-bold w-max">Shitje produkti TPL</h1>
        <span className="text-gray-600 text-xl">
          Sigurimi i detyrueshem qe mbulon palet e treta ne rast aksidenti
        </span>
      </div>

      <Geri
        items={[
          {
            title: "Te pergjithshme",
            children: <GeneralFields />,
          },
          {
            title: "Data",
            children: <DatesFields />,
          },
        ]}
      />
      <Geri
        items={[
          {
            cols: "1",
            title: "Perdoruesit e polices",
            children: <PolicyUsers setBaseUsers={setBaseUsers} />,
          },
          {
            cols: "1",
            title: "Palet pjesemarrese ne police",
            className: "scrollArea  overflow-x-auto pb-2",
            children: (
              <div className="grid grid-cols-3 gap-4 min-w-max">
                <div className="flex flex-col min-w-60">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Policembajtesit
                    <ButtonGeri className="text-esig hover:bg-sky-50">
                      <div className="flex items-center gap-x-1">
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Ndrysho</span>
                      </div>
                    </ButtonGeri>
                  </div>
                  <Toggle />
                  <div className="flex gap-2">
                    <div>-</div> Erin Hoxha, 100%
                  </div>
                </div>

                {
                  baseUsers.filter((user) => !!user?.id).length === 0 ? null :
                    <Participants
                      title='Perfituesit'
                      baseUsers={baseUsers}
                    />
                }



                <div className="flex flex-col min-w-60">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Te faturarit
                    <ButtonGeri className="text-esig hover:bg-sky-50">
                      <div className="flex items-center gap-x-1">
                        <Image
                          className="cursor-pointer"
                          src="/svg/edit.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Ndrysho</span>
                      </div>
                    </ButtonGeri>
                  </div>
                  <Toggle />
                  <ul>
                    <li className="flex gap-2">
                      <Image
                        src="/svg/star.svg"
                        alt="users_group"
                        width={"0"}
                        height={"0"}
                        style={{ width: 15, height: 15 }}
                        className=""
                        priority
                      />

                      <span>Geri Hoxha, 77%</span>
                    </li>
                    <li className="flex gap-2">
                      {" "}
                      <div>-</div>
                      Kledi Kallastra, 33%
                    </li>
                  </ul>
                </div>
              </div>
            ),
          },
        ]}
      />

      <Geri
        title="Zerat e polices ( zeri 1 )"
        items={[
          {
            title: "Objektet e siguruara",
            className: "scrollArea max-h-[500px] overflow-y-scroll pr-2 pb-2",
            children: (
              <InsuredObjects />

            ),
          },
          {
            title: (
              <div className="flex items-center justify-between">
                <h2 className="text-xl bg-red-0">Mbulimet e objektit / eve</h2>
                <ZeratModal />
              </div>
            ),
            cols: "1",
            className: "scrollArea max-h-[500px] overflow-y-auto pr-2",
            children: (
              <>
                <Zerat />
                <Zerat />
                <Zerat />
              </>
            ),
          },
        ]}
      />

    

      <div className="flex items-center ">
        <div className="border-b-2 w-full h-px border-dashed  border-esig"></div>
        <div className="cursor-pointer group border-2  w-1/2 mx-auto  py-2 text-esig   h-max border-dashed  border-esig flex items-center justify-center hover:bg-sky-50 hover:shadow-md rounded-sm   transition-all duration-200 relative">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="stroke-esig"
              width="15"
              height="15"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
            </svg>

            <span className="font-semibold">Shto ze police</span>
          </div>
        </div>
        <div className="border-b-2 w-full h-px border-dashed  border-esig"></div>
      </div>

      <Geri
        title="Historik dhe komente"
        items={[
          {
            title: "Historiku",
            cols: "1",
            children: (
              <>
                <History />
              </>
            ),
          },
          {
            title: "Dokumente & Komente",
            cols: "1",
            children: <Comments />,
          },
        ]}
      />
    </>
  );
}
