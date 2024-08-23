import { ChangeEvent } from "react";

type Props = {
  label: string;
  id: string;
  type?: string;
  setState: (state: File[]) => void;
};

export default function FileInputField({
  label,
  id,
  type = "file",
  setState,
}: Props) {
  return (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        onChange={(e) => {
          const selectedFiles = e.target.files;
          if (selectedFiles) {
            const filesArray = Array.from(e.target.files!);
            setState(filesArray);
          }
        }}
        multiple
        // multiple 옵션으로 이미지를 선택하면 기존에 선택한 이미지는 그대로 있고 새로 추가됨
        // 선택된 이미지 확인 및 삭제 가능하도록 리팩토링 해야함
        required
      />
    </label>
  );
}
