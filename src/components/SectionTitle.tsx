type Props = {
  title: string;
  description?: string;
};

export default function SectionTitle({ title, description }: Props) {
  return (
    <div className="flex flex-col sm:flex-row w-full my-2 border-b-4 border-black gap-2 pb-4 items-start">
      <h3 className="text-lg sm:text-2xl font-semibold">{title}</h3>
      {description && (
        <span className="text-sm sm:ml-2 sm:self-end">{description}</span>
      )}
    </div>
  );
}
