import { ReactNode } from "react";

interface IProps {
  label: ReactNode;
}

const Checkbox: React.FC<IProps> = ({ label }) => {
  return (
    <fieldset>
      <legend className="sr-only"></legend>
      <div className="relative flex items-center">
        <div className="flex h-6 items-center">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-esig focus:ring-esig"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor="comments" className="font-medium text-gray-900">
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
