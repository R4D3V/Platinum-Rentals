import "better-auth";

declare module "better-auth" {
  interface User {
    role: string;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
  }

  interface Session {
    impersonatedBy: string | null;
  }
}
