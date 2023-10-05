import copy from "rollup-plugin-copy";
import browsersync from "rollup-plugin-browsersync";

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
    browsersync({
      server: "./app",
      watch: true,
      port: 8080,
    }),
  ],
};
