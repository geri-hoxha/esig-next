import Templates from "../Templates";

const waitingPeriods = [
  {
    id: 1,
    title: "90 DITE",
  },
  {
    id: 2,
    title: "180 DITE",
  },
  {
    id: 3,
    title: "NUK APLIKOHET (RINOVIM)",
  },
];

const riskAddress = [
  {
    id: 1,
    title: "ALBANIA / SHQIPERIA",
  },
  {
    id: 2,
    title: "EUROPE / EUROPA",
  },
];

const Others = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3>Periudha e pritjes</h3>
      <Templates items={waitingPeriods} />
      <h3>Mbulimi territorial</h3>
      <Templates items={riskAddress} />
    </div>
  );
};

export default Others;
