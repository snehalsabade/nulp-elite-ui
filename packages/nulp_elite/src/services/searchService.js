import { get, post, patch } from "./RestClient.ts";

export const getData = async (url, filters = {}, header = {}) => {
  const result = await post(url, filters, header);
  if (result) {
    return result;
  } else {
    return [];
  }
};

export const getUserList = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const globalUserSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const batchSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const getSubOrganisationDetails = async (
  url,
  data = {},
  headers = {}
) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const userSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const orgSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const courseSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const contentSearch = async (url, data = {}, headers = {}) => {
  try {
    const response = await post(url, { data }, { headers });
    return response.data;
  } catch (error) {
    console.error("Error getting user list:", error);
    throw error;
  }
};

export const updateOption = (option) => {
  if (_.get(option, "data.request.filters.board")) {
    option.data.request.filters["se_boards"] =
      option.data.request.filters.board;
    delete option.data.request.filters.board;
  }
  if (_.get(option, "data.request.filters.gradeLevel")) {
    option.data.request.filters["se_gradeLevels"] =
      option.data.request.filters.gradeLevel;
    delete option.data.request.filters.gradeLevel;
  }
  if (_.get(option, "data.request.filters.medium")) {
    option.data.request.filters["se_mediums"] =
      option.data.request.filters.medium;
    delete option.data.request.filters.medium;
  }

  return option.data;
};
