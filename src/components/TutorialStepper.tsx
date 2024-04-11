import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

const DriverComponent = ({ steps, options }) => {
  useEffect(() => {
    const driverObj = driver({
      showProgress: true,
      steps,
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
      element: "#first-step",
      popover: {
        title: "Title on Popover",
        description: "Description on the Popover",
        position: "bottom",
      },
    },
    {
      element: "#first-step2",
      popover: {
        title: "Title on Popover",
        description: "Description on the Popover",
        position: "bottom",
      },
    },
    {
      element: "#first-step3",
      popover: {
        title: "Title on Popover",
        description: "Description on the Popover",
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
      <h1 id="first-step">Welcome to the tour</h1>
      <h1 id="first-step2">Welcome to the tour</h1>
      <h1 id="first-step3">Welcome to the tour</h1>

      <DriverComponent steps={steps} options={options} />
    </div>
  );
};

export default Home;
