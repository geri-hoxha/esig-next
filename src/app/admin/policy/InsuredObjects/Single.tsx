import { useToast } from "@/components/ui/use-toast";
import Button from "../components/Button";
import PersonObjectModel from "../models/PersonObject";
import ObjectModal from "./ObjectModal";
import { useState } from "react";
import { CustomerModel } from "../type";
import PolicyItemController from "../context/PolicyItemController";
import { useCoreContext } from "../context";
import { ToastAction } from "@/components/ui/toast";
import { SET } from "../context/reducer";

interface IProps {
    itemIndex: number;
    object: PersonObjectModel;
}

const Single: React.FC<IProps> = ({ object, itemIndex }) => {
    const { data, dispatch } = useCoreContext();

    const [open, setOpen] = useState<boolean>(false);

    const { toast } = useToast();

    const [isHovered, setIsHovered] = useState<boolean>(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const onOkHandler = (values: CustomerModel) => {

        const controller = new PolicyItemController(data.items[itemIndex]);

        dispatch(controller.updateInsuredObject<CustomerModel>(object.customerId || '', values));
    };

    const editHandler = () => {
        setOpen(true);
    }

    const deleteHandler = () => {
        const controller = new PolicyItemController(data.items[itemIndex]);

        dispatch(controller.deleteInsuredObject(object.customerId || ''));

        toast({
            title: `Personi i siguruar: ${object.displayName} u fshi nga lista!`,
            description: "Klikoni 'Undo' nese ishte gabimisht.",
            action: (
                <ToastAction
                    className="bg-esig text-white hover:bg-esig-fluorite"
                    onClick={() => {
                        // using the power of closures
                        dispatch({
                            type: SET,
                            payload: { key: 'items', item: data.items },
                        });

                    }}
                    altText="Goto schedule to undo"
                >
                    Undo
                </ToastAction>
            ),
        });
    }

    return (
        <>
            <div
                className={`cursor-pointer group grid grid-cols-3 parent-card     hover:shadow-md rounded-xl min-h-36  transition-all duration-200 relative ${isHovered
                    ? "bg-red-50 text-esig-error"
                    : "hover:!bg-sky-50  hover:text-esig"
                    }`}
            >
                <div className=" text-sm  py-4 px-6 col-span-2">
                    <div className="font-semibold flex items-center justify-between  py-2">
                        <span className="max-w-xs truncate block">{object?.displayName}</span>
                        <span className=" ">{object?.taxNumber}</span>
                    </div>
                    <ul className="flex flex-col gap-y-2">
                        {/* <li>
                            <div className="flex items-center gap-4 ">
                                <div>Datelindja</div>
                                <div className="border-b-2 border-dotted w-full"></div>
                                <div>{object?.birthday?.format("DD/MM/YYYY")}</div>
                            </div>
                        </li> */}
                        <li>
                            <div className="flex items-center gap-4">
                                <div>Nr.Tel</div>
                                <div className="border-b-2 border-dotted w-full"></div>
                                <div>{object?.phoneNumber || "0675835032"}</div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center gap-4">
                                <div>Email</div>
                                <div className="border-b-2 border-dotted w-full"></div>

                                <div>{object?.email || "geri.hoxha@gmail.com"}</div>
                            </div>
                        </li>

                    </ul>
                    <div className="mt-4">Adresa: Rr. Medar shtylla, Tirane, 1060</div>
                </div>

                <div className="flex flex-col col-span-1 justify-center items-end">
                    <div
                        className={`flex items-center justify-between h-full rounded-bl-xl w-28  ${isHovered ? "bg-white " : ""
                            }`}
                    >
                        <div className="w-full text-center">
                            <Button variant="edit" className="!h-12" onClick={editHandler}>
                                Ndrysho
                            </Button>
                        </div>
                    </div>
                    <div className="h-full"></div>
                    <Button variant="danger"
                        className="z-10 bg-white w-28 rounded-tl-xl transition-all duration-200 hover:bg-red-50 h-1/2 flex items-center justify-center absolute bottom-0 right-0"

                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={deleteHandler}
                    >
                        Fshij
                    </Button>
                </div>
            </div>
            <ObjectModal open={open} setOpen={setOpen} onOkHandler={onOkHandler} itemIndex={itemIndex} entityId={object.customerId} />
        </>
    )
}

export default Single;