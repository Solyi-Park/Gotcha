type Props = {
  optionId?: string;
  onClick: (delta: number, optionId?: string) => void;
  quantity: number;
};
export default function QuantityAdjuster({
  optionId,
  onClick,
  quantity,
}: Props) {
  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-200"
        onClick={() => onClick(-1, optionId)}
      >
        -
      </button>
      <span className="border px-2 py-1">{quantity}</span>
      <button
        className="px-2 py-1 bg-gray-200"
        onClick={() => onClick(+1, optionId)}
      >
        +
      </button>
    </div>
  );
}
