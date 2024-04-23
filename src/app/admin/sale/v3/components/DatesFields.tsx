import Base from "../../components/Fields_v2/Base";

const DatesFields = () => {
    return (
        <>
            <Base
                className="bg-red-0"
                type="date"
                label="Data e fillimit"
                name="serial"
            />
            <Base
                className="bg-red-0"
                type="date"
                label="Data e perfundimit"
                name="serial"
            />
            <Base
                className="bg-red-0"
                type="date"
                label="Data e leshimit"
                name="serial"
            />
            <Base
                className="bg-red-0"
                type="date"
                label="Data retroaktive"
                name="serial"
            />
        </>
    )
}

export default DatesFields;