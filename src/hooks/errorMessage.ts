import { validate } from "@/utils/validate";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function useErrorMessage({
  name,
  email,
  password,
  confirmPassword,
}: Props) {
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  useEffect(() => {
    setNameError(name ? validate.name(name) : null);
    setEmailError(email ? validate.email(email) : null);
    setPasswordError(password ? validate.password(password) : null);
    setConfirmPasswordError(
      confirmPassword
        ? validate.confirmPassword(password, confirmPassword)
        : null
    );
  }, [name, email, password, confirmPassword]);

  return {
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    setEmailError,
  };
}
