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
          {" > "}
          {medium}
        </span>
      )}
      {small && (
        <span>
          {" > "}
          {small}
        </span>
      )}
    </p>
  );
}
