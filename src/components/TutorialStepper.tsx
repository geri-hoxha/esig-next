import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home = () => {
  const [driverObj, setDriverObj] = useState<any>(null);

  const steps = [
    {
      element: "#baseSerial",
      popover: {
        title: "Seriali i policies",
        description: "Serial plotesohet automatikisht nga sistemi",
        position: "bottom",
      },
    },
    {
      element: "#policyUsersIntro",
      popover: {
        title: "Perdoruesit e polices",
        description:
          "Kur plotesoni perdoruesin, pjesemarresit e tjere plotesohen automatikisht",
        position: "bottom",
      },
    },
    {
      element: "#insuerersIntro",
      popover: {
        title: "Siguruesit",
        description:
          "Kur plotesoni siguruesin, plotesoni perqindjen e pronesine te cilat do te zbriten nga siguruesi lider (i pari)",
        position: "bottom",
      },
    },
  ];

  const options = {};

  useEffect(() => {
    const driverObj = driver({
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
    });

    setDriverObj(driverObj);

    // driverObj.drive(options);

    // // Define the steps for the tour
    // driver2.highlight(steps);

    // // Cleanup on component unmount
    return () => driverObj.destroy();
  }, []);

  return (
    <div onClick={() => driverObj.drive()} className="flex items-center cursor-pointer gap-1 bg hover:bg-sky-100 px-2 py-1 rounded-lg text-esig font-bold">
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

export default Home;
