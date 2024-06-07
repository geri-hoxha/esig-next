import FormProvider from "./context/FormProvider";
import Tutorial from "./components/Tutorial";
import Form from "./Form";
import Participants from "./Participants";
import CoreContextProvider from "./context";
import 'reflect-metadata';

export default function Policy() {
  return (
    <CoreContextProvider>
      <div className="flex items-start justify-between">
        <div className="flex flex-col  justify-center">
          <h1 className="text-2xl md:text-3xl font-bold w-max">
            Shitje produkti TPL
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

    </CoreContextProvider>
  );
}
