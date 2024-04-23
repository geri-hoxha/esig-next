import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  IContext,
  IRule,
  ISaleContext,
  ParticipantsLimits,
  defaultRules,
  useSale,
} from "@/context/SaleContext";

const titleMapper: { [key: string]: string } = {
  policyUsers: "I Siguruari",
  beneficiaries: "Perfituesit",
  policyHolders: "Mbajtesit e polices",
  insurers: "Siguruesit",
  invoiceRecipients: "Faturuesit",
};

// Define the type for a single field
interface Field {
  name: string;
  min: string;
  max: string;
}

// Define the type for the form's data structure
interface FormValues {
  fields: Field[];
}

const LimitsAsker: React.FC = () => {
  const { setRules }: IContext = useSale();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const form = useForm<FormValues>({
    defaultValues: {
      fields: [
        { name: "policyUsers", min: "1", max: "1" },
        { name: "beneficiaries", min: "1", max: "1" },
        { name: "policyHolders", min: "1", max: "1" },
        { name: "insurers", min: "1", max: "1" },
        { name: "invoiceRecipients", min: "1", max: "1" },
      ],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "fields",
  });

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    const { fields } = values;

    const rules: IRule = defaultRules;

    fields.forEach((field) => {
      rules[field.name as keyof ISaleContext] = {
        min: Number(field.min),
        max: Number(field.max),
      } as ParticipantsLimits;
    });

    setRules(rules);

    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(arg) => {
          setOpen(arg);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Percakto limitet e pjesemarresve</DialogTitle>
            <DialogDescription>
              Ky funksionalitet eshte vetem per testim, sa te dale API
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full mt-5"
            >
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="flex items-center justify-between"
                  >
                    <span className="font-semibold">
                      {titleMapper[field.name ?? ""]}:
                    </span>
                    <div className="flex items-center gap-x-2">
                      <Controller
                        name={`fields.${index}.min` as const} // Change to dot notation and use 'as const'
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Min"
                            className="w-24 h-7"
                          />
                        )}
                      />
                      <Controller
                        name={`fields.${index}.max` as const} // Change to dot notation and use 'as const'
                        control={form.control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Max"
                            className="w-24 h-7"
                          />
                        )}
                      />
                    </div>
                  </div>
                );
              })}
              <div className="w-full text-right">
                <Button type="submit" className="w-1/3">
                  Ruaj dhe apliko
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LimitsAsker;
