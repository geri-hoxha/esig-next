import { useState } from "react";
import Modal from "@/components/esig/Modal";
import Empty from "./Empty";
import { useCoreContext } from "../../context";

const InsuredObjects = ({itemIndex}: {itemIndex: number}) => {
  const { data, dispatch } = useCoreContext();

  return <Empty itemIndex={itemIndex} />;
  if (data.items.length === 0) {
    return <Empty />;
  }

  return (
    <>
      test
      {/* {objects.map((object) => {
        return (
          <Cards object={object} objects={objects} setObjects={setObjects} />
        );
      })} */}
    </>
  );
};

export default InsuredObjects;
