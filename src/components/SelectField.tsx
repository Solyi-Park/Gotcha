import { AppProps } from "next/dist/shared/lib/router/router";
import { ChangeEvent, SelectHTMLAttributes } from "react";

type Props = {
  label: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>;

export default function SelectField({
  label,
  id,
  value,
  onChange,
  disabled,
  options,
}: Props) {
  return (
    <label className="text-gray-500" htmlFor={id}>
      {label}
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="">{label}선택</option>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
