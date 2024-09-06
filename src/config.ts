"use client";
declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    _env_: {
      NEXT_PUBLIC_FUNCTIONS_URL: string;
    };
  }
}

const FUNCTIONS_URL =  process.env.NEXT_PUBLIC_FUNCTIONS_URL || "";

export const AppConfig = {
  functionsUrl: FUNCTIONS_URL,
};