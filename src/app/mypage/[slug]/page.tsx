type Props = {
  params: { slug: string };
};

export default function MyPageContent({ params: { slug } }: Props) {
  return <div>MyPageContent: {slug}</div>;
}
