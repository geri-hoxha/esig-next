import FormProvider from "./context/FormProvider";
import Tutorial from "./components/Tutorial";
import Form from "./Form";
import Participants from "./Participants";
import CoreContextProvider from "./context";
import "reflect-metadata";
import Items from "./Items";

export default function Casco() {
  return <BasePolicy id="00000000-8af4-4ae2-8620-c20298432460" />;
}

const BasePolicy: React.FC<{ id: string }> = ({ id }) => {
  return (
    <CoreContextProvider id={id}>
      <div className="flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold w-max">
            Shitje produkti KASKO
          </h1>
          <span className="text-gray-600 text-lg md:text-xl">
            Sigurimi i detyrueshem qe mbulon palet e treta ne rast aksidenti
          </span>
        </div>
        <Tutorial />
      </div>

      <FormProvider>
        <Form />
      </FormProvider>

      <Participants />

      {/* <Items /> */}
      
    </CoreContextProvider>
  );
};
