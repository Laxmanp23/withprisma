import { cleanEnv, str, port } from "envalid";

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  PORT: port()
});