"use client";

import FormProvider from "./context/FormProvider";
import Tutorial from "./components/Tutorial";
import Form from "./Form";
import Participants from "./Participants";
import CoreContextProvider from "./context";
import "reflect-metadata";
import Items from "./Items";
import VehicleObjectModel from "./models/VehicleObject";
import PersonObjectModel from "./models/PersonObject";
import { ClassConstructor } from "class-transformer";
import { ObjectType } from "./type";

export default function Casco() {
  return <BasePolicy id="00000000-8af4-4ae2-8620-c20298432460" />;
}

export type ObjectModelDTO = {
  obj: ClassConstructor<any>;
  objectType: ObjectType;
};

// Person
const InsuredObject = () => {
  return (

  )
}

const BasePolicy: React.FC<{ id: string }> = ({ id }) => {
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

      <Items >
      <InsuredObject />
        </Items>
    </CoreContextProvider>
  );
};
