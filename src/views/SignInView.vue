<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "SignInView",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    handleSubmit() {
      axios({
        method: "post",
        url: "http://helloworldbackenddeploy-env.eba-xm7i59nj.us-west-1.elasticbeanstalk.com/authenticate",
        data: {
          username: this.email,
          password: this.password,
        },
        withCredentials: false,
      })
        .then((response) => {
          console.log(response);
          router.push("dashboard");
        })
        .catch(() => {
          this.email = "";
          this.password = "";
      });
    }
  }
};
</script>

<template>
  <div class="container-override">
    <div class="sign-in-page">
      <div class="homepage-link">
        <router-link class="link" to="/">
          キャンセル | Cancel
        </router-link>
      </div>
      <div class="sign-in-title">
        <h1>ログイン</h1>
        <h6>Sign in</h6>
      </div>
      <div class="form">
        <div class="email-container">
          <h5 class="email-header">Eメール | Email</h5>
          <input class="email-entry sign-in-entry" type="text" v-model="email"/>
        </div>
        <div class="password-container">
          <h5 class="password-header">パスワード | Password</h5>
          <input class="password-entry sign-in-entry" type="password" v-model="password"/>
        </div>
        <div class="action-button-container">
          <button class="sign-in-button" @click="handleSubmit">ログイン | Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.action-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-in-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 10vh;
}

.password-container {
  margin-top: 5vh;
}

.sign-in-button {
  margin-top: 10vh;
  background-color: #98d6d6;
  border: none;
  color: white;
  width: 300px;
  height: 75px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
}

.sign-in-button:hover {
  box-shadow: 1px 1px #6da8a8;
}

.sign-in-entry {
  width: 488px;
  height: 60px;
  line-height: 40px;
  outline: #98d6d6;
  border: 1px solid #98d6d6;
  border-radius: 10px;
  inset: unset;
  caret-color: #98d6d6;
  font-size: 16px;
  padding-left: 2vw;
  color: #98d6d6;
}

.homepage-link {
  position: fixed;
  top: 2vh;
  cursor: pointer;
  left: 2vw;
}

.link {
  color: #98d6d6;
}

.link:hover {
  color: #98d6d6;
  font-weight: bolder;
  background: none;
  transition: none;
}

.sign-in-title {
  font-size: 32px;
}

.container-override {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.sign-in-page {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #a2dada;
}
</style>