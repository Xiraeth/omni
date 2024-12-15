import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
  }
}
