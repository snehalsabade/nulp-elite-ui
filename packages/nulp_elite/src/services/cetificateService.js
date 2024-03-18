import { post, get } from "./RestClient.ts";

export const validateCertificate = async (url, data = {}, headers = {}) => {
  const result = await post(url, data, {
    headers,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const fetchCertificatePreferences = async (
  url,
  data = {},
  headers = {}
) => {
  const result = await post(url, data, {
    headers,
  });
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getBatchDetails = async (url, header = {}) => {
  const result = await get(url, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};
