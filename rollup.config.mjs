import copy from "rollup-plugin-copy";

export default {
  input: "./src/scripts/script.js",

  output: {
    file: "./app/app.js",
    format: "iife",
  },

  plugins: [
    copy({
      targets: [{ src: "./src/*.{html,css,ico}", dest: "./app" }],
    }),
  ],
};
