/**
 * Camada de autenticação — placeholder para integração futura
 * (NextAuth, Clerk, Auth.js, etc.)
 */

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
};

export async function getSession(): Promise<SessionUser | null> {
  return null;
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Não autenticado");
  }
  return session;
}

export async function requireAdmin(): Promise<SessionUser> {
  const session = await requireAuth();
  if (session.role !== "admin") {
    throw new Error("Acesso negado");
  }
  return session;
}
