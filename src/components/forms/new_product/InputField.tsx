import { ChangeEvent, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  id: string;
  style?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  id,
  style: css,
  ...props
}: Props) {
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        {...props}
        className={`border px-2 ${css && css}`}
      />
    </div>
  );
}
