type Props = {
  id: string;
  onClick: (delta: number, id?: string) => void;
  quantity?: number;
};
export default function QuantityAdjuster({ id, onClick, quantity }: Props) {
  return (
    <div>
      <button className="px-2 py-1 bg-gray-200" onClick={() => onClick(-1, id)}>
        -
      </button>
      <span className="border px-2 py-1">{quantity}</span>
      <button className="px-2 py-1 bg-gray-200" onClick={() => onClick(+1, id)}>
        +
      </button>
    </div>
  );
}
