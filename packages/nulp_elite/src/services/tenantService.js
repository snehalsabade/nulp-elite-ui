import { get, post, patch } from "./RestClient.ts";

export const getTenantInfo = async (url, header = {}) => {
  const result = await get(url, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getTenantConfig = async (url, header = {}) => {
  const result = await get(url, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getSlugDefaultTenantInfo = async (url, header = {}) => {
  const result = await get(url, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};
