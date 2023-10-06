import copy from "rollup-plugin-copy-watch";
import browsersync from "rollup-plugin-browsersync";

export default {
  input: "./src/scripts/script.js",

  output: {
    file: "./app/app.js",
    format: "iife",
  },

  plugins: [
    copy({
      watch: "src",
      targets: [
        { src: "./src/*.{html,css,ico}", dest: "./app" },
        { src: "./src/images/**/*", dest: "./app/images" },
        { src: "./src/fonts/**/*", dest: "./app/fonts" },
      ],
    }),
    browsersync({
      server: "./app",
      watch: true,
      port: 8080,
    }),
  ],
};
