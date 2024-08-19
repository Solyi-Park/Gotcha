export type SimpleUser = Pick<FullUser, "email" | "name"> & {
  image?: string | null;
  provider?: string | null;
  providerId?: string | null;
  password?: string | null;
};

export type FullUser = {
  id: string;
  email: string | null;
  password: string | null;
  phone: string | null;
  name: string;
  image: string | null;
  provider: string | null;
  providerId: string | null;
  signupDate: string;
  signout: string;
  role?: string;
};

// 이거 타입  체크..
