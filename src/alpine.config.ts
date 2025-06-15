import type { Alpine } from "alpinejs";

declare module "alpinejs" {
  interface MessageStore {
    init: () => void;
    value: string;
    handleHashChange: () => void;
  }

  interface Stores {
    message: MessageStore;
  }
}

export default function (Alpine: Alpine) {
  // Store for powering the toast
  Alpine.store("message", {
    value: "",
    handleHashChange() {
      const hash = window.location.hash;
      const hostname = window.location.hostname;

      navigator.clipboard.writeText(`${hostname}/${hash}`);
      this.value = `Copied ${hash} link!`;
    },
    init() {
      window.addEventListener("hashchange", this.handleHashChange.bind(this));
    },
  });

  // Data model for toggleable state
  Alpine.data("toggler", () => {
    return {
      isTrue: false,
      true() {
        this.isTrue = true;
      },
      false() {
        this.isTrue = false;
      },
      toggle() {
        if (this.isTrue) this.false();
        else this.true();
      },
      init() {
        Alpine.bind(this.$root, this.root);
      },
      root: {
        [":data-ui"]() {
          return this.isTrue ? "true" : "false";
        },
      },
    };
  });

  // Data model for randomly generating a greeting
  Alpine.data("greeting", () => {
    return {
      values: ["Ciao!", "Hello!", "Kia Ora!"],
      get value() {
        const randomIndex = Math.floor(Math.random() * this.values.length);
        return this.values[randomIndex] + " 👋";
      },
    };
  });

  // Data model for rendering toast messages
  Alpine.data("toast", () => {
    return {
      init() {
        Alpine.bind(this.$root, this.root);
        this.$watch("$store.message.value", () => {
          if (!this.$store.message) return;
          this.$root.classList.remove("animate-reveal");
          void this.$root.offsetWidth;
          this.$root.classList.add("animate-reveal");
        });
      },
      root: {
        ["x-show"]() {
          return !!this.$store.message.value;
        },
        ["x-text"]() {
          return this.$store.message.value ?? "";
        },
      },
    };
  });
}
