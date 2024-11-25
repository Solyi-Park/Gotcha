import AngleRightIcon from "./icons/AngleRightIcon";

type Props = {
  large: string | null;
  medium: string | null;
  small: string | null;
};
export default function CategoryPath({ large, medium, small }: Props) {
  return (
    <div className="flex">
      {large && <span>{large}</span>}
      {medium && (
        <div className="flex items-center">
          <AngleRightIcon />
          {medium}
        </div>
      )}
      {small && (
        <div className="flex items-center">
          <AngleRightIcon />
          {small}
        </div>
      )}
    </div>
  );
}
