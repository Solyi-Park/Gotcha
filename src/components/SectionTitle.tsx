type Props = {
  title: string;
};

export default function SectionTitle({ title }: Props) {
  return (
    <h3 className="text-center sm:flex justify-start pb-4 text-lg sm:text-2xl font-semibold border-b-4 border-black">
      {title}
    </h3>
  );
}
