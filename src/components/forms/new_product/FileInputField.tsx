import { validate } from "@/utils/validate";
import { ChangeEvent, useRef } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <label htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        onChange={(e) => {
          const selectedFiles = Array.from(e.target.files!);

          const invalidateFiles = selectedFiles.filter(
            (file) => !validate.file(file.name.split(".")[0])
          );
          if (invalidateFiles.length > 0) {
            alert(
              "파일 이름에는 영문 대소문자, 숫자, 그리고 다음 특수 문자만 사용할 수 있습니다: 공백, ., -, _, (), ,, !, &, +, = "
            );
            setState([]);

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }
          } else {
            setState(selectedFiles);
          }
        }}
        ref={fileInputRef}
        multiple
        // multiple 옵션으로 이미지를 선택하면 기존에 선택한 이미지는 그대로 있고 새로 추가됨
        // TODO: 선택된 이미지 확인 및 삭제 가능하도록 리팩토링 해야함
        required
      />
    </label>
  );
}
