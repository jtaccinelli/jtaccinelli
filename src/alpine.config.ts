import type { Alpine } from "alpinejs";

export default function (Alpine: Alpine) {
  // Store for powering the toast
  Alpine.store("message", "");

  // Data model for randomly generating a greeting
  Alpine.data("greeting", () => {
    return {
      values: ["Ciao!", "Hello!", "Kia Ora!"],
      get value() {
        const randomIndex = Math.floor(Math.random() * this.values.length);
        return this.values[randomIndex];
      },
    };
  });

  // Data model for copying a section link
  Alpine.data("copier", () => {
    return {
      init() {
        Alpine.bind(this.$root, this.root);
      },
      root: {
        ["@click"]() {
          const id = this.$root.dataset.id;
          const text = this.$root.dataset.text;
          const hostname = window.location.hostname;

          this.$store.message = `Copied ${text} link!`;
          navigator.clipboard.writeText(`${hostname}/#${id}`);
        },
      },
    };
  });

  // Data model for rendering toast messages
  Alpine.data("toast", () => {
    return {
      init() {
        Alpine.bind(this.$root, this.root);
        this.$watch("$store.message", () => {
          if (!this.$store.message) return;
          this.$root.classList.remove("animate-reveal");
          void this.$root.offsetWidth;
          this.$root.classList.add("animate-reveal");
        });
      },
      root: {
        ["x-show"]() {
          return !!this.$store.message;
        },
        ["x-text"]() {
          return this.$store.message ?? "";
        },
      },
    };
  });
}
