import { useState } from "react";
import Cards, { EmptyCard } from "../Cards";
import Modal from "@/components/esig/Modal";
import CustomerModal from "../CustomerModal";

const InsuredObjects =() => {
    const [objects, setObjects] = useState([{}]);

    const onSave = (values) => {
        setObjects([...objects, values])
    }
    return (
        <>
            {objects.map((object) => {
                if(!object.id) {
                    return (

                        <Modal
                        title="Modali i objekteve te siguruara"
                        description="Ketu mund te modikoni klientin e perzgjedhur."
                        body={<CustomerModal onSave={onSave} />}
                        noButtons
                      >
                                                <EmptyCard />

                      </Modal>
                    )
                }
                return (
                    <Cards object={object} objects={objects} setObjects={setObjects} />
                )
            })}
        </>
    )
}

export default InsuredObjects;