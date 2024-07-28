type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  return (
    <div className="relative w-7 h-7 rounded-full bg-gray-200 overflow-hidden">
      <img src={image ?? "/images/avatarDefualtImage.webp"} alt="user avatar" />
    </div>
  );
}
