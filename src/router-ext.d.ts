import type { App } from "vue";

declare module "vue-router/dist/vue-router" {
  interface Router {
    $app: App<Element>;
  }
}
