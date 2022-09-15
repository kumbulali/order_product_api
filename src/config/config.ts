import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3001;

const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

export const database = {
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  name: "postgres",
};

const config = {
  server: SERVER,
  jwtSecret: JWT_SECRET,
};

export default config;
