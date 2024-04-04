interface IOption {
  id: string;
  title: string;
}

interface IProps {
  options: IOption[];
}

const RadioGroup = ({ options }: IProps) => {
  return (
    <fieldset className="">
      <legend className="sr-only">Notification method</legend>
      <form>
        <div className=" flex items-center space-x-5">
          {options.map((option) => (
            <div key={option.id} className="flex items-center cursor-pointer">
              <input
                id={option.id}
                name={option.id}
                type="radio"
                defaultChecked={option.id === "1"}
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
      </form>
    </fieldset>
  );
};

export default RadioGroup;
