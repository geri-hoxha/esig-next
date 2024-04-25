"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import _request, { request } from "@/request";
import React from "react";
import QRCode from "react-qr-code";
import Image from "next/image";
import Base from "../admin/sale/components/Fields_v2/Base";
import { useForm, FieldErrors, UseFormRegister } from "react-hook-form";
import FormError from "../admin/sale/components/Fields_v2/FormError";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Checkbox from "../admin/sale/v3/Checkbox";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  password: z.string().min(1, "Fjalekalimi eshte i detyrueshem!"),
  username: z.string().min(1, "Emri i përdoruesit i eshte i detyrueshem!"),
  totp: z.string().min(6, "Otp i eshte i detyrueshem dhe permban 6 numra!"),
  rememberMe: z.boolean(),
});

const InvalidUsernamePasswordCombination = "InvalidUsernamePasswordCombination";

const TotpCodeInvalid = "TotpCodeInvalid";

const MfaNotSetup = "MfaNotSetup";

type Inputs = {
  username: string;
  password: string;
  totp: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const [mfaNotSetup, setMfaNotSetup] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [showNextStep, setShowNextStep] = useState(false);

  const router = useRouter();

  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      password: "",
      username: "",
      totp: "",
      rememberMe: false,
    },
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();

  const onSubmit = async () => {
    const values = getValues();

    try {
      setLoading(true);

      const valid = await trigger(
        showNextStep ? ["totp", "rememberMe"] : ["username", "password"],
        {
          shouldFocus: true,
        }
      );

      if (!valid) return;

      const _response = await request("/identity/auth/login", {
        method: "POST",
        body: values,
      });

      localStorage.setItem("token", _response.value.message);

      router.push("/admin/sale/v3");
    } catch (error: any) {
      const { value } = error;

      const { message, loginResult } = value;

      const throwError = () => {
        toast({
          variant: "destructive",
          title: message,
        });
      };

      const validationSchema: { [key: string]: (arg: boolean) => void } = {
        [InvalidUsernamePasswordCombination]: throwError,

        [TotpCodeInvalid]: (showNextStep: boolean) => {
          if (!showNextStep) return;
          throwError();
        },

        [MfaNotSetup]: () => {
          setMfaNotSetup(message);
        },
      };

      validationSchema[loginResult](showNextStep);

      if (loginResult !== InvalidUsernamePasswordCombination) {
        setShowNextStep(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 items-center justify-center  gap-8  border border-gray-300 shadow-sm  flex flex-col bg-white px-12 py-9 rounded-lg">
      <Image
        className="cursor-pointer"
        src="/logo-esig-black.svg"
        alt="edit"
        width={"0"}
        height={"0"}
        style={{ width: 170, height: "auto" }}
        priority
      />
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-gray-800 font-bold text-2xl ">
          {showNextStep ? "Verifikoni identitetin" : "Mirë se vini"}
        </span>
        <span className="text-gray-500 font-medium">
          {showNextStep
            ? "Vendos kodin tënd nga Authenticator (otp)*"
            : "Identifikohu për të vazhduar"}
        </span>
      </div>
      <form className="space-y-8 w-full">
        {showNextStep ? (
          <SecondStep
            errors={errors}
            register={register}
            mfaNotSetup={mfaNotSetup}
          />
        ) : (
          <FirstStep errors={errors} register={register} />
        )}
        <Button loading={loading} type="button" onClick={() => onSubmit()}>
          Vazhdo
        </Button>
      </form>
    </div>
  );
}

interface IStepProps {
  errors: FieldErrors<Inputs>;
  register: UseFormRegister<Inputs>;
}

const FirstStep: React.FC<IStepProps> = ({ errors, register }) => {
  return (
    <>
      <div className="relative">
        <Base label="Emri i perdoruesit" {...register("username")} />
        <FormError error={errors.username} />
      </div>
      <div className="relative">
        <Base label="Fjalekalimi" {...register("password")} />
        <FormError error={errors.password} />
      </div>
    </>
  );
};

const SecondStep: React.FC<IStepProps & { mfaNotSetup: string }> = ({
  errors,
  register,
  mfaNotSetup,
}) => {
  const otpRegistration = useMemo(() => {
    return register("totp");
  }, []);

  return (
    <>
      {mfaNotSetup && (
        <div className="border-4 rounded-xl p-2 border-esig text-center w-max mx-auto relative">
          <QRCode size={192} value={mfaNotSetup} viewBox={`0 0 256 256`} />

          <div className="absolute top-8 h-4/6 w-1.5 bg-white  -right-1.5 "></div>
          <div className="absolute top-8 h-4/6 w-1.5 bg-white  -left-1.5 "></div>
          <div className="absolute -top-1.5 w-4/6 h-1.5 bg-white  left-8 "></div>
          <div className="absolute -bottom-1.5 w-4/6 h-2 bg-white  left-8 "></div>
        </div>
      )}

      <div className="relative  w-full flex justify-center items-center">
        <InputOTP
          maxLength={6}
          {...otpRegistration}
          onInput={otpRegistration.onChange}
          onChange={undefined}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <FormError error={errors.totp} />
      </div>
      <div className="w-full flex ">
        <Checkbox
          {...register("rememberMe")}
          label={<span className=" font-medium text-black">Me mbaj mend</span>}
        />
      </div>
    </>
  );
};
