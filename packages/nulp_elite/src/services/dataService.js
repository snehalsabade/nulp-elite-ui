import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

export const useDataService = () => {
  const [userId, setUserId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [rootOrgId, setRootOrgId] = useState("");
  const [channelId, setChannelId] = useState("");
  const [appId, setAppId] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [baseUrl, setBaseUrl] = useState("");
  const [appVersion, setAppVersion] = useState("");

  // Initialize appVersion
  useEffect(() => {
    const buildNumberElement = document.getElementById("buildNumber");
    setAppVersion(
      buildNumberElement && buildNumberElement.value
        ? buildNumberElement.value.slice(
            0,
            buildNumberElement.value.lastIndexOf(".")
          )
        : "1.0"
    );
  }, []);

  const get = async (url, headers = {}, params = {}) => {
    try {
      const response = await axios.get(url, {
        headers,
        params,
      });

      if (response.data.responseCode !== "OK") {
        throw new Error("Server response not OK");
      }

      return response.data;
    } catch (error) {
      console.error("Error making GET request:", error);
      throw error;
    }
  };

  const getWithHeaders = async (url, headers = {}, params = {}) => {
    try {
      const response = await axios.get(url, {
        headers,
        params,
        observe: "response",
      });

      const body = response.data;
      const responseHeaders = response.headers;

      // Replace ts time with header date, this value is used in telemetry
      body.ts = getDateDiff(responseHeaders.date);

      if (body.responseCode !== "OK") {
        throw new Error("Server response not OK");
      }

      return body;
    } catch (error) {
      console.error("Error making GET request with headers:", error);
      throw error;
    }
  };

  const postWithHeaders = async (requestParam) => {
    const httpOptions = {
      method: "POST",
      headers: requestParam.header ? requestParam.header : getHeader(),
      body: JSON.stringify(requestParam.data),
    };

    try {
      const response = await fetch(baseUrl + requestParam.url, httpOptions);
      const body = await response.json();

      // Replace ts time with header date, this value is used in telemetry
      body.ts = getDateDiff(response.headers.get("Date"));

      if (body.responseCode !== "OK") {
        throw body;
      }

      return body;
    } catch (error) {
      throw error;
    }
  };

  const post = async (requestParam) => {
    const httpOptions = {
      method: "POST",
      headers: requestParam.header ? requestParam.header : getHeader(),
      body: JSON.stringify(requestParam.data),
    };

    try {
      const response = await fetch(baseUrl + requestParam.url, httpOptions);
      const data = await response.json();

      if (data.responseCode !== "OK") {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const patch = async (requestParam) => {
    const httpOptions = {
      method: "PATCH",
      headers: requestParam.header ? requestParam.header : getHeader(),
      body: JSON.stringify(requestParam.data),
    };

    try {
      const response = await fetch(baseUrl + requestParam.url, httpOptions);
      const data = await response.json();

      if (data.responseCode !== "OK") {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const remove = async (requestParam) => {
    const httpOptions = {
      method: "DELETE",
      headers: requestParam.header ? requestParam.header : getHeader(),
      body: JSON.stringify(requestParam.data),
    };

    try {
      const response = await fetch(baseUrl + requestParam.url, httpOptions);
      const data = await response.json();

      if (data.responseCode !== "OK") {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const update = async (requestParam) => {
    const httpOptions = {
      method: "PUT",
      headers: requestParam.header,
      body: JSON.stringify(requestParam.data),
    };

    try {
      const response = await fetch(baseUrl + requestParam.url, httpOptions);
      const data = await response.json();

      if (data.responseCode !== "OK") {
        throw data;
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  const getHeader = () => {
    const _uuid = uuidv4();
    const defaultHeaders = {
      Accept: "application/json",
      "X-Source": "web",
      ts: dayjs().format(),
      "X-msgid": _uuid,
      "X-Request-ID": _uuid,
      "X-App-Version": appVersion,
      "X-Session-ID": sessionId,
    };

    try {
      setDeviceId(document.getElementById("deviceId")?.value || "");
      setAppId(document.getElementById("appId")?.value || "");
    } catch (err) {}

    if (deviceId) {
      defaultHeaders["X-Device-ID"] = deviceId;
    }
    if (rootOrgId) {
      defaultHeaders["X-Org-code"] = rootOrgId;
    }
    if (channelId) {
      defaultHeaders["X-Channel-Id"] = channelId;
    }
    if (appId) {
      defaultHeaders["X-App-Id"] = appId;
    }
    if (userId) {
      defaultHeaders["X-User-ID"] = userId;
    }

    return defaultHeaders;
  };

  const getDateDiff = (serverdate) => {
    const currentdate = new Date();
    const serverDate = new Date(serverdate);
    if (serverdate) {
      return (serverDate - currentdate) / 1000;
    } else {
      return 0;
    }
  };

  return {
    userId,
    setUserId,
    sessionId,
    setSessionId,
    rootOrgId,
    setRootOrgId,
    channelId,
    setChannelId,
    appId,
    setAppId,
    deviceId,
    setDeviceId,
    baseUrl,
    setBaseUrl,
    appVersion,
    get,
    getWithHeaders,
    post,
    postWithHeaders,
    patch,
    remove,
    update,
  };
};
