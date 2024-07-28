import AuthIcon from "./icons/\bAuthIcon";

type Props = {
  text: string;
  onClick?: () => void;
};

export default function AuthButton({ text, onClick }: Props) {
  return (
    <button className="flex items-center justify-center" onClick={onClick}>
      <span className="hidden sm:inline">{text}</span>
      <span className=" sm:hidden text-2xl mr-2 sm:mr-0">
        <AuthIcon text={text === "로그인" ? "로그인" : "로그아웃"} />
      </span>
    </button>
  );
}
