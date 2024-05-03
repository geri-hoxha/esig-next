'use client';

import { Config, DriveStep, State, driver as _driver } from "driver.js";
import "driver.js/dist/driver.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const steps = [
  {
    element: "#tutorial_step1",
    popover: {
      title: "Seriali i policies",
      description: "Serial plotesohet automatikisht nga sistemi",
      position: "bottom",
    },
  },
  {
    element: "#tutorial_step2",
    popover: {
      title: "Perdoruesit e polices",
      description:
        "Kur plotesoni perdoruesin, pjesemarresit e tjere plotesohen automatikisht",
      position: "bottom",
    },
  },
  {
    element: "#tutorial_step3",
    popover: {
      title: "Siguruesit",
      description:
        "Kur plotesoni siguruesin, plotesoni perqindjen e pronesine te cilat do te zbriten nga siguruesi lider (i pari)",
      position: "bottom",
    },
  },
];

const Tutorial = () => {
  const [driver, setDriver] = useState<ReturnType<typeof _driver>>();

  useEffect(() => {
    const driver: ReturnType<typeof _driver> = _driver({
      showProgress: true,
      steps,
      animate: false,
      smoothScroll: true,
      popoverOffset: 30,
      stageRadius: 10,
      stagePadding: 10,
      nextBtnText: "Hapi tjeter",
      prevBtnText: "Kthehu",
      doneBtnText: "Perfundo",
      onHighlighted: (
        element: Element | undefined,
        step: DriveStep,
        opts: {
          config: Config;
          state: State;
        }
      ) => {
        if (step.element === "#insuerersIntro") {
          window.scrollTo({
            top: document.body.scrollHeight - window.innerHeight + 70,
            behavior: "smooth",
          });
        }
      },
    } as Config);

    setDriver(driver);

    return () => driver.destroy();
  }, []);

  return (
    <div
      onClick={() => driver?.drive()}
      className="flex items-center cursor-pointer gap-1 bg hover:bg-sky-100 px-2 py-1 rounded-lg text-esig font-bold"
    >
      <Image
        className="cursor-pointer"
        src="/svg/question_blue.svg"
        alt="edit"
        width={"0"}
        height={"0"}
        style={{ width: 30, height: 20 }}
        priority
      />
      <span>Shiko manualin</span>
    </div>
  );
};

export default Tutorial;
