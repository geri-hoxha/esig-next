"use client";

import Base from "../components/Fields_v2/Base";
import Image from "next/image";
import Zerat from "./Zerat";
import { ReactNode, useState } from "react";
import Cards from "./Cards";
import History from "./History";
import Comments from "./Comments";
import Modal from "@/components/esig/Modal";
import CustomerModal from "./CustomerModal";
import CustomerDonut from "./CustomerDonut";

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
                className={`grid grid-cols-${item?.cols ?? "2"} gap-4 ${
                  item.className ?? ""
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

const Toggle = () => {
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
  return (
    <>
      <h1 className="text-3xl font-bold border-b-4 border-dashed w-max border-sky-400">
        Shitje produkti <span className="text-sky-600">MTPL</span>
      </h1>

      <Geri
        items={[
          {
            title: "Te pergjithme",
            children: (
              <>
                <Base className="bg-red-0" label="Serial" name="serial" />
                <Base
                  className="bg-red-0"
                  type="select"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  }
                  label="Monedha"
                  name="serial"
                />
                <Base
                  className="bg-red-0"
                  label="Lloji i pageses"
                  name="serial"
                />
                {/* <Base className="bg-red-0" label="Kanali i shperndarjes" name="serial" /> */}
              </>
            ),
          },
          {
            title: "Data",
            children: (
              <>
                <Base
                  className="bg-red-0"
                  type="date"
                  label="Data e fillimit"
                  name="serial"
                />
                <Base
                  className="bg-red-0"
                  type="date"
                  label="Data e perfundimit"
                  name="serial"
                />
                <Base
                  className="bg-red-0"
                  type="date"
                  label="Data e leshimit"
                  name="serial"
                />
                <Base
                  className="bg-red-0"
                  type="date"
                  label="Data retroaktive"
                  name="serial"
                />
              </>
            ),
          },
        ]}
      />
      <Geri
        items={[
          {
            cols: "1",
            title: "Perdoruesit e polices",
            children: (
              <>
                <div className="flex items-center">
                  <Base className="bg-red-0" label="Lideri *" name="serial" />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
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
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Base
                    className="bg-red-0"
                    label="Perdoruesi 2"
                    name="serial"
                  />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
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
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          src="/svg/close.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Fshij</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <Base
                    className="bg-red-0"
                    label="Perdoruesi 3"
                    name="serial"
                  />
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig hover:bg-sky-50 transition-all duration-100">
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
                        <span>Zgjidh</span>
                      </div>
                    </button>
                  </div>
                  <div>
                    <button className="w-max px-1.5 py-1 text-sm rounded-md  bg-transparent border-none text-esig-error hover:bg-red-50 transition-all duration-100">
                      <div className="flex items-center gap-x-1">
                        <Image
                          src="/svg/close.svg"
                          alt="edit"
                          width={"0"}
                          height={"0"}
                          style={{ width: 20, height: 20 }}
                          priority
                        />
                        <span>Fshij</span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <Modal
                    title="Modali i pjesemarresve"
                    description="Ketu mund te modikoni klientin e perzgjedhur."
                    body={<CustomerModal />}
                    noButtons
                  >
                    <ButtonGeri className="text-esig hover:bg-sky-50 !text-base !w-full">
                      <div className="flex items-center gap-x-1 mx-auto">
                        <svg
                          className="stroke-esig"
                          width="14"
                          height="14"
                          xmlns="http://www.w3.org/2000/svg"
                          fillRule="evenodd"
                          clipRule="evenodd"
                        >
                          <path d="M6 6v-6h1v6h6v1h-6v6h-1v-6h-6v-1h6z" />
                        </svg>
                        <span>Shto perdorues tjeter</span>
                      </div>
                    </ButtonGeri>
                  </Modal>
                </div>
              </>
            ),
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
                  <Toggle />- Erin Hoxha, 100%
                </div>

                <div className="flex flex-col min-w-60">
                  <div className="flex items-center text-lg font-semibold text-gray-700">
                    Perfituesit
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
                    <li>* Erin Hoxha, 34%</li>
                    <li>- Geri Hoxha, 33%</li>
                    <li>- Oltion Driza, 33%</li>
                  </ul>
                </div>

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
                    <li>* Geri Hoxha, 77%</li>
                    <li>- Kledi Kallastra, 33%</li>
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
              <>
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                <Cards />
              </>
            ),
          },
          {
            title: (
              <div className="flex items-center justify-between">
                <h2 className="text-xl bg-red-0">Mbulimet e objektit / eve</h2>
                <ButtonGeri className="text-esig hover:bg-sky-50">
                  <div className="flex items-center gap-x-1 text-lg">
                    <Image
                      className="cursor-pointer"
                      src="/svg/edit.svg"
                      alt="edit"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 20 }}
                      priority
                    />
                    <span>Modifiko mbulimet</span>
                  </div>
                </ButtonGeri>
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

      <Geri
        title="Zerat e polices ( zeri 1 )"
        items={[
          {
            className:
              "scrollArea max-h-[500px] overflow-y-auto pr-2 divide-x divide-y",
            title: "Objektet e siguruara",
            children: (
              <>
                <Cards />
              </>
            ),
          },
          {
            title: (
              <div className="flex items-center justify-between">
                <h2 className="text-xl bg-red-0">Mbulimet e objektit / eve</h2>
                <ButtonGeri className="text-esig hover:bg-sky-50">
                  <div className="flex items-center gap-x-1 text-lg">
                    <Image
                      className="cursor-pointer"
                      src="/svg/edit.svg"
                      alt="edit"
                      width={"0"}
                      height={"0"}
                      style={{ width: 20, height: 20 }}
                      priority
                    />
                    <span>Modiko mbulimet</span>
                  </div>
                </ButtonGeri>
              </div>
            ),
            cols: "1",
            children: (
              <>
                <Zerat />
              </>
            ),
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
            title: "Komente",
            cols: "1",
            children: <Comments />,
          },
        ]}
      />
    </>
  );
}
