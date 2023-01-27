import axios from "axios";

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

export const getApi = async (endpoint: string) => {
  axios.defaults.headers.common = {
    Authorization: `Bearer ${await getToken()}`,
  };
  axios({
    method: "get",
    url: resolveRoute(endpoint),
  });
};
