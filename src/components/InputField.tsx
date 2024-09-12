import { ChangeEvent, InputHTMLAttributes } from "react";

type Props = {
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  id,
  ...props
}: Props) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        value={value}
        onChange={onChange}
        className="border"
        type={type}
        id={id}
        {...props}
      />
    </label>
  );
}
