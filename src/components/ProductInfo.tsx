import Image from "next/image";

type Props = {
  imageUrls: string[] | null;
};
export default function ProductDetailInfo({ imageUrls }: Props) {
  return (
    <section className="my-10 py-5 border-t">
      {imageUrls &&
        imageUrls.length > 0 &&
        imageUrls.map((url) => (
          <div key={url} className="relative w-96 h-96">
            <Image src={url} alt="product image" fill priority />
          </div>
        ))}
    </section>
  );
}
