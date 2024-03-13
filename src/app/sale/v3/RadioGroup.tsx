interface IOption {
  id: string;
  title: string;
}

interface IProps {
  options: IOption[];
}

const RadioGroup = ({ options }: IProps) => {
  return (
    <fieldset className="mt-4">
      <legend className="sr-only">Notification method</legend>
      <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
        {options.map((option) => (
          <div key={option.id} className="flex items-center cursor-pointer">
            <input
              id={option.id}
              name="notification-method"
              type="radio"
              defaultChecked={option.id === "email"}
              className="h-4 w-4 border-gray-300 text-esig focus:ring-esig "
            />
            <label
              htmlFor={option.id}
              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
            >
              {option.title}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
