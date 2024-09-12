import { AppConfig } from "@/config";

export const fetchCookies = async () => {
  fetch(`${AppConfig.functionsURL}/getToken`, {
    credentials: "include",
  });
  await new Promise(resolve => setTimeout(resolve, 1000)); // Ensure cookies get set before making future requests
};