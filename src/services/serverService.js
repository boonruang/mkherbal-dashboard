import { httpClient } from "../utils/HttpClient";

export const addHerbal = async (data) => {
  await httpClient.post(`/herbal`, data);
};

