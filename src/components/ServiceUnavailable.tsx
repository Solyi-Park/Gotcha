"use client";
import { useRouter } from "next/navigation";

export default function ServiceUnavailable() {
  const router = useRouter();

  return (
    <div className="text-center py-20 w-full">
      <p className="text-2xl font-semibold text-gray-800">
        서비스 준비 중입니다.
      </p>
      <p className="text-lg text-gray-500">
        불편을 드려 죄송합니다. 곧 찾아뵙겠습니다!
      </p>
      <button
        className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-700"
        onClick={() => router.push("/")}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
