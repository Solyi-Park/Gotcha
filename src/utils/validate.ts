type ValidationResult = string | null;

export const validate = {
  name: (text: string): ValidationResult => {
    const regex = /^[a-zA-Z0-9가-힣]{1,10}$/;
    if (text.length < 2) return "이름은 2글자 이상이어야 합니다.";
    if (text.length > 10) return "이름은 최대 10자까지 입력 할 수 있습니다.";
    if (!regex.test(text))
      return "이름에는 특수문자나 공백이 포함될 수 없습니다.";

    return null;
  },
  email: (text: string): ValidationResult => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(text)) return "이메일 형식이 유효하지 않습니다.";

    return null;
  },
  password: (password: string): ValidationResult => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    if (!regex.test(password))
      return "비밀번호는 숫자와 특수문자를 포함해야 하며, 최소 8자 이상이어야 합니다.";

    return null;
  },
  confirmPassword: (
    password: string | undefined,
    confirmPass: string
  ): ValidationResult => {
    if (confirmPass !== undefined && password !== confirmPass)
      return "비밀번호가 일치하지 않습니다.";

    return null;
  },
  file: (fileName: string) => {
    const regex = /^[a-zA-Z0-9._\-\(\)\,\!\&\+\= ]+$/;
    return regex.test(fileName);
  },
};
