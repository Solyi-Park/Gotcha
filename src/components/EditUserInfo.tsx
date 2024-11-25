"use client";
import { PROVIDER_LOGOS } from "@/constants/provider";
import useMe from "@/hooks/me";
import { usePasswordCheck } from "@/hooks/password";
import { FullUser, SimpleUser } from "@/model/user";
import { maskEmail, maskName, maskPhoneNumber } from "@/utils/maskPersonalInfo";
import { validate } from "@/utils/validate";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddressForm from "./forms/AddressForm";
import { useShippingDetailStore } from "@/store/shippingDetail";
import { useDebouncedSync } from "@/hooks/debouncedSync";
import SectionTitle from "./SectionTitle";

async function changePassword(newPassword: string) {
  try {
    const response = await fetch("/api/auth/user/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
    });
    if (!response.ok) {
      throw new Error("비밀번호 변경에 실패하였습니다.");
    }
    return true;
  } catch (error) {
    console.error(error);
  }
}

export default function EditUserInfo() {
  const { user } = useMe();
  console.log("me", user);

  const [isPasswordEditing, setPasswordIsEditing] = useState(false);
  const [isPhoneNumberEditing, setPhoneNumberIsEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);

  const router = useRouter();

  const { checkPassword, error: checkPasswordError } = usePasswordCheck();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPhoneNumber, setNewPhoneNumber] = useState(user?.phone ?? "");
  const [newEmail, setNewEmail] = useState(user?.email ?? "");

  const {
    setField,
    shippingDetails: { postCode, address, addDetail },
  } = useShippingDetailStore();

  const [error, setError] = useState<string | null>(null);
  //TODO: 변경로직에서 에러메세지 표시방식 통일하기, alert OR 입력필드 아래 ERROR MESSAGE

  useEffect(() => {
    if (user?.addresses) {
      setField("postCode", user.addresses.postCode);
      setField("address", user.addresses.address);
      setField("addDetail", user.addresses.addDetail);
    }
  }, [user]);

  //TODO: 패스워드 체크 반복.
  // 비밀번호 변경 취소시 새로고침 원인 찾기
  const handleChangePassword = async () => {
    const isValid = await checkPassword(
      user?.email || "",
      currentPassword || ""
    );
    if (!isValid) {
      alert("현재 비밀번호를 정확히 입력해주세요.");
      return;
    }
    const validationResult = validate.password(newPassword);
    if (validationResult) {
      alert(validationResult);
      return;
    }
    const confirmResult = validate.confirmPassword(
      newPassword,
      confirmPassword
    );
    if (confirmResult) {
      alert(confirmResult);
      return;
    }

    const success = await changePassword(newPassword);
    if (success) {
      alert("비밀번호가 정상적으로 변경되었습니다. 다시 로그인해주세요.");
      signOut();
    }
  };
  const queryClient = useQueryClient();

  const handleChangePhoneNumber = async () => {
    const validationResult = validate.phone(newPhoneNumber);
    if (validationResult) {
      alert(validationResult);
      return;
    }
    try {
      const res = await fetch("/api/auth/user/phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPhoneNumber }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
      alert("연락처가 정상적으로 변경되었습니다.");
      setError(null);
    } catch (error: any) {
      console.error(error);
      // setError(error.message);
      alert(error.message);
    } finally {
      setPhoneNumberIsEditing(!isPhoneNumberEditing);
      setNewPhoneNumber("");
    }
  };

  const handleChangeEmail = async () => {
    const validationResult = validate.email(newEmail);
    if (validationResult) {
      setError(validationResult);
      return;
    }
    try {
      const res = await fetch("/api/auth/user/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newEmail }),
      });

      if (!res.ok) {
        //TODO setIsEmailEditing 부분 반복이니까 try-catch-finally?로 수정하면 될 듯.
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });
      alert("이메일이 정상적으로 변경되었습니다.");
      setError(null);
    } catch (error: any) {
      console.error(error);
      // setError(error.message);
      alert(error.message);
    } finally {
      setIsEmailEditing(!isEmailEditing);
      setNewEmail("");
    }
  };

  const handleSaveDefaultAddress = async () => {
    const addressData = {
      postCode,
      address,
      addDetail,
      default: true,
      name: user?.name,
      contact: user?.phone,
    };

    if (
      !addressData.postCode ||
      !addressData.address
      // !addressData.addDetail
    ) {
      alert("주소가 올바르지 않습니다.");
      return;
    }

    console.log("addressData", addressData);
    try {
      const res = await fetch("/api/auth/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addressData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
      queryClient.invalidateQueries({
        queryKey: ["user", user?.id],
      });

      alert("수정되었습니다.");
      setError(null);
    } catch (error: any) {
      console.error(error);
      // setError(error.message);
      alert(error.message);
    }
  };
  //TODO: 핸들러함수들도 커스텀 훅으로 넣기

  return (
    <section className="text-sm">
      <SectionTitle title="회원정보 수정" />
      <fieldset>
        <legend className="hidden">회원정보 수정 양식 작성</legend>
        <ul>
          <li>
            <h3 className="font-bold mt-3">로그인 정보</h3>
            {user?.provider == null && (
              <div>
                <div className="my-5">
                  <p>아이디(이메일)</p>
                  <p className="font-semibold">
                    {maskEmail(user?.email || "")}
                  </p>
                </div>
                <div
                  className={`${
                    isPasswordEditing && "flex-col"
                  } flex  w-full sm:w-80 justify-between mb-5`}
                >
                  <div>
                    <p>비밀번호</p>
                    <p className={`${isPasswordEditing ? "hidden" : "block"}`}>
                      *********
                    </p>
                  </div>
                  <button
                    onClick={() => setPasswordIsEditing(!isPasswordEditing)}
                    className={`${
                      isPasswordEditing ? "hidden" : "block"
                    } py-2 px-5 border bg-white`}
                  >
                    변경
                  </button>

                  <div className={`${isPasswordEditing ? "block" : "hidden"}`}>
                    <form className="flex flex-col gap-2 w-72 py-2">
                      <div>
                        <label className="hidden" htmlFor="userPassword">
                          기존 비밀번호
                        </label>
                        <input
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          value={currentPassword}
                          className="border p-2 w-full placeholder:text-neutral-300 placeholder:text-xs"
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
                          className="border p-2 w-full placeholder:text-neutral-300 placeholder:text-xs"
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
                          className="border p-2 w-full placeholder:text-neutral-300 placeholder:text-xs"
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
                          onClick={() =>
                            setPasswordIsEditing(!isPasswordEditing)
                          }
                          className="py-2 w-[50%] border text-xs bg-white"
                          type="button"
                        >
                          변경취소
                        </button>
                        <button
                          onClick={handleChangePassword}
                          type="button"
                          className="py-2 w-[50%] text-white bg-black text-xs"
                        >
                          확인
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {user && (
              <div className="border-t pt-6 pb-2 my-5">
                <div>
                  <div>SNS 연결</div>
                  <p className="my-3 text-neutral-400">
                    연결된 SNS 계정으로 로그인할 수 있습니다.
                  </p>
                </div>
                <ul className="flex gap-3">
                  {PROVIDER_LOGOS.map((logo) => (
                    <li key={logo.name}>
                      <div className="relative w-10 h-10 rounded-full">
                        <img
                          src={
                            logo.name === user?.provider?.toLowerCase()
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
            <div className="flex flex-col  relative border-y-2 border-y-black py-5">
              <h3 className="font-semibold mb-5">회원 정보</h3>
              <div>
                <div className="flex mb-5">
                  <span className="w-20">성명</span>
                  <span>{maskName(user?.name || "")}</span>
                </div>
                <div
                  className={`flex mb-5 ${
                    isPhoneNumberEditing ? "items-start" : "items-center"
                  }`}
                >
                  <span className="w-20">연락처</span>
                  <div
                    className={`${
                      isPhoneNumberEditing && "hidden"
                    } flex items-center justify-between w-full sm:w-60`}
                  >
                    {user?.phone ? (
                      <span>{maskPhoneNumber(user.phone)}</span>
                    ) : (
                      <span className="text-xs text-neutral-500">
                        등록된 연락처가 없습니다.
                      </span>
                    )}
                    {/* TODO:변경버튼 분리하기 */}
                    <button
                      onClick={() =>
                        setPhoneNumberIsEditing(!isPhoneNumberEditing)
                      }
                      className={`${
                        isPhoneNumberEditing ? "hidden" : "py-2 px-5 border"
                      } bg-white`}
                      type="button"
                    >
                      변경
                    </button>
                  </div>

                  {isPhoneNumberEditing && (
                    // TODO: 이메일 변경과 동일한 형식
                    <div>
                      <input
                        className="border p-2 mb-3 w-60"
                        type="text"
                        value={newPhoneNumber}
                        onChange={(e) => setNewPhoneNumber(e.target.value)}
                      />
                      {/* TODO: 비번 변경 버튼그룹과 동일함 */}
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setPhoneNumberIsEditing(!isPhoneNumberEditing)
                          }
                          className="py-2 w-[50%] border bg-white"
                          type="button"
                        >
                          변경취소
                        </button>
                        <button
                          onClick={handleChangePhoneNumber}
                          type="button"
                          className="py-2 text-white bg-black"
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col border-t pt-5 ">
                <span>이메일</span>
                <div
                  className={`${
                    isEmailEditing ? "hidden" : "block"
                  } flex justify-between w-full items-center sm:w-80`}
                >
                  {user?.email ? (
                    <span className="font-semibold">{user?.email}</span>
                  ) : (
                    <span>이메일을 등록해주세요.</span>
                  )}
                  <button
                    onClick={() => setIsEmailEditing(!isEmailEditing)}
                    className={`${
                      isEmailEditing ? "hidden" : "py-2 px-5 border"
                    } bg-white`}
                    type="button"
                  >
                    변경
                  </button>
                </div>
                {isEmailEditing && (
                  <div>
                    <input
                      className="border"
                      type="text"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                    {error && <span>{error}</span>}
                    {/* TODO: 비번 변경 버튼그룹과 동일함 */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEmailEditing(!isEmailEditing)}
                        className="py-2 w-[50%] border bg-white"
                        type="button"
                      >
                        변경취소
                      </button>
                      <button
                        onClick={handleChangeEmail}
                        type="button"
                        className="py-2 w-[50%] text-white bg-black"
                      >
                        확인
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 mt-6 w-full sm:w-[360px]">
                <span>주소정보</span>
                <AddressForm
                  postCode={postCode ?? ""}
                  address={address ?? ""}
                  addDetail={addDetail ?? ""}
                />
                <button
                  onClick={handleSaveDefaultAddress}
                  type="button"
                  className="w-full py-2 text-white bg-black"
                >
                  저장하기
                </button>
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
