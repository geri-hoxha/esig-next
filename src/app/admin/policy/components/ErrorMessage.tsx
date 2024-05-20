import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

interface IProps {
  error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
}

const ErrorMessage: React.FC<IProps> = ({ error }) => {
  if (!error) return;

  return (
    <span className="text-esig-error text-xs   left-0 top-full mb-4">
      <>{error.message}</>
    </span>
  );
};

export default ErrorMessage;
