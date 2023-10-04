import crypto from "crypto";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });
const secretKey = process.env.SECRET_KEY || "mysecretkey";

export const random = () => crypto.randomBytes(128).toString("base64");
export const authentication = (salt: string, password: String) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secretKey)
    .digest("hex");
};
