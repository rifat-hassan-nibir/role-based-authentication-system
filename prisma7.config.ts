import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Migrations need the direct (unpooled) connection; the app uses the pooled one.
    url: process.env["DATABASE_URL"],
  },
});
