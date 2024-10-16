import { FullUser } from "@/model/user";

type Props = {
  user: FullUser;
};
export default function EditUserInfo({ user }: Props) {
  console.log("user", user);
  // 사용자의 주소정보 설정, 테이블
  return <div></div>;
}
