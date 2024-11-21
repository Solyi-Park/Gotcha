import AngleRightIcon from "./icons/AngleRightIcon";

type Props = {
  large: string | null;
  medium: string | null;
  small: string | null;
};
export default function CategoryPath({ large, medium, small }: Props) {
  return (
    <p>
      {large && <span>{large}</span>}
      {medium && (
        <span>
          <AngleRightIcon />
          {medium}
        </span>
      )}
      {small && (
        <span>
          <AngleRightIcon />
          {small}
        </span>
      )}
    </p>
  );
}
