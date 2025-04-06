import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/table.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgres://myuser:mypassword@localhost:5432/',
  },
});