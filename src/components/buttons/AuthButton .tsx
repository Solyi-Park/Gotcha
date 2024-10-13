import LoginIcon from "../icons/LoginIcon";
import LogoutIcon from "../icons/LogoutIcon";

type Props = {
  text: string;
  onClick: () => void;
};

export default function AuthButton({ text, onClick }: Props) {
  return (
    <button className="flex items-center justify-center" onClick={onClick}>
      <span className="hidden sm:inline text-xs">{text}</span>
      <span className=" sm:hidden ">
        {text === "LOGIN" ? (
          <LoginIcon size="small" />
        ) : (
          <LogoutIcon size="small" />
        )}
      </span>
    </button>
  );
}
