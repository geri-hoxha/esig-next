"use client";

import { ReactNode, useEffect, useState } from "react";
import History from "./History";
import Comments from "./Comments";
import { removeQueryParam } from "./components/PolicyUsers";
import GeneralFields from "./components/GeneralFields";
import DatesFields from "./components/DatesFields";
import ParticipantsWrapper from "./components/ParticipantsWrapper";
import ZeratWrapper from "./components/ZeratWrapper";
import Insurers from "./components/Insurers";
import Others from "./components/Others";
import TutorialStepper from "@/components/TutorialStepper";
import Home from "@/components/TutorialStepper";
import SaleFooter from "./components/SaleFooter";

interface IProps {
  title: ReactNode;
  items: {
    title: ReactNode;
    children: ReactNode;
    cols?: string;
    className?: string;
  }[];
}

export const Geri: React.FC<Partial<IProps>> = ({ title, items = [] }) => {
  return (
    <div className="flex flex-col gap-4">
      {typeof title === "string" ? (
        <h2 className="text-xl md:text-2xl">{title}</h2>
      ) : (
        title
      )}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8`}>
        {items.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-4">
              {typeof item.title === "string" ? (
                <h3 className="text-lg md:text-xl">{item.title}</h3>
              ) : (
                item.title
              )}
              <div
                className={`grid grid-cols-1  md:grid-cols-${
                  item?.cols ?? "2"
                } gap-4 ${item.className ?? ""}`}
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

export const ButtonGeri: React.FC<{
  children: ReactNode;
  className: string;
  onClick?: any;
}> = ({ children, className, onClick, ...props }) => {
  return (
    <button
      className={`w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none transition-all duration-100 ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center gap-x-1">{children}</div>
    </button>
  );
};

export default function Sale() {
  const [baseUsers, setBaseUsers] = useState([]);

  useEffect(() => {
    removeQueryParam("id");
  }, []);

  return (
    <>
      <Home />
      <div className="flex flex-col  justify-center">
        <h1 className="text-2xl md:text-3xl font-bold w-max">
          Shitje produkti TPL
        </h1>
        <span className="text-gray-600 text-lg md:text-xl">
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

      <ParticipantsWrapper />

      <ZeratWrapper />

      <Geri
        title="Siguruesit dhe te tjera"
        items={[
          {
            title: "Siguruesit",
            cols: "1",
            children: (
              <>
                <Insurers />
              </>
            ),
          },
          {
            title: "Te tjera",
            cols: "1",
            children: <Others />,
          },
        ]}
      />

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

      <SaleFooter />
    </>
  );
}
