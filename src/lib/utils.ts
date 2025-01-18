// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
// import cloudinary from "cloudinary";

// cloudinary.v2.config({
//   cloud_name: "dfh3bdkjy",
//   api_key: "685874838599464",
//   api_secret: "0EM266vhU5l-QrIX_RuFvP-213o",
// });

// export const generateSignature = (folder: string, timestamp: number) => {
//   return cloudinary.v2.utils.api_sign_request(
//     { folder, timestamp },
//     "0EM266vhU5l-QrIX_RuFvP-213o"
//   );
// };
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
