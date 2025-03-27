import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
  }

  interface Session {
    user: User & {
      role: UserRole;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      tenants: any[];
      activeTenant?: string;
    }
  }
}