import type { AxiosResponse, ResponseType } from "axios";
import axios from "axios";
import type { VueCookies } from "vue-cookies";
import { inject } from "vue";
import app from "@/App.vue";
import { useGlobalStore } from "@/stores/global";
import { useUserStore } from "@/stores/user";

export const resolveRoute = (endpoint: string) => {
  if (import.meta.env.MODE === "development") {
    return "http://localhost:8081/" + endpoint;
  } else if (import.meta.env.MODE === "production") {
    return "https://api.helloworldlearn.com/" + endpoint;
  }
};

interface accessResponse {
  accessToken: string;
  userUuid: string;
}

export const userIsLoggedIn = (cookies: VueCookies): boolean => {
  const loggedIn =
    cookies.get("accessToken") &&
    cookies.get("username") &&
    cookies.get("userUuid");

  if (loggedIn) {
    const userStore = useUserStore();
    userStore.setAccessToken(cookies.get("accessToken"));
    userStore.setUsername(cookies.get("username"));
    userStore.setUserUuid(cookies.get("userUuid"));
  }
  return loggedIn;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<accessResponse | null> => {
  const response = await axios({
    method: "post",
    url: resolveRoute("login"),
    data: {
      username: username,
      password: password,
    },
    withCredentials: false,
  });

  if (response.status == 200) {
    return response.data;
  } else return null;
};

export const loginState = (): string | null => {
  const cookies: VueCookies | undefined = inject("$cookies");
  if (!cookies) {
    return null;
  }
  return cookies.get("accessToken");
};

export const checkAdminAccess = async (
  cookies: VueCookies
): Promise<boolean> => {
  try {
    const authResult: AxiosResponse = await rawRoute(
      "POST",
      "admin/authenticate",
      {
        accessToken: cookies.get("accessToken"),
        userCode: cookies.get("username"),
      }
    );
    return authResult.status == 200;
  } catch (e) {
    return false;
  }
};

export const logoutUser = (cookies: VueCookies) => {
  cookies.remove("accessToken");
  cookies.remove("username");
  cookies.remove("userUuid");

  const userStore = useUserStore();
  userStore.setUserUuid("");
  userStore.setAccessToken("");
  userStore.setUsername("");
  localStorage.removeItem("token");
};

async function reauthenticate() {
  const userStore = useUserStore();
  const response = await axios({
    method: "post",
    url: resolveRoute("authenticate"),
    data: {
      accessToken: userStore.getAccessToken,
      userCode: userStore.getUsername,
    },
    withCredentials: false,
  });

  localStorage.setItem("token", response.data.token);
}

async function getToken() {
  console.log(useGlobalStore().currentLanguage);
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

export const rawRoute = async (
  method: string,
  endpoint: string,
  body: unknown = {},
  responseType: ResponseType = "json",
  counter = 0
): Promise<AxiosResponse> => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${await getToken()}`,
  };
  const result = await axios({
    method: method,
    url: resolveRoute(endpoint),
    data: body,
    responseType: responseType,
  });

  if (result.status == 200) {
    return result;
  } else if (result.status == 401 && counter < 1) {
    await refreshToken();
    return rawRoute(method, endpoint, body, responseType, counter + 1);
  }

  return result;
};
