import { verifyToken } from "../lib/firebase/admin";
import { generateSignature } from "../lib/utils";

export const getCloudinarySignature = async (token: string, folder: string) => {
  const user = await verifyToken(token); // Validate Firebase token
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateSignature(folder, timestamp);

  return { signature, timestamp, folder };
};
