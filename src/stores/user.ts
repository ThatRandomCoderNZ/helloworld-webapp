/**
 * stores/user.js
 */

import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userUuid: "",
    username: "",
    accessToken: "",
  }),
  getters: {
    getUserUuid: (state) => state.userUuid,
    getUsername: (state) => state.username,
    getAccessToken: (state) => state.accessToken,
  },
  actions: {
    setUserUuid(userUuid: string) {
      this.userUuid = userUuid;
    },

    setUsername(username: string) {
      this.username = username;
    },
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
  },
});
