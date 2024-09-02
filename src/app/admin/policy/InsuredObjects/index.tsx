import { useCoreContext } from "../context";
import Single from "./Single";

const InsuredObjects = ({ itemIndex }: { itemIndex: number }) => {
    const { data } = useCoreContext();

    return (
        <>
            {
                data.items[itemIndex].insuredObjects.map((insuredObject) => {
                    return <Single key={insuredObject.id} object={insuredObject.object} itemIndex={itemIndex} />
                })
            }
        </>
    )
}

export default InsuredObjects;