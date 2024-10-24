import { ChangeEvent, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
  name?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "number";
  id?: string;
  style?: string;
  defaultValue?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  id,
  style,
  defaultValue,
  ...props
}: Props) {
  return (
    <div className="flex">
      {!name && label && (
        <label className="w-32" htmlFor={id}>
          {label}
        </label>
      )}
      {label && <h2 className="w-32">{label}</h2>}
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        id={id}
        {...props}
        defaultValue={defaultValue}
        className={`border px-2 ${style && style}`}
      />
    </div>
  );
}
