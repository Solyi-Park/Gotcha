import AngleRightIcon from "./icons/AngleRightIcon";

type Props = {
  large: string | null;
  medium: string | null;
  small: string | null;
};
export default function CategoryPath({ large, medium, small }: Props) {
  return (
    <div className="flex text-sm font-semibold">
      {large && (
        <div className="flex items-center">
          <span>{large}</span>
          <AngleRightIcon />
        </div>
      )}
      {medium && (
        <div className="flex items-center">
          <span>{medium}</span>
          <AngleRightIcon />
        </div>
      )}
      {small && <span>{small}</span>}
    </div>
  );
}
