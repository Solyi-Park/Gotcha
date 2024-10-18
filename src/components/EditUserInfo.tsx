"use client";
import { PROVIDER_LOGOS } from "@/constants/provider";
import { usePasswordCheck } from "@/hooks/password";
import { FullUser } from "@/model/user";
import { maskEmail, maskName, maskPhoneNumber } from "@/utils/maskPersonalInfo";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  user: FullUser;
};

async function changePassword(newPassword: string) {
  try {
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    });
    if (!response.ok) {
      throw new Error("비밀번호 변경에 실패하였습니다.");
    }
    return true;
  } catch (error) {
    console.error(error);
  }
}

export default function EditUserInfo({ user }: Props) {
  console.log("user", user);
  const { name, phone, email, password, address, provider, id } = user;
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();

  const { checkPassword, error: checkPasswordError } = usePasswordCheck();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  //TODO: 패스워드 체크 반복.
  const handleChangePassword = async () => {
    const isValid = await checkPassword(email || "", currentPassword || "");
    if (!isValid) {
      alert("현재 비밀번호를 정확히 입력해주세요.");
      return;
    }
    if (
      newPassword.length < 8 ||
      confirmPassword.length < 8 ||
      newPassword.length > 20 ||
      confirmPassword.length > 20
    ) {
      alert(
        "새로운 비밀번호는 8~20자 이내의 영문 대소문자, 특수문자, 숫자의 조합으로 이루어져야 합니다."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    const success = await changePassword(newPassword);
    if (success) {
      alert("비밀번호가 정상적으로 변경되었습니다. 다시 로그인해주세요.");
      signOut();
    }
  };

  return (
    <section>
      <h2 className="text-xl">회원정보 수정</h2>
      <fieldset>
        <legend className="hidden">회원정보 수정 양식 작성</legend>
        <ul>
          <li>
            <h3 className="font-bold">로그인 정보</h3>
            {!provider && (
              <div>
                <div>
                  <p>아이디(이메일)</p>
                  <p>{maskEmail(email || "")}</p>
                </div>
                <div className="relative">
                  <p>비밀번호</p>
                  <div className={`${isEditing ? "hidden" : "block"}`}>
                    <p>*********</p>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="absolute right-0  top-0 py-2 px-5 border"
                    >
                      변경
                    </button>
                  </div>
                  <div className={`${isEditing ? "block" : "hidden"}`}>
                    <form className="flex flex-col" onSubmit={() => {}}>
                      <div>
                        <label className="hidden" htmlFor="userPassword">
                          기존 비밀번호
                        </label>
                        <input
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          value={currentPassword}
                          className="border"
                          placeholder="현재 비밀번호를 입력하세요."
                          type="password"
                          id="userPassword"
                        />
                      </div>
                      <div>
                        <div>
                          <label className="hidden" htmlFor="newPassword">
                            신규 비밀번호
                          </label>
                        </div>
                        <input
                          onChange={(e) => setNewPassword(e.target.value)}
                          value={newPassword}
                          className="border"
                          placeholder="새 비밀번호를 입력하세요."
                          type="password"
                          id="newPassword"
                          // {...register("newPassword", {
                          //   required: true,
                          //   minLength: 8,
                          //   maxLength: 20,
                          // })}
                        />
                      </div>
                      <div>
                        <label className="hidden" htmlFor="confirmPassword">
                          신규 비밀번호 확인
                        </label>
                        <input
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          value={confirmPassword}
                          className="border"
                          placeholder="새 비밀번호를 한 번 더 확인하세요."
                          type="password"
                          id="confirmPassword"
                        />
                      </div>
                      {error && (
                        <div className="text-red-500 text-xs">{error}</div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="py-2 w-[50%] border"
                        >
                          변경취소
                        </button>
                        <button
                          onClick={handleChangePassword}
                          type="button"
                          className="py-2 w-[50%] text-white bg-black"
                        >
                          확인
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {provider && (
              <div>
                <div>
                  <div>SNS 연결</div>
                  <p>연결된 SNS 계정으로 로그인할 수 있습니다.</p>
                </div>
                <ul className="flex">
                  {PROVIDER_LOGOS.map((logo) => (
                    <li key={logo.name}>
                      <div className="relative w-10 h-10 rounded-full">
                        <img
                          src={
                            logo.name === provider.toUpperCase()
                              ? logo.activeImage
                              : logo.inactiveImage
                          }
                          alt={`${logo} logo`}
                          className="object-cover"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li>
            <h3 className="font-semibold">회원 정보</h3>
            <div>
              <div>
                <span>성명</span>
                <span>{maskName(name)}</span>
              </div>
              <div>
                <span>연락처</span>
                <span>{maskPhoneNumber(phone ?? "01000001234")}</span>
              </div>
            </div>
          </li>
        </ul>
      </fieldset>
    </section>
  );
}
function checkPassword(userId: any, password: string | null) {
  throw new Error("Function not implemented.");
}
