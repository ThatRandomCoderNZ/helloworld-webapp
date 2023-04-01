<template>
  <div class="container-override">
    <div class="sign-in-page">
      <div class="homepage-link">
        <router-link class="link" to="/">
          <div class="landing-logo-container">
            <div class="logo-image"></div>
          </div>
        </router-link>
      </div>
      <div class="sign-in-title">
        <h5 class="general-message">{{ generalMessage }}</h5>
        <h3>Login</h3>
      </div>
      <div class="sign-in-link-container">
        <p class="sign-in-link">
          Don't have an account yet?
          <router-link class="link" to="/signup"
            >Click here to sign up</router-link
          >
        </p>
      </div>
      <div class="form" @keyup.enter="handleSubmit">
        <div class="email-container">
          <h5 class="email-header">Email</h5>
          <input
            :class="
              'email-entry sign-in-entry ' +
              (usernameError ? 'error-state' : '')
            "
            type="text"
            v-model="email"
          />
          <h5 class="error-message">{{ usernameError }}</h5>
        </div>
        <div class="password-container">
          <h5 class="password-header">Password</h5>
          <input
            :class="
              'password-entry sign-in-entry ' +
              (passwordError ? 'error-state' : '')
            "
            type="password"
            v-model="password"
          />
          <h5 class="error-message">{{ passwordError }}</h5>
        </div>
        <div class="action-button-container">
          <button class="sign-in-button" @click="handleSubmit">LOGIN</button>
          <h5 class="error-message">{{ generalError }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
import { loginUser, resolveRoute, userIsLoggedIn } from "@/helpers/api-routes";
import { VueCookies } from "vue-cookies";
import { inject } from "vue";
import { useUserStore } from "@/stores/user";
export default {
  name: "SignInView",

  setup() {
    const cookies = inject("$cookies");
    const userStore = useUserStore();

    return {
      cookies,
      userStore,
    };
  },

  props: {
    generalMessage: String,
  },

  data() {
    return {
      email: "",
      password: "",
      usernameError: "",
      passwordError: "",
      generalError: "",
    };
  },

  methods: {
    validateForm() {
      if (!this.email) {
        this.usernameError = "You must enter an email";
      }
      if (!this.password) {
        this.passwordError = "You must enter a password";
      }
      return !(this.usernameError || this.passwordError);
    },

    handleSubmit() {
      this.usernameError = "";
      this.passwordError = "";
      this.generalError = "";
      if (!this.validateForm()) {
        return;
      }

      const remember = false;
      loginUser(this.email, this.password).then((accessResponse) => {
        if (accessResponse) {
          console.log(accessResponse);
          this.cookies.set(
            "accessToken",
            accessResponse.accessToken,
            remember ? -1 : "0"
          );
          this.cookies.set("remainLoggedIn", remember);
          this.cookies.set(
            "userUuid",
            accessResponse.userUuid,
            "0",
            remember ? -1 : "0"
          );
          this.cookies.set("username", this.email, remember ? -1 : "0");

          // this.userStore.setUserUuid(accessResponse.userUuid);
          // this.userStore.setAccessToken(accessResponse.accessToken);
          // this.userStore.setUsername(this.email);

          router.push("dashboard");
        } else {
          this.generalError =
            "There was something wrong with your username and/or password";
          this.email = "";
          this.password = "";
        }
      });
    },
  },
};
</script>

<style scoped>
.sign-in-link-container {
  font-size: 12px;
  margin-bottom: 20px;
}
.logo-image {
  background-image: url("../assets/logo-color-sub.svg");
  background-repeat: no-repeat;
  object-fit: contain;
  margin-top: 25px;
  margin-left: 50px;
  width: 100px;
  height: 60px;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-state {
  border-color: rgba(221, 116, 116, 0.76) !important;
}

.general-message {
  font-size: 18px;
  color: #34c76f;
}

.error-message {
  color: rgba(221, 116, 116, 0.76);
  margin-left: 20px;
  font-size: 12px;
}

.action-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.sign-in-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10vh;
  margin-bottom: 2vh;
}

.password-container {
  margin-top: 5vh;
}

.sign-in-button {
  margin-top: 10vh;
  background-color: #98d6d6;
  border: none;
  color: white;
  width: 250px;
  height: 60px;
  font-size: 18px;
  border-radius: 2px;
  cursor: pointer;
}

.sign-in-button:hover {
  box-shadow: 2px 2px 2px #6da8a8;
}

.sign-in-entry {
  width: 400px;
  height: 60px;
  line-height: 40px;
  outline: #98d6d6;
  border: 1px solid #98d6d6;
  border-radius: 2px;
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

@media screen and (max-width: 600px) {
  .logo-image {
    margin-top: 15px;
    width: 80px;
    height: 40px;
    margin-left: 15px;
  }

  .sign-in-entry {
    width: 200px;
    height: 40px;
    font-size: 12px;
  }
}
</style>
