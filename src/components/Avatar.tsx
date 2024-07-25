type Props = {
  image?: string | null;
};
export default function Avatar({ image }: Props) {
  console.log("avatar-image:", image);
  return (
    <div className="relative w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
      <img src={image ?? "/images/avatarDefualtImage.webp"} alt="user avatar" />
    </div>
  );
}
