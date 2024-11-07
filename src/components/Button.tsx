type Color = "black" | "white";
type Props = {
  color?: Color;
  text: string;
  isVisible?: boolean;
};

export default function Button({
  color = "white",
  text,
  isVisible = true,
}: Props) {
  return (
    <button
      className={`rounded-sm text-xs  p-2 w-16 h-8 ${getButtonStyle(color)} ${
        isVisible ? "block" : "hidden"
      }`}
      type="button"
    >
      {text}
    </button>
  );
}

function getButtonStyle(color: Color) {
  switch (color) {
    case "black":
      return "bg-black text-white border-white";
    case "white":
      return "bg-white text-gray-600 border";
  }
}
