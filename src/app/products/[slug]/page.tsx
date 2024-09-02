export default function ProductPage({ params }: { params: { slug: string } }) {
  console.log("slug", params.slug);
  return <div>{params.slug}</div>;
}
