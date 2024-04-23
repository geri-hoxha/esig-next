import { ReactNode } from "react";

interface IProps {
  label: ReactNode;
  defaultChecked?: boolean;
  name?: string;
  onChange?: any
}

function generateRandomString(length: number) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Checkbox: React.FC<IProps> = ({ label ,onChange, defaultChecked = false, name = generateRandomString(10)}) => {
  return (
    <fieldset>
      <legend className="sr-only"></legend>
      <div className="relative flex items-center">
        <div className="flex h-6 items-center">
          <input
            id={name}
            aria-describedby="comments-description"
            name={name}
            type="checkbox"
            defaultChecked={defaultChecked}
            onClick={onChange}
            className="h-4 w-4 rounded border-gray-300 text-esig focus:ring-esig"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={name} className="font-medium text-gray-900">
            {label}
          </label>
          {/* <p id="comments-description" className="text-gray-500">
                    </p> */}
        </div>
      </div>
    </fieldset>
  );
};

export default Checkbox;
