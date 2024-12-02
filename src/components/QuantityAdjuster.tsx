type Props = {
  id: string;
  onClick: (delta: number, id?: string) => void;
  quantity?: number;
};
export default function QuantityAdjuster({ id, onClick, quantity }: Props) {
  return (
    <div className="flex">
      <button
        className="px-3 py-1 bg-white border-y border-l"
        onClick={() => onClick(-1, id)}
      >
        -
      </button>
      <span className="border px-3 py-1">{quantity}</span>
      <button
        className="px-3 py-1 bg-white border-y border-r"
        onClick={() => onClick(+1, id)}
      >
        +
      </button>
    </div>
  );
}
