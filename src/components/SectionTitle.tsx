type Props = {
  title: string;
  description?: string;
};

export default function SectionTitle({ title, description }: Props) {
  return (
    <>
      {description ? (
        <div className="flex flex-col sm:flex-row w-full my-2 border-b-4 border-black gap-2 pb-4 items-center sm:items-end">
          <h3 className="text-center sm:flex justify-start text-lg sm:text-2xl font-semibold">
            {title}
          </h3>
          <span className="text-sm">{description}</span>
        </div>
      ) : (
        <h3 className="text-center sm:flex my-2 justify-start text-lg sm:text-2xl pb-4  border-black font-semibold border-b-4">
          {title}
        </h3>
      )}
    </>
  );
}
