import { join } from "path";
import { skeleton } from "@skeletonlabs/tw-plugin";

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,svelte,ts}"//,
    //join(require.resolve("@skeletonlabs/skeleton"), "../**/*.{html,js,svelte}")
  ],

  theme: {
    extend: {}
  },

  plugins: [
    skeleton({
      themes: { preset: ["rocket"] }
    })
  ]
};
