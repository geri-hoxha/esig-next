import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

const DriverComponent = ({ steps, options }) => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps,
      smoothScroll: true,
      popoverOffset: 30,
      stageRadius: 10,
      stagePadding: 100
    });

    driverObj.drive();
    // console.log(driver)

    //  const driver2 =   driver(options);

    //  console.log(driver2)

    // // Define the steps for the tour
    // driver2.highlight(steps);

    // // Cleanup on component unmount
    // return () => driver2.destroy();
  }, [steps, options]);

  return null;
};

const Home = () => {
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
        description: "Kur plotesoni perdoruesin, pjesemarresit e tjere plotesohen automatikisht",
        position: "bottom",
      },
    },
    {
      element: "#insuerersIntro",
      popover: {
        title: "Siguruesit",
        description: "Kur plotesoni siguruesin, plotesoni perqindjen e pronesine te cilat do te zbriten nga siguruesi lider (i pari)",
        position: "bottom",
      },
    },
    // Add more steps as needed
  ];

  const options = {
    // Add any options you want for the tour
  };

  return (
    <div>
      <DriverComponent steps={steps} options={options} />
    </div>
  );
};

export default Home;
