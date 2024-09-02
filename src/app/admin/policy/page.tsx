"use client";

import FormProvider from "./context/FormProvider";
import Tutorial from "./components/Tutorial";
import Form from "./Form";
import Participants from "./Participants";
import CoreContextProvider from "./context";
import "reflect-metadata";
import Items from "./Items";
import PersonObjectModel from "./models/PersonObject";
import { ClassConstructor } from "class-transformer";
import { ObjectType } from "./type";
import InsuredObjects from "./InsuredObjects";
import { ISectionItemProps } from "./Section";
import AddObject from "./InsuredObjects/AddObject";

export type ObjectModelDTO = {
  obj: ClassConstructor<any>;
  objectType: ObjectType;
};

export default function PrivateHealth() {
  return (
    <BasePolicy id="00000000-8af4-4ae2-8620-c20298432460">
      {(itemIndex) => {
        return {
          title: (
            <div className="flex items-center">
              <span className="text-xl">Objektet e siguruara</span>
              <AddObject itemIndex={itemIndex} />
            </div>
          ),
          cols: "1",
          className: "scrollArea max-h-[500px] overflow-y-auto pr-2 pb-2",
          children: <InsuredObjects itemIndex={itemIndex} />,
        };
      }}
    </BasePolicy>
  );
}

const BasePolicy: React.FC<{
  id: string;
  children: (itemIndex: number) => ISectionItemProps;
}> = ({ id, children }) => {
  return (
    <CoreContextProvider<PersonObjectModel>
      id={id}
      objectModelDTO={{
        obj: PersonObjectModel,
        objectType: "Person",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold w-max">
            Shitje produkti <span className="text-esig">SHENDETI PRIVAT</span>
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
      <Items>{(itemIndex) => children(itemIndex)}</Items>
    </CoreContextProvider>
  );
};
