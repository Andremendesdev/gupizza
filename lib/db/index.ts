/**
 * Camada de banco de dados — placeholder para integração futura
 * (Prisma, Drizzle, Supabase, etc.)
 */

export type DbClient = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export function createDbClient(): DbClient {
  return {
    async connect() {
      // Conectar ao banco quando configurado
    },
    async disconnect() {
      // Encerrar conexão quando configurado
    },
  };
}
