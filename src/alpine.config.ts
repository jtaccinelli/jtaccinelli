import type { Alpine } from "alpinejs";

const greetings = ["Ciao!", "Hello!", "Kia Ora!"];

export default function (Alpine: Alpine) {
  Alpine.data("greeting", () => ({
    value: greetings[Math.floor(Math.random() * greetings.length)],
  }));

  Alpine.data("toast", () => ({
    message: "",
    show: false,
    init() {
      Alpine.bind(this.$root, this.root);
    },
    root: {
      ["@update:toast.window"](event: CustomEvent) {
        if (event.detail.message) {
          this.message = event.detail.message;
        }
        if (event.detail.toast) {
          if (this.$root.classList.contains("animate-reveal")) {
            this.$root.classList.remove("animate-reveal");
            void this.$root.offsetWidth;
          }
          this.$root.classList.add("animate-reveal");
        }
      },
    },
  }));
}
