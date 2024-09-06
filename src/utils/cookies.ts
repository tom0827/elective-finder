import { AppConfig } from "@/config";

export const fetchCookies = async () => {
  fetch(`${AppConfig.functionsUrl}/getToken`, {
    credentials: "include",
  });
  await new Promise(resolve => setTimeout(resolve, 500)); // Ensure cookies get set before making future requests
};