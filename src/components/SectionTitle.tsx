type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <h3 className="pb-4 text-2xl font-semibold border-b-4 border-black">
      {title}
    </h3>
  );
}