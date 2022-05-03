interface DefaultSession extends Record<string, unknown> {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token?: string;
    }
    expires?: string
  }

export type AuthType  =  {
    data: undefined | null | DefaultSession;
    status: "loading" | "authenticated" | "unauthenticated"
}