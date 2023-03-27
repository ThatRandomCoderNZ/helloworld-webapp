import axios, { Axios } from "axios";

import type { ResponseType } from "axios";

export const resolveRoute = (endpoint: string) => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:8081/" + endpoint;
  } else if (import.meta.env.MODE === "production") {
    return "https://api.helloworldlearn.com/" + endpoint;
  }
};

async function reauthenticate() {
  const response = await axios({
    method: "post",
    url: resolveRoute("authenticate"),
    data: {
      username: "test",
      password: "password",
    },
    withCredentials: false,
  });

  localStorage.setItem("token", response.data.token);
}

async function getToken() {
  if (!localStorage.getItem("token")) {
    await reauthenticate();
  }
  return localStorage.getItem("token");
}

async function refreshToken() {
  localStorage.removeItem("token");
  await reauthenticate();
}

export const route: (
  method: string,
  endpoint: string,
  body?: unknown,
  responseType?: ResponseType,
  counter?: number
) => Promise<any> = async (
  method: string,
  endpoint: string,
  body: unknown = {},
  responseType: ResponseType = "json",
  counter = 0
) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${await getToken()}`,
  };
  return axios({
    method: method,
    url: resolveRoute(endpoint),
    data: body,
    responseType: responseType,
  })
    .then((response) => {
      return response.data;
    })
    .catch(async (error) => {
      if (counter == 2) {
        return null;
      }
      if (error.response.status === 401) {
        await refreshToken();
        return await route(method, endpoint, body, responseType, counter + 1);
      }
    });
};
