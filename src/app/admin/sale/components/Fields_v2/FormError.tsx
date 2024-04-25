import { FieldError, FieldErrors } from "react-hook-form";

interface IProps {
  error: FieldError | undefined;
}

const FormError: React.FC<IProps> = ({ error }) => {
  if (!error) return;

  return <span className="text-esig-error text-xs absolute left-0 top-full">{error.message}</span>;
};

export default FormError;
