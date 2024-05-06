import { ReactNode } from "react";

interface IProps {
    id: string;
    name: string;
    children: ReactNode;
    defaultChecked: boolean;
    value: string | number;
}

const Radio: React.FC<Partial<IProps>> = ({ id, name, children, value, defaultChecked = false }) => {
    return (
        <div className="flex items-center cursor-pointer">
            <input
                id={id}
                name={name}
                type="radio"
                value={value}
                defaultChecked={defaultChecked}
                className="h-4 w-4 border-gray-300 text-esig focus:ring-esig "
            />
            {
                children &&
                <label
                    htmlFor={id}
                    className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                    {children}
                </label>
            }

        </div>
    );
};

export default Radio;
