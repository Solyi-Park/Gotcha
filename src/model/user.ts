export type AuthUser = Pick<FullUser, "email" | "name" | "image" | "provider">;

export type SimpleUser = Pick<FullUser, "email" | "name" | "id"> & {
  image: string | null;
  provider: string | null;
};

export type FullUser = {
  id: string;
  email: string | null;
  password: string | null;
  phone: string | null;
  name: string;
  image: string | null;
  provider: string | null;
  signupDate: string;
  signout: string;
  role?: string;
  address: string | null;
};

// 이거 타입  체크..
