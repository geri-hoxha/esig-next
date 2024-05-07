import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface IProps {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const ErrorMessage: React.FC<IProps> = ({ error }) => {
  if (!error) return;

  return (
    <span className="text-esig-error text-xs absolute left-0 top-full">
      <>{error.message}</>
    </span>
  );
};

export default ErrorMessage;
