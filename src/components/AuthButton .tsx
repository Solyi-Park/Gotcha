type Props = {
  text: string;
  onClick?: () => void;
};

export default function AuthButton({ text, onClick }: Props) {
  return <button onClick={onClick}>{text}</button>;
}
