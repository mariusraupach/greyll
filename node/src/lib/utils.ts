import { encodeBase32LowerCaseNoPadding } from "@oslojs/encoding";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const createSessionToken = () => {
  try {
    const bytes = new Uint8Array(20);

    crypto.getRandomValues(bytes);

    const token = encodeBase32LowerCaseNoPadding(bytes);

    return token;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const hashOptions = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
