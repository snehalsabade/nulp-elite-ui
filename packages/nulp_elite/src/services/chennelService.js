import { get } from "./RestClient.ts";

export const getFrameWork = async (url, header = {}) => {
  const result = await get(url, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};
